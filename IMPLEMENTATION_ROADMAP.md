# 🚀 INVITEFOCUS Implementation Roadmap

## Phase 1: Supabase Integration (Load Real Data)

### Step 1.1: Create Supabase Project
```bash
# Go to https://supabase.com
# Create new project
# Wait for initialization
# Copy your credentials:
# - Project URL: https://[project-id].supabase.co
# - Anon Key: eyJ...
```

### Step 1.2: Create Tables
1. Go to **Supabase Dashboard** → **SQL Editor**
2. Copy entire `supabase_schema.sql` content
3. Paste & execute

**Tables created:**
- `clients` (company info, stage)
- `client_stages` (audit trail)
- `client_reports` (generated docs)

### Step 1.3: Configure Next.js Environment
```bash
# Create .env.local file
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
EOF
```

### Step 1.4: Create Supabase Client
```bash
npm install @supabase/supabase-js
```

Create `lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)
```

### Step 1.5: Seed Client Data
Create `scripts/seed-clients.ts`:
```typescript
import { supabase } from '../lib/supabase'
import mockClients from '../mock_clients.json'

export async function seedClients() {
  for (const client of mockClients.clients) {
    // Insert client
    const { data, error } = await supabase
      .from('clients')
      .insert([
        {
          company_name: client.company_name,
          contact_email: client.contact_email,
          contact_name: client.contact_name,
          sector: client.sector,
          employee_count: client.employee_count,
          annual_revenue: client.annual_revenue,
          current_stage: client.current_stage,
          started_at: client.started_at,
        }
      ])
      .select()

    if (error) {
      console.error('Error inserting client:', error)
      continue
    }

    console.log('✓ Created:', client.company_name)

    // Insert stage history
    for (let i = 1; i <= client.current_stage; i++) {
      await supabase
        .from('client_stages')
        .insert([
          {
            client_id: data[0].id,
            stage_number: i,
            stage_name: stageNames[i],
            completed_at: i < client.current_stage ? new Date() : null,
          }
        ])
    }

    // Insert generated reports
    const reportTypes = {
      5: ['accounting', 'legal', 'strategy'],
      6: ['accounting', 'legal', 'strategy']
    }

    if (reportTypes[client.current_stage]) {
      for (const type of reportTypes[client.current_stage]) {
        await supabase
          .from('client_reports')
          .insert([
            {
              client_id: data[0].id,
              report_type: type,
              report_name: `${type} Report - ${client.company_name}`,
              generated_at: new Date(),
            }
          ])
      }
    }
  }
}

const stageNames = {
  1: 'Prise de contact',
  2: 'Audit',
  3: 'Cadrage',
  4: 'Exécution',
  5: 'Livraison',
  6: 'Suivi',
}
```

Run seed:
```bash
npx ts-node scripts/seed-clients.ts
```

### Step 1.6: Load Client Data in Pages

**Update `/dashboard/page.tsx`:**
```typescript
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadClient() {
      // For now, load first client (client_id = 1)
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', 1)
        .single()

      if (!error) {
        setClient(data)
      }
      setLoading(false)
    }

    loadClient()
  }, [])

  if (loading) return <div>Loading...</div>
  if (!client) return <div>No client found</div>

  return (
    // Render dashboard with real client data
    <div>
      {/* Use client.current_stage for stage checking */}
    </div>
  )
}
```

---

## Phase 2: Authentication (GitHub OAuth)

### Step 2.1: Enable GitHub OAuth in Supabase
1. Go to **Supabase Dashboard** → **Authentication** → **Providers**
2. Enable **GitHub**
3. Create OAuth app at https://github.com/settings/developers
4. Get **Client ID** & **Client Secret**
5. Paste into Supabase GitHub provider settings

### Step 2.2: Create Auth Context
Create `lib/auth-context.tsx`:
```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from './supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signInWithGitHub: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user || null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user || null)
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signInWithGitHub, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
```

### Step 2.3: Add Auth Provider to Root Layout
**`app/layout.tsx`:**
```typescript
import { AuthProvider } from '@/lib/auth-context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

### Step 2.4: Create Auth Callback
Create `app/auth/callback/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL('/dashboard', request.url))
}
```

### Step 2.5: Add Login Page
Create `app/login/page.tsx`:
```typescript
'use client'

