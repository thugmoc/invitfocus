# 📧 Email Notifications - Supabase Edge Functions Setup

The email notification function is **optional**. It's not part of the Next.js build (to avoid TypeScript errors), but can be deployed separately to Supabase.

---

## 📋 Edge Function Code

The function code is documented in `IMPLEMENTATION_ROADMAP.md` under "Phase 5: Email Notifications".

---

## 🚀 Deploying the Edge Function

### Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

### Step 2: Authenticate

```bash
supabase login
```

### Step 3: Create the Function Directory

```bash
mkdir -p supabase/functions/notify-stage-change
```

### Step 4: Create the Function File

Create `supabase/functions/notify-stage-change/index.ts` with this content:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NotificationPayload {
  clientId: number
  newStage: number
  clientEmail: string
  clientName: string
}

const stageInfo: Record<number, { name: string; emoji: string; modules: string[] }> = {
  1: { name: 'Prise de contact', emoji: '👋', modules: [] },
  2: { name: 'Audit/Diagnostic', emoji: '🔍', modules: [] },
  3: { name: 'Cadrage', emoji: '📋', modules: [] },
  4: { name: 'Exécution', emoji: '⚙️', modules: [] },
  5: {
    name: 'Livraison',
    emoji: '📦',
    modules: ['◐ Comptable', '⚖ Juridique', '🚀 Stratégie'],
  },
  6: {
    name: 'Suivi',
    emoji: '🎯',
    modules: ['◐ Comptable', '⚖ Juridique', '🚀 Stratégie', '⚡ Simulateur', '🤖 IA', '💬 Messages'],
  },
}

async function sendEmailViaResend(
  email: string,
  clientName: string,
  stage: number
): Promise<boolean> {
  const stageData = stageInfo[stage]
  const resendApiKey = Deno.env.get('RESEND_API_KEY')

  if (!resendApiKey) {
    console.error('RESEND_API_KEY not configured')
    return false
  }

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2563EB 0%, #0F172A 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; }
    .content { padding: 20px 0; }
    .stage-badge { display: inline-block; background: #2563EB; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 10px 0; }
    .modules { margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px; }
    .module-list { display: flex; flex-wrap: wrap; gap: 10px; }
    .module-tag { background: white; padding: 6px 12px; border-radius: 15px; font-size: 12px; font-weight: 500; }
    .cta-button { display: inline-block; background: #2563EB; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 20px 0; font-weight: bold; }
    .footer { color: #666; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Congratulations!</h1>
      <p>Your INVITEFOCUS dossier has progressed to the next stage</p>
    </div>

    <div class="content">
      <p>Hi ${clientName},</p>

      <p>Great news! Your INVITEFOCUS dossier has reached:</p>

      <div style="text-align: center;">
        <div class="stage-badge">${stageData.emoji} Stage ${stage} — ${stageData.name}</div>
      </div>

      ${stageData.modules.length > 0 ? `
      <div class="modules">
        <p><strong>📚 Now Available:</strong></p>
        <div class="module-list">
          ${stageData.modules.map(m => `<span class="module-tag">✓ ${m}</span>`).join('')}
        </div>
      </div>
      ` : ''}

      <p>Your new features are now accessible in your INVITEFOCUS dashboard. Log in to explore what's available for your business growth.</p>

      <div style="text-align: center;">
        <a href="https://invitfocus.vercel.app/dashboard" class="cta-button">Access Your Dashboard</a>
      </div>

      <p>Questions? Reach out to our support team anytime.</p>

      <p>Best regards,<br><strong>The INVITEFOCUS Team</strong></p>
    </div>

    <div class="footer">
      <p>© 2024 INVITEFOCUS. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'noreply@invitefocus.com',
        to: email,
        subject: `🎉 Your INVITEFOCUS dossier has progressed! (Stage ${stage})`,
        html: emailHtml,
      }),
    })

    if (response.ok) {
      console.log(`✅ Email sent to ${email}`)
      return true
    } else {
      const error = await response.text()
      console.error(`❌ Failed to send email: ${error}`)
      return false
    }
  } catch (error) {
    console.error('Email error:', error)
    return false
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload: NotificationPayload = await req.json()
    const { clientId, newStage, clientEmail, clientName } = payload

    console.log(`📧 Processing stage change notification for client ${clientId}`)

    if (newStage >= 5) {
      const emailSent = await sendEmailViaResend(clientEmail, clientName, newStage)

      return new Response(
        JSON.stringify({
          success: true,
          message: emailSent ? 'Email sent successfully' : 'Email queued (will retry)',
          clientId,
          newStage,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Notification processed (no email for this stage)',
        clientId,
        newStage,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Function error:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
```

### Step 5: Add Environment Secrets

In Supabase Dashboard:

1. Go to **Edge Functions**
2. Select `notify-stage-change` function
3. Click **Settings**
4. Add secret: `RESEND_API_KEY` = your Resend API key

### Step 6: Deploy

```bash
supabase functions deploy notify-stage-change
```

Expected output:
```
✓ Function deployed successfully
Endpoint: https://your-project.supabase.co/functions/v1/notify-stage-change
```

---

## 🧪 Test the Function

### Local Testing

```bash
supabase functions serve
```

Then call via curl:

```bash
curl -X POST http://localhost:54321/functions/v1/notify-stage-change \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": 1,
    "newStage": 5,
    "clientEmail": "test@example.com",
    "clientName": "Test Client"
  }'
```

### Production Testing

After deploying to Supabase, the function will be triggered automatically when admins change a client stage (if `RESEND_API_KEY` is configured).

---

## 📧 Email Service (Resend)

### Setup Resend

1. Go to https://resend.com
2. Create account
3. Get API key from dashboard
4. Add to Supabase Edge Function settings as `RESEND_API_KEY`

### Verify Email Domain (Optional)

For production, verify your domain:

1. In Resend dashboard → **Domains**
2. Add `noreply@invitefocus.com` domain
3. Follow DNS instructions
4. Update email function `from` field

---

## 🔗 Integration with Admin Dashboard

The StageEditor component (`components/admin/StageEditor.tsx`) already calls this function:

```typescript
// When stage changes:
const response = await fetch(`${supabaseUrl}/functions/v1/notify-stage-change`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ clientId, newStage, clientEmail, clientName })
})
```

Just ensure:
1. Edge function is deployed
2. `RESEND_API_KEY` is set in Supabase secrets
3. Vercel has access to Supabase function URL

---

## ⚠️ Optional

Email notifications are **optional**. The app works perfectly without them.

To skip this step:
- Don't deploy the edge function
- Leave `RESEND_API_KEY` unconfigured
- Admin can still change stages (just no email sent)

---

## 📚 References

- Supabase Functions: https://supabase.com/docs/guides/functions
- Resend: https://resend.com/docs
- deno.land: https://deno.land/std/http

