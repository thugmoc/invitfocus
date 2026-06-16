# 02_AIRTABLE_SETUP

## Objectif

Créer une base Airtable structurée pour gérer les clients BETA, les documents, les tâches et les rapports.

## 1. Architecture CRM

### Tables recommandées

1. **Clients**
   - Nom client
   - Société
   - Email
   - Téléphone
   - Statut (Lead / Onboarding / Ready for Analysis / Report Generated / Feedback)
   - Score qualité
   - Date de création
   - Lien dossier Drive
   - Rapport final

2. **Documents**
   - Client (relation)
   - Type de document (BP, Comptabilité, Factures, Relevé bancaire)
   - Statut (Pending / Received / Verified)
   - URL Drive
   - Date upload
   - Commentaires

3. **Tâches**
   - Client (relation)
   - Action
   - Priorité
   - Responsable
   - Date d’échéance
   - Statut
   - Notes

4. **Rapports**
   - Client (relation)
   - Type de rapport
   - Date de génération
   - Lien PDF
   - Statut de livraison
   - Observations

## 2. Vues clés

### Clients
- `To Do Onboarding` (Statut = Lead / Onboarding)
- `Ready for Analysis` (Statut = Ready for Analysis)
- `Delivered` (Statut = Report Generated)
- `Feedback` (Statut = Feedback)

### Documents
- `Documents manquants` (Statut != Received)
- `A vérifier` (Statut = Received)
- `Prêts` (Statut = Verified)

### Tâches
- `Urgent` (Priorité = Élevée et Statut != Done)
- `Prochaines actions`
- `Relances clients`

### Rapports
- `Rapports récents`
- `À livrer`
- `Livrés`

## 3. Automations Zapier

### Automation 1: Document upload détecté
- Trigger: nouvelle ligne ou document mis à jour dans Airtable Documents
- Action: envoyer un message Slack à #beta-clients
- Action secondaire: créer une tâche de vérification dans la table Tâches

### Automation 2: Client prêt à l’analyse
- Trigger: changement de Statut à `Ready for Analysis`
- Action: envoyer un email interne à Bi Boty
- Action: ajouter une entrée dans la vue `Batch Analysis`

### Automation 3: Rapport généré
- Trigger: changement de Statut dans Rapports à `Livré`
- Action: envoyer un email au client avec le lien PDF
- Action: mettre à jour le statut client à `Report Generated`

### Automation 4: Relance automatique
- Trigger: statut Document = `Pending` depuis 5 jours
- Action: envoyer un email de relance au client
- Action: créer une tâche de suivi dans Airtable

## 4. Configurations importantes

### Permissions
- Clients: accès lecture limitée à leur propre dossier via lien partagé uniquement
- Consultants: accès édition aux tables Clients, Documents, Tâches, Rapports
- Admin: droits complets

### Champs calculés
- Score qualité = formule basée sur présence des documents essentiels
- Jour depuis création = `DATETIME_DIFF(TODAY(), {Date de création}, 'days')`
- Taux de complétion = `COUNTA({Documents reçus}) / 6` (ou nombre de pièces requis)

### Templates de mail
- Relance document
- Notification rapport prêt
- Confirmation de réception

## 5. Intégration des clients existants

1. Ouvrir le dossier Drive : https://drive.google.com/drive/folders/1A62XdE0I6I2TB7-NbC3BiLRCoQOSZQi1?usp=sharing
2. Importer les clients existants dans la table Clients.
3. Ajouter chaque document dans la table Documents avec lien Drive.
4. Attribuer un statut initial et une date d’échéance.

## 6. Bonnes pratiques

- Nommer les liens clairement: `Client_Nom_Type_Document`
- Vérifier les doublons avant import
- Maintenir un champ `Notes de qualité`
- Étiqueter les clients BETA pour les filtrer rapidement