import { useAuth } from '@/lib/auth-context'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const { signInWithGitHub } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#1e293b]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-[#0F172A] mb-6">INVITEFOCUS</h1>
        <p className="text-gray-600 mb-8">Sign in with GitHub to continue</p>
        
        <button
          onClick={signInWithGitHub}
          className="w-full px-6 py-3 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1D4ED8] transition-colors"
        >
          Sign in with GitHub
        </button>
      </motion.div>
    </div>
  )
}
```

### Step 2.6: Create Protected Route Middleware
Create `middleware.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard', '/admin']

export function middleware(request: NextRequest) {
  const session = request.cookies.get('sb-session')

  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
}
```

---

## Phase 3: Document Storage (Supabase Storage)

### Step 3.1: Create Storage Bucket
1. Go to **Supabase Dashboard** → **Storage**
2. Create bucket: `client-reports`
3. Enable public access (for downloading)

### Step 3.2: Upload Reports
Create `lib/upload.ts`:
```typescript
import { supabase } from './supabase'

export async function uploadReport(
  clientId: number,
  file: File,
  reportType: 'accounting' | 'legal' | 'strategy'
) {
  const filename = `${clientId}/${reportType}/${Date.now()}_${file.name}`

  const { data, error } = await supabase.storage
    .from('client-reports')
    .upload(filename, file)

  if (error) throw error

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('client-reports')
    .getPublicUrl(filename)

  // Save to database
  await supabase
    .from('client_reports')
    .insert([
      {
        client_id: clientId,
        report_type: reportType,
        report_name: file.name,
        report_url: publicUrl,
        generated_at: new Date(),
      }
    ])

  return publicUrl
}
```

### Step 3.3: Update Report Pages
**`app/dashboard/accounting/page.tsx`:**
```typescript
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AccountingPage() {
  const [reports, setReports] = useState([])
  const [clientId, setClientId] = useState(1) // Get from auth context

  useEffect(() => {
    async function loadReports() {
      const { data } = await supabase
        .from('client_reports')
        .select('*')
        .eq('client_id', clientId)
        .eq('report_type', 'accounting')

      setReports(data || [])
    }

    loadReports()
  }, [clientId])

  return (
    <div>
      {reports.map(report => (
        <a
          key={report.id}
          href={report.report_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-md transition-all"
        >
          <div>
            <p className="font-semibold text-[#0F172A]">{report.report_name}</p>
            <p className="text-xs text-gray-500">{report.generated_at}</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            Download
          </button>
        </a>
      ))}
    </div>
  )
}
```

---

## Phase 4: Admin Stage Management

### Step 4.1: Create Stage Editor Component
Create `components/admin/StageEditor.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ChevronRight } from 'lucide-react'

interface StageEditorProps {
  clientId: number
  currentStage: number
}

