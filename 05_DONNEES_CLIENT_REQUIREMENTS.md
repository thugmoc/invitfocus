# 05_DONNEES_CLIENT_REQUIREMENTS

## Objectif

Lister les données client indispensables pour les diagnostics et définir le scoring de qualité, les modèles d’e-mails et les règles de validation.

---

## 1. Données requises

### Documents essentiels
- **Bilan / États financiers**
- **Compte de résultat**
- **Plan de trésorerie**
- **Factures clients**
- **Factures fournisseurs**
- **Relevés bancaires**
- **Contrats importants**
- **Prévisionnel de ventes (le cas échéant)**

### Informations structurelles
- Nom de l’entreprise
- Secteur d’activité
- Taille de l’entreprise
- Devise principale
- Contact principal
- Période analysée

### Données qualitatives
- Objectifs stratégiques
- Défis actuels
- Besoins prioritaires
- Hypothèses de croissance

---

## 2. Scoring qualité (0-100)

### Critères de scoring

| Critère | Points | Détails |
|--------|--------|---------|
| Bilan complet | 20 | Actif et passif détaillés |
| Compte de résultat | 20 | CA, charges, résultat | 
| Trésorerie | 15 | Solde et prévision |
| Factures clients | 10 | Volume représentatif |
| Factures fournisseurs | 10 | Volume représentatif |
| Relevés bancaires | 10 | 3 mois minimum |
| Informations stratégiques | 10 | Objectifs, challenges |
| Données de contact | 5 | Contact clair |
| Documents lisibles | 10 | Fichiers exploitables |

### Interprétations
- **0-39**: dossier insuffisant
- **40-69**: dossier partiel, besoin de relance
- **70-89**: dossier exploitable, engagement possible
- **90-100**: dossier complet, analyse rapide

---

## 3. Validation des données

### Règles clés
- Les documents doivent être lisibles et non corrompus.
- Les montants doivent être disponibles en devise principale.
- Les périodes doivent être claires.
- Les factures doivent couvrir au moins 3 mois.
- Les relevés bancaires doivent correspondre aux montants déclarés.
- Tous les documents doivent être accessibles depuis le dossier Drive.

### Contrôles automatiques
- Vérifier que chaque lien Drive ouvre un document
- Valider la présence des champs essentiels
- Comparer le total du CA et des charges entre les documents
- Rechercher les erreurs de format ou les pages manquantes

---

## 4. Modèles d’e-mails

### Email 1: Demande d’upload initial

```text
Objet: Documents requis pour votre diagnostic INVITEFOCUS

Bonjour [Nom],

Merci d’avoir accepté le diagnostic INVITEFOCUS.
Pour avancer rapidement, merci d’uploader les documents suivants:
- Bilan / compte de résultat
- Trésorerie / relevés bancaires
- Factures clients/fournisseurs
- Contrats importants

Lien d’upload: [AIRTABLE_FORM_LINK]

Date limite: [DATE + 7 jours]

Cordialement,
Aminata
```

### Email 2: Relance documents manquants

```text
Objet: Relance - documents manquants pour votre diagnostic

Bonjour [Nom],

Nous avons reçu une partie de vos documents, mais nous avons encore besoin de:
- [Liste des documents manquants]

Merci de les envoyer avant le [DATE].

Cela nous permettra de générer votre rapport rapidement.

Cordialement,
Aminata
```

### Email 3: Confirmation de dossier complet

```text
Objet: Dossier complet - nous lançons l’analyse

Bonjour [Nom],

Nous confirmons que votre dossier est complet.
Nous lançons maintenant l’analyse et vous recevrez votre rapport sous 48h.

Cordialement,
Aminata
```

---

## 5. Utilisation des données existantes

### Récupération
- Accéder au dossier Google Drive centralisé
- Vérifier chaque sous-dossier client
- Copier les liens Drive dans Airtable
- Marquer l’état d’avancement de chaque dossier

### Intégration dans le pipeline
- Dossier prêt = `Ready for Analysis`
- Dossier incomplet = `Pending`
- Dossier en révision = `Review`

### Conseils
- Prioriser les dossiers ayant un score >= 70
- Favoriser les clients avec données structurées
- En cas de documents insuffisants, relancer immédiatement
