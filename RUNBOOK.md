# 🧭 RUNBOOK - INVITEFOCUS

**Procédures opérationnelles pour le lancement BETA**

---

## 1. Opérations quotidiennes

### Standup matinal

**Objectif:** aligner l’équipe et détecter les blocages.

Participants: Aminata + Bi Boty

Checklist:
- [ ] Vérifier Airtable (nouveaux clients, docs reçus, échéances)
- [ ] Consulter Slack (#beta-clients)
- [ ] Vérifier les erreurs Zapier
- [ ] Contrôler l’usage Claude API
- [ ] Confirmer les priorités du jour

Format:
```
📊 Daily Standup - [DATE]
- Nouveaux clients: [N]
- Rapports prêts: [N]
- Blocages: [Liste]
- Priorités: [3 actions]
```

### Suivi clients

**Responsable:** Aminata

Étapes:
1. Filtrer Airtable sur clients en collecte
2. Identifier les documents manquants
3. Relancer par email ou message
4. Mettre à jour le statut

Template de relance:
```
Bonjour [Nom],
Nous avons besoin des documents suivants pour avancer sur votre diagnostic:
- [Liste des documents manquants]
Merci de les uploader avant le [DATE].
Lien: [AIRTABLE_FORM_LINK]
```

### Génération de rapports

**Responsable:** Bi Boty

Process:
1. Identifier les clients « Ready for Analysis »
2. Lancer le script Python batch
3. Vérifier la production PDF
4. Mettre à jour Airtable avec le lien de rapport
5. Envoyer notification client

Commande type:
```bash
python generate_all_reports.py --status "Ready for Analysis"
```

### Clôture de journée

Post du résumé:
```
📌 Fin de journée - [DATE]
- Clients traités: [N]
- Rapports générés: [N]
- Documents reçus: [N]
- Problèmes: [Liste]
- Priorité demain: [3 items]
```

---

## 2. Onboarding client

### Phase 1: Qualification (Jour 0)

Objectif: valider le potentiel et les données disponibles.

Checklist:
- Budget minimum confirmé
- Données comptables disponibles
- Objectif du client défini
- Kick-off call programmé

Script court:
```
Bonjour [Nom],
Merci pour votre intérêt.
Nous livrons un diagnostic financier en 24-48h.
Pour commencer, pouvez-vous confirmer que vous avez:
- Bilan ou livre de comptes
- Factures clients/fournisseurs
- Plan de trésorerie
```

### Phase 2: Kick-off (Jour 1)

Agenda:
- Présentation INVITEFOCUS
- Besoins du client
- Documents requis
- Calendrier et livrables
- Prochaine étape

Point clé:
- Lien upload de documents
- Deadline de 7 jours

### Phase 3: Collecte et validation (Jours 2-10)

Process:
- Vérifier upload document par document
- Calculer score qualité
- Relancer si incomplet
- Marquer « Ready for Analysis » dès 80%+ de complétude

### Phase 4: Livraison et feedback (Jours 11-12)

Étapes:
- Générer rapport
- Vérifier qualité
- Envoyer rapport au client
- Programmer présentation
- Demander feedback

---

## 3. Génération de rapport

### Pipeline standard

1. Extraction de données
2. Analyse Claude API
3. Génération PDF
4. Upload Drive
5. Notification client

### Vérification post-production

Checklist:
- [ ] PDF ouvre correctement
- [ ] Sections F1/F2/F3 présentes
- [ ] Données concordent avec Airtable
- [ ] Noms et dates corrects
- [ ] Taille du fichier raisonnable

### Actions si erreur

- Relancer le script client
- Vérifier la source du fichier
- Corriger les données manquantes
- Reprendre l’analyse Claude si nécessaire

---

## 4. Troubleshooting

### 1. Erreur d’installation Python

Symptôme: module introuvable

Solution:
```bash
pip install -r requirements.txt
```

### 2. Quota Claude API dépassé

Symptôme: RateLimitError

Solution:
- Redémarrer après 60s
- Lancer batch plus petit
- Vérifier usage sur la console Anthropic

### 3. Document introuvable sur Drive

Symptôme: FileNotFoundError

Solution:
- Vérifier le lien Google Drive
- Re-synchroniser le dossier client
- Relancer le script

### 4. Rapport PDF incomplet

Symptôme: sections manquantes

Solution:
- Ouvrir le log d’analyse
- Identifier le prompt Claude
- Réexécuter la génération

### 5. Données incorrectes

Symptôme: chiffres incohérents

Solution:
- Comparer avec Excel source
- Corriger l’extraction
- Relancer le pipeline

---

## 5. Escalade

### Niveau 1: incidents mineurs

- Responsable: Bi Boty
- Actions: corriger, redémarrer script, relancer automation
- SLA: 4h

### Niveau 2: blocage opérationnel

- Responsable: Aminata
- Actions: contact client, resynchroniser données, plan B
- SLA: 12h

### Niveau 3: incident critique

- Responsable: Khalif
- Actions: arrêt temporaire, communication client, correction prioritaire
- SLA: 24h

---

## 6. Scripts prêts à utiliser

### Reporting batch

```bash
python generate_all_reports.py --status "Ready for Analysis" --output "/drive/reports"
```

### Test connexion Airtable

```bash
python scripts/test_airtable_connection.py
```

### Vérifier les rapports générés

```bash
python scripts/verify_reports.py --input "/drive/reports"
```

### Relancer une génération client

```bash
python generate_all_reports.py --client-id CLIENT123
```

### Exporter les KPI

```bash
python scripts/export_kpis.py --month 2026-05
```