export function StageEditor({ clientId, currentStage }: StageEditorProps) {
  const [loading, setLoading] = useState(false)
  const [stage, setStage] = useState(currentStage)

  const stageNames = {
    1: 'Prise de contact',
    2: 'Audit',
    3: 'Cadrage',
    4: 'Exécution',
    5: 'Livraison',
    6: 'Suivi',
  }

  async function updateStage(newStage: number) {
    setLoading(true)

    // Update current stage
    const { error: updateError } = await supabase
      .from('clients')
      .update({ current_stage: newStage, updated_at: new Date() })
      .eq('id', clientId)

    if (!updateError) {
      // Record stage transition
      await supabase
        .from('client_stages')
        .insert([
          {
            client_id: clientId,
            stage_number: newStage,
            stage_name: stageNames[newStage],
            completed_at: new Date(),
          }
        ])

      setStage(newStage)
    }

    setLoading(false)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-[#0F172A] mb-4">Mettre à jour l'étape</h3>
      
      <div className="flex gap-2 flex-wrap">
        {Object.entries(stageNames).map(([stageNum, stageName]) => {
          const num = parseInt(stageNum)
          const isActive = num === stage

          return (
            <button
              key={num}
              onClick={() => updateStage(num)}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Étape {num}
            </button>
          )
        })}
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700">
          <span className="font-semibold">Étape courante:</span> {stageNames[stage]}
        </p>
      </div>
    </div>
  )
}
```

### Step 4.2: Create Client Detail Page
Create `app/admin/clients/[id]/page.tsx`:
```typescript
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { StageEditor } from '@/components/admin/StageEditor'
import { motion } from 'framer-motion'

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const [client, setClient] = useState(null)
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadClientData() {
      // Load client
      const { data: clientData } = await supabase
        .from('clients')
        .select('*')
        .eq('id', params.id)
        .single()

      // Load reports
      const { data: reportsData } = await supabase
        .from('client_reports')
        .select('*')
        .eq('client_id', params.id)

      setClient(clientData)
      setReports(reportsData || [])
      setLoading(false)
    }

    loadClientData()
  }, [params.id])

  if (loading) return <div className="p-8">Loading...</div>
  if (!client) return <div className="p-8">Client not found</div>

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">{client.company_name}</h1>
        <p className="text-gray-600">{client.sector} • {client.employee_count} employees</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StageEditor clientId={client.id} currentStage={client.current_stage} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <p className="text-sm text-gray-600 font-semibold mb-2">Revenu annuel</p>
          <p className="text-3xl font-bold text-[#0F172A]">${(client.annual_revenue / 1000).toFixed(0)}K</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <p className="text-sm text-gray-600 font-semibold mb-2">Démarrage</p>
          <p className="text-lg font-bold text-[#0F172A]">{client.started_at}</p>
        </motion.div>
      </div>

      {/* Reports section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-4">Rapports générés ({reports.length})</h2>
        <div className="space-y-3">
          {reports.map(report => (
            <div key={report.id} className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-lg border border-gray-200">
              <div>
                <p className="font-semibold text-[#0F172A]">{report.report_name}</p>
                <p className="text-xs text-gray-500">{report.report_type}</p>
              </div>
              {report.report_url && (
                <a
                  href={report.report_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm hover:bg-[#1D4ED8]"
                >
                  Download
                </a>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
```

---

## Phase 5: Email Notifications

### Step 5.1: Set up Email Service
Use **Supabase Edge Functions** + **SendGrid** or **Resend**

Create `supabase/functions/notify-stage-change/index.ts`:
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'https://cdn.jsdelivr.net/npm/resend@latest'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  const { clientId, newStage, clientEmail } = await req.json()

  const stageNames = {
    5: 'Livraison',
    6: 'Suivi'
  }

  if (newStage === 5 || newStage === 6) {
    await resend.emails.send({
      from: 'noreply@invitefocus.com',
      to: clientEmail,
      subject: `🎉 Your reports are ready! (Stage ${newStage})`,
      html: `
        <h1>Welcome to Stage ${newStage}</h1>
        <p>Your INVITEFOCUS reports are now available in your dashboard.</p>
        <p><a href="https://invitefocus.vercel.app/dashboard">View your reports</a></p>
      `
    })
  }

  return new Response('OK')
})
```

Deploy with:
```bash
supabase functions deploy notify-stage-change
```

---

## Quick Start Checklist

### ✅ Phase 1: Supabase
- [ ] Create Supabase project
- [ ] Run `supabase_schema.sql`
- [ ] Add `.env.local` with credentials
- [ ] Install `@supabase/supabase-js`
- [ ] Seed clients with script
- [ ] Load data in dashboard pages

### ✅ Phase 2: Authentication
- [ ] Enable GitHub OAuth
- [ ] Create auth context + provider
- [ ] Add login page
- [ ] Create auth callback route
- [ ] Add middleware for protected routes

### ✅ Phase 3: Document Storage
- [ ] Create storage bucket
- [ ] Upload reports function
- [ ] Update report pages

### ✅ Phase 4: Admin
- [ ] Create stage editor component
- [ ] Build client detail page
- [ ] Add stage change logging

### ✅ Phase 5: Notifications
- [ ] Set up email service
- [ ] Deploy edge function
- [ ] Test email triggers

---

## Testing Commands

```bash
# Check build
npm run build

# Run locally
npm run dev

# Deploy to Vercel
git push origin master

# Seed database
npx ts-node scripts/seed-clients.ts

# View Supabase logs
supabase functions list
```

---

Ready to proceed? Start with **Phase 1 (Supabase Integration)** — it's the foundation for everything else. Let me know which phase you want to implement!
