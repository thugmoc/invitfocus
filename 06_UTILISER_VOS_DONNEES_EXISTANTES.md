# 06_UTILISER_VOS_DONNEES_EXISTANTES

## Objectif

Importer et exploiter rapidement la base clients existante pour accélérer le lancement de la BETA.

---

## 1. Pourquoi utiliser les données existantes ?

- Gain de temps: 1-2 jours au lieu de 14+ jours
- Validation rapide du pipeline
- Réduction des relances initiales
- Priorisation immédiate des clients prêts

## 2. Étapes d’import

### Étape 1: Accès Drive
- Ouvrir le dossier existant: https://drive.google.com/drive/folders/1A62XdE0I6I2TB7-NbC3BiLRCoQOSZQi1?usp=sharing
- Vérifier la structure des sous-dossiers
- Identifier les clients avec les documents essentiels

### Étape 2: Cartographie
- Créer une liste des clients existants
- Noter les documents disponibles pour chaque client
- Identifier les dossiers incomplets

### Étape 3: Import dans Airtable
- Ajouter chaque client à la table `Clients`
- Créer les enregistrements `Documents`
- Indiquer l’état de chaque document
- Ajouter le lien Drive dans le champ `Lien dossier Drive`

### Étape 4: Priorisation
- Priorité 1: dossier complet
- Priorité 2: dossier partiel mais exploitable
- Priorité 3: dossier incomplet

---

## 3. Comparaison de timing

### Option 1: Import des données existantes
- Temps total: 1-2 jours
- Actions:
  - Vérification du dossier Drive
  - Import Airtable
  - Validation initiale
  - Lancement de l’analyse

### Option 2: Collecte à partir de zéro
- Temps total: 14+ jours
- Actions:
  - Identification des clients
  - Envoi de demandes
  - Relances multiples
  - Attente d’uploads

### Bénéfice attendu
- 80% de temps économisé
- Processus BETA lancé en moins de 1 semaine
- Moins de friction pour les premiers clients

---

## 4. Intégration directe dans le pipeline

1. Marquer les clients existants `Ready for Analysis` si le dossier est complet.
2. Lancer immédiatement la génération de rapport.
3. Vérifier la qualité du premier rapport.
4. Ajuster le flux d’import si des documents manquent.

---

## 5. Bonnes pratiques

- Ne pas recréer des clients déjà présents
- Regrouper les documents par type
- Nommer les fichiers avec le nom du client et la date
- Conserver une note sur l’état du dossier
- Mettre à jour les statuts en temps réel

---

## 6. Exemples

### Client A: dossier complet
- Bilan
- Compte de résultat
- Relevé bancaire
- Factures clients et fournisseurs
- Plan de trésorerie

→ Statut: `Ready for Analysis`

### Client B: dossier partiel
- Bilan
- Relevé bancaire
- Factures clients

→ Statut: `Pending` + relance
