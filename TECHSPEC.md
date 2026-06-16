# 🔧 TECHSPEC - INVITEFOCUS

**Spécifications techniques de la plateforme finale**

---

## 1. Architecture

### 4 couches

1. **Interface utilisateur**
   - Landing page responsive
   - Portail client
   - Dashboard analyste
   - Composants accessibles et mobiles

2. **Intégration**
   - Airtable API
   - Zapier automations
   - Google Drive / Sheets API
   - Claude API

3. **Application**
   - Pipeline Python d’extraction et de génération
   - Analyse IA F1/F2/F3
   - Génération PDF
   - Orchestration de tâches

4. **Données**
   - Airtable comme base principale
   - Google Drive pour le stockage des fichiers
   - Logs applicatifs
   - Sauvegardes et versions

---

## 2. Stack technique

### Frontend
- HTML/CSS/JS statique
- Responsive 320-1920px
- WCAG 2.1 AA
- Hébergement: Netlify / Vercel / équivalent

### Backend
- Python 3.11+
- Librairies clés:
  - anthropic (Claude API)
  - pandas / openpyxl
  - jinja2
  - weasyprint
  - pyairtable
  - google-auth / google-api-python-client

### Intégrations
- Claude API
- Airtable
- Zapier
- Google Drive
- Google Sheets
- Slack notifications

---

## 3. Pipeline rapport

### Étape 1: collecte

- Onboarding client
- Upload des documents
- Stockage sur Google Drive
- Enregistrement Airtable

### Étape 2: extraction

- Lecture Excel / PDF
- Extraction des chiffres clés
- Vérification de la cohérence
- Calcul du score qualité

### Étape 3: analyse IA

- Prompt Claude structuré
- Génération des sections:
  - F1: Diagnostic financier
  - F2: Pilotage opérationnel
  - F3: Stratégie croissance
- Vérification de la qualité de sortie

### Étape 4: génération

- Template HTML / Jinja2
- Conversion PDF WeasyPrint
- Upload sur Google Drive
- Mise à jour Airtable
- Notification client

---

## 4. Sécurité

### Transmission
- HTTPS / TLS 1.3 partout
- API calls sécurisés
- Cookies sécurisés et SameSite strict

### Stockage
- Google Drive encrypté AES-256 côté Google
- Airtable encrypté en transit et au repos
- Clés API stockées en variables d’environnement

### Accès
- Clients: accès limité à leurs propres documents
- Consultants: accès aux dossiers clients autorisés
- Admin: accès global
- Authentification basée sur les permissions existantes Airtable / backend

### Confidentialité
- Données conservées 12 mois
- Archivage après fin d’engagement
- Suppression sur demande
- NDA signée pour tous les clients BETA

---

## 5. Performance

### Capacités actuelles
- 5 rapports/jour max en BETA
- 1 pipeline batch par heure
- Temps de génération cible: 30-60 min / client
- API Claude: 2-5 appels par rapport

### Limites
- Airtable: 30 req/sec
- Claude: 50 req/min (quota)
- Google Drive: limites d’API journalières
- Temps CPU en local

### Optimisations
- Mise en batch des analyses
- Cache des requêtes répétitives
- Vérification progressive des documents
- Réduction des appels Claude quand possible

---

## 6. Bottlenecks & solutions

| Goulot | Cause | Solution | Phase |
|--------|-------|----------|-------|
| Extraction manuelle | Format multiples | Standardiser templates | Phase 2 |
| Quotas API | Usage Claude | Batch + cache | Phase 2 |
| Disponibilité analyste | Process semi-manuel | Automatiser pipelines | Phase 3 |
| Stockage Drive | Accès latency | Archiver ancien | Phase 4 |
| Scalabilité | Monopole local | Microservices | Phase 4+ |

---

## 7. Future architecture

### Phase 3+

- Passage à une architecture microservices
- File d’attente (Celery / Redis)
- Base SQL dédiée si besoin
- Frontend React ou Next.js
- Authentification propre
- Monitoring avancé (Sentry / Datadog)

### Roadmap technique

- Phase 2: améliorer robustesse Airtable / API
- Phase 3: séparateur extraction / analyse / génération
- Phase 4: migration vers un backend cloud
- Phase 5: multi-tenant + expansion régionale

---

## 8. Notes de déploiement

- Variables d’environnement obligatoires:
  - `ANTHROPIC_API_KEY`
  - `AIRTABLE_API_KEY`
  - `GOOGLE_APPLICATION_CREDENTIALS`

- Exécuter les scripts depuis le workspace racine
- Vérifier les accès Drive avant chaque batch
- Documenter chaque incident dans Airtable
