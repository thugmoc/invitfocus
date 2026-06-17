# INVITEFOCUS Setup Guide

## System Architecture

INVITEFOCUS implements a **progressive feature unlock** system based on client engagement stages:

### 6-Step Cabinet Process
1. **Prise de Contact** (Discovery) - Initial qualification
2. **Audit/Diagnostic** - Analysis of current state
3. **Cadrage** (Scoping) - Proposal & validation
4. **Exécution** (Execution) - Report generation
5. **Livraison** (Delivery) - Reports available to client
6. **Suivi** (Support) - Ongoing support & growth tools

### Feature Unlock Timeline
- **Étapes 1-4**: Internal setup, no client module access
- **Étape 5**: Unlock `Comptable`, `Juridique`, `Stratégie` (generated reports)
- **Étape 6**: Unlock `Simulateur`, `IA Tools`, `Messages` (growth & support)

---

## Database Setup (Supabase)

### 1. Create Tables
Run the SQL in `supabase_schema.sql`:

```bash
# Log into Supabase dashboard
# Go to SQL Editor
# Copy & paste supabase_schema.sql content
# Click "Run"
```

**Tables created:**
- `clients` — Client company info, contact, current stage
- `client_stages` — Audit trail of stage transitions
- `client_reports` — Generated reports per client

### 2. Row-Level Security (RLS)
All tables have RLS policies:
- **Admins** see all clients & documents
- **Clients** see only their own data & stage-appropriate modules
- **Module access** controlled by `current_stage` column

---

## Client Data Integration

### Mock Clients
`mock_clients.json` contains 15 archived clients with:
- Company name, sector, financials
- Current stage (1-6)
- Document references (accounting, legal, strategy)

**To import real clients:**
1. Export from Google Drive folder
2. Map to schema in `mock_clients.json`
3. Seed database via admin API endpoint

### Client Stages
```
currentStage = 1: No modules visible
currentStage = 5: Comptable, Juridique, Stratégie unlocked
currentStage = 6: All modules unlocked + Simulateur, IA, Messages
```

---

## Dashboard Layouts

### Client Dashboard (`/dashboard`)
**Role**: Client (authenticated SME)
- **Overview**: Shows current stage, timeline, unlocked modules
- **Comptable**: Generated financial reports (stage 5+)
- **Juridique**: Generated legal documents (stage 5+)
- **Stratégie**: Growth recommendations (stage 5+)
- **Simulateur**: Financial scenarios (stage 6+)
- **AI Tools**: Conversational AI (stage 6+)
- **Messages**: Support chat (stage 6+)

### Admin Dashboard (`/admin`)
**Role**: INVITEFOCUS staff
- **Dashboard**: Stats, pipeline overview
- **Clients**: All 15 clients with stage tracking
- **Pipeline**: Kanban view of client progress
- **Reports**: Generated documents library
- **Messages**: Support ticket queue

---

## Module Features

### Comptable (Stage 5+)
- Monthly financial statements
- Cash flow analysis
- Key ratios (gross margin, payback period, burn rate)
- Trend indicators

### Juridique (Stage 5+)
- Compliance audit results
- Legal documents library
- Formation checklist
- Recommendations

### Stratégie (Stage 5+)
- Growth strategy roadmap
- Market & positioning analysis
- 3-year financial projections
- Implementation timeline with KPIs

### Simulateur (Stage 6+)
- Conservative / Base / Aggressive scenarios
- Revenue/expense/profit modeling
- Scenario comparison

### IA Tools (Stage 6+)
- Conversational AI for financial questions
- Document-aware context
- Recommendations engine

### Messages (Stage 6+)
- Direct support channel
- Chat with advisors
- Thread-based conversations

---

## Authentication Flow

**Current State**: Mock authentication
- All routes check `currentStage` client variable (mock: stage 5)
- Dashboard Sidebar renders modules based on stage

**Next Phase**: Integrate with Supabase Auth
1. Enable GitHub OAuth in Supabase
2. Add `middleware.ts` to check auth state
3. Redirect unauthenticated users to login
4. Load `currentStage` from `users.current_stage` column

---

## Deployment

### Vercel
```bash
# Deploy automatically on git push
git push origin master
# Vercel CI/CD picks up changes from GitHub
```

**Environment Variables** (in Vercel project settings):
```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

---

## File Structure

```
invitfocus/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── dashboard/               # Client dashboard
│   │   ├── layout.tsx
│   │   ├── page.tsx (overview)
│   │   ├── accounting/
│   │   ├── legal/
│   │   ├── strategy/
│   │   ├── simulator/
│   │   ├── ai/
│   │   └── messages/
│   └── admin/                   # Admin dashboard
│       ├── layout.tsx
│       ├── page.tsx
│       ├── clients/
│       ├── pipeline/
│       ├── reports/
│       └── messages/
├── components/
│   ├── landing/                 # Landing page components
│   ├── dashboard/               # Shared dashboard components
│   │   ├── DashboardSidebar.tsx
│   │   ├── DashboardHeader.tsx
│   │   └── ...
│   └── admin/                   # Admin-specific components
├── mock_clients.json            # 15 client seed data
├── supabase_schema.sql          # Database schema
└── SETUP.md (this file)
```

---

## Testing Checklist

- [ ] Admin sees all 15 clients in `/admin/clients`
- [ ] Filtering by stage works (Étapes 1-6)
- [ ] Dashboard Sidebar shows locked modules before stage 5
- [ ] Stage 5 client sees Comptable, Juridique, Stratégie
- [ ] Stage 6 client sees all modules
- [ ] Overview page displays 6-step timeline
- [ ] Reports display with correct dates
- [ ] Mobile menu toggle works on sidebar
- [ ] Stats cards update based on filtered clients
- [ ] Vercel deployment successful (no 404s)

---

## Next Steps

1. **Supabase Integration**: Load `clients` & `client_reports` from database
2. **Authentication**: Connect GitHub OAuth via Supabase Auth
3. **Document Storage**: Implement file uploads to Supabase Storage
4. **Email Notifications**: Alert clients when stage changes
5. **Analytics**: Track feature unlock metrics
6. **Admin Bulk Upload**: CSV import for client data

---

## Support

For questions about:
- **Architecture**: See CLAUDE.md
- **Database**: See supabase_schema.sql comments
- **Deployment**: Check Vercel project settings
- **Styling**: See tailwind.config.js theme tokens
