# 04_LAUNCH_CHECKLIST

## Checklist de lancement BETA

### 1. Pré-lancement
- [ ] Vérifier les accès Google Drive
- [ ] Vérifier les clés API Claude, Airtable, Google
- [ ] Tester le script de génération de rapport
- [ ] Vérifier la configuration du dossier client existant
- [ ] Activer les automations Zapier
- [ ] Préparer le template email de bienvenue
- [ ] Créer les vues Airtable clés
- [ ] Mettre à jour le dossier de suivi des clients

### 2. Onboarding client
- [ ] Importer les clients existants dans Airtable
- [ ] Vérifier les documents reçus
- [ ] Classer les dossiers par priorité
- [ ] Envoyer le formulaire d’upload
- [ ] Confirmer réception des documents essentiels
- [ ] Calculer un score qualité initial
- [ ] Marquer les clients prêts à l’analyse
- [ ] Mettre en place les relances automatiques

### 3. Génération de rapports
- [ ] Lancer la génération batch
- [ ] Vérifier chaque PDF
- [ ] Corriger les anomalies de données
- [ ] Valider les résultats avec l’équipe
- [ ] Publier les rapports dans Drive
- [ ] Mettre à jour les liens Airtable
- [ ] Envoyer notification client

### 4. Livraison & présentation
- [ ] Envoyer le rapport final au client
- [ ] Programmer le call de restitution
- [ ] Préparer le support de présentation
- [ ] Documenter les points clés du rapport
- [ ] Recueillir le feedback client
- [ ] Mettre à jour le statut client
- [ ] Créer une note de synthèse interne

### 5. Post-lancement
- [ ] Vérifier les retours de la première semaine
- [ ] Ajuster le prompt Claude si nécessaire
- [ ] Ajuster les automations Zapier
- [ ] Enregistrer les efficiencies et blocages
- [ ] Préparer le rapport de phase BETA
- [ ] Planifier la décision GO/NO-GO

---

## Matrice GO / NO-GO

| Critère | GO | NO-GO |
|--------|----|-------|
| Satisfaction client | >= 80% | < 70% |
| Délai de livraison | <= 48h | > 72h |
| Qualité de contenu | Relire OK | Sections manquantes |
| Processus stable | Automations OK | Bugs majeurs |
| Feedback client | Retour positif | Retours négatifs |

### Décision GO
- Tous les critères sont satisfaits ou peuvent être corrigés rapidement
- Aucun incident critique ouvert
- 2 cas clients prêts pour démonstration

### Décision NO-GO
- Retours significatifs négatifs
- Processus non stable
- Données manquantes ou incohérentes
- Clientèle non engagée

---

## Gestion des risques

### Risques principaux
- Données clients incomplètes
- Problèmes de quota Claude API
- Erreurs de génération PDF
- Automations Airtable / Zapier cassées
- Retards de livraison

### Actions d’atténuation
- Relances clients rapides
- Batches plus petits pour Claude
- Vérifications manuelles de QA
- Escalade immédiate en cas d’erreur critique
- Plan de secours sans automation si nécessaire

---

## Contrôle qualité final
- [ ] 5 rapports test vérifiés
- [ ] 3 clients BETA confirmés
- [ ] Dossier Drive organisé
- [ ] Processus documenté
- [ ] Tous les emails prêts
- [ ] Tableau de bord KPI opérationnel
