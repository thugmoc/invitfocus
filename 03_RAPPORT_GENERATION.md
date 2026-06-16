# 03_RAPPORT_GENERATION

## Objectif

Documenter le pipeline de génération de rapports avec Python, Claude API et PDF, puis publier les rapports dans Google Drive.

---

## 1. Vue d’ensemble

### Flux opérationnel
1. Collecte des documents client
2. Extraction des données financières
3. Appel Claude API pour l’analyse
4. Génération du rapport PDF
5. Upload sur Google Drive
6. Notification et mise à jour Airtable

### Données accessibles
- Dossier client existant: https://drive.google.com/drive/folders/1A62XdE0I6I2TB7-NbC3BiLRCoQOSZQi1?usp=sharing
- Dossier de sortie PDF: `Drive/INVITEFOCUS/Reports`

---

## 2. Pipeline Python

### Extraction

- `extract_data.py` lit les fichiers Excel/PDF
- Recherche automatique des sections clés: bilan, compte de résultat, flux de trésorerie
- Convertit les données en format structuré

### Analyse IA

- `claude_analysis.py` appelle Claude API
- Génère:
  - F1: diagnostic financier
  - F2: pilotage opérationnel
  - F3: stratégie croissance
- Vérifie que le texte est cohérent et bien formaté

### Génération PDF

- `generate_report.py` construit le rapport HTML via Jinja2
- Convertit en PDF avec WeasyPrint
- Structuration:
  - Page de garde
  - Résumé exécutif
  - Sections F1/F2/F3
  - Synthèse et recommandations

### Upload Drive

- `upload_report.py` publie le PDF dans Google Drive
- Met à jour le document client dans Airtable avec le lien

---

## 3. Commandes de base

### Générer un rapport pour un client
```bash
python generate_report.py --client-id CLIENT123
```

### Générer un batch de clients
```bash
python generate_all_reports.py --status "Ready for Analysis" --output "/drive/reports"
```

### Vérifier l’accès Google Drive
```bash
python scripts/test_drive_connection.py
```

---

## 4. Structure du rapport

### Sections principales
- **Introduction**: contexte client et périmètre
- **F1 - Diagnostic financier**: forces, faiblesses, risques
- **F2 - Pilotage opérationnel**: actions concrètes et priorités
- **F3 - Stratégie croissance**: opportunités et levées
- **Synthèse KPI**: CA, marge, trésorerie, endettement
- **Plan d’action**: 3 priorités à 90 jours

### Exemples de sous-sections
- Points de vigilance
- Recommandations rapides
- Opportunités de cash
- Optimisation des charges

---

## 5. Intégration Google Drive

### Dossier principal
- `INVITEFOCUS BETA / Clients / [Nom client] / Rapports`

### Bonnes pratiques
- Nom de fichier: `INVITEFOCUS_[Client]_[YYYYMMDD].pdf`
- Partage restreint au client et à l’équipe
- versioning via date dans le nom de fichier

---

## 6. Validation qualité

### Checklist post-génération
- [ ] PDF ouvre correctement
- [ ] Sections F1/F2/F3 présentes
- [ ] Chiffres alignés avec Airtable
- [ ] Aucun contenu placeholder
- [ ] Nom client correct
- [ ] Date correcte

### Si problème
1. Relancer la génération
2. Vérifier le log de Claude
3. Corriger le prompt ou les données
4. Re-tester

---

## 7. Exemple de prompt Claude

```text
Vous êtes un expert financier sénégalais. Analysez ces données:
CA: 12 000 000 XOF
Profit: 1 200 000 XOF
Trésorerie: 2 500 000 XOF
Endettement: 4 500 000 XOF

Générez:
- F1: diagnostic financier
- F2: pilotage opérationnel
- F3: stratégie croissance

Répondez en français, sections claires et conseils actionnables.
```
