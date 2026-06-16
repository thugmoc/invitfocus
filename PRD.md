# 📋 PRD - INVITEFOCUS

**Product Requirements Document**

**Statut:** Version finale
**Validation:** Khalif + Aminata + Bi Boty

---

## 1. Contexte & proposition

### Problème

Les cabinets de conseil financier en Afrique de l’Ouest sont freinés par:
- Analyse manuelle trop longue (8-10h par client)
- Données clients dispersées et non structurées
- Mauvaise visibilité des clients sur les recommandations
- Difficulté à scaler sans recruter massivement

### Solution

INVITEFOCUS est une plateforme de diagnostic financier automatisée qui transforme les données client en rapports professionnels en 24-48h.

Elle combine:
- Un onboarding client digital
- Une collecte de documents centralisée
- Un moteur Python + Claude API
- Une génération de rapport PDF
- Un suivi client et des KPI visibles

---

## 2. Valeur produit

### Objectifs

- Réduire le temps d’analyse client à 24-48h
- Offrir une expérience client fluide et transparente
- Augmenter la capacité de production sans coûts fixes élevés
- Générer des recommandations actionnables et mesurables

### KPI cibles

- Satisfaction client >= 80%
- Délai moyen de livraison <= 48h
- Taux de complétion des données >= 80%
- MRR cible 30K€ en phase 2
- Aucun bug critique en BETA

---

## 3. Fonctions principales

### Fonctionnalité 1: Portail client

**Objectif:** centraliser les interactions clients

- Dashboard client
- Upload de documents sécurisés
- Suivi du statut de l’analyse
- Accès au rapport final
- Messagerie simple

**Critères de succès**
- Dashboard responsive
- Upload fonctionnel
- Statut visible en temps réel
- Accès au rapport fourni

### Fonctionnalité 2: Génération de rapport automatique

**Objectif:** transformer les données en analyses et PDF

- Pipeline Python d’extraction
- Analyse Claude API F1/F2/F3
- Création de rapports PDF
- Upload vers Google Drive

**Critères de succès**
- Rapport généré en max 48h
- Sections F1/F2/F3 présentes
- Résultats professionnels
- Aucune perte de données

### Fonctionnalité 3: CRM & gestion client

**Objectif:** suivre les clients et l’avancement

- Base Airtable structurée
- Suivi des statuts
- Gestion des tâches et des documents
- Automations Zapier

**Critères de succès**
- Données clients complètes
- Suivi des tâches opérationnel
- Notifications fonctionnelles
- Rapport de pipeline clair

### Fonctionnalité 4: Dashboard analytique

**Objectif:** piloter l’activité et les performances

- KPI de revenus
- Statut des clients
- Temps de traitement
- Satisfaction et feedback

**Critères de succès**
- Dashboard facilement lisible
- Données actualisées
- Export CSV possible
- Filtres par période et consultant

---

## 4. Phases de rollout

### Phase 1: BETA

**Cible**: 3-5 clients
**Objectif**: valider le flux end-to-end

Livrables:
- Landing page
- Onboarding client
- Génération de rapport
- Suivi Airtable

Critères GO/NO-GO:
- 80%+ satisfaction
- 0 incident critique
- Livraison en 48h
- 2 cas clients prêts

### Phase 2: SCALE

**Cible**: 20 clients / mois
**Objectif**: industrialiser le delivery

Livrables:
- Dashboard analytique
- Messaging client
- Automatisations complètes
- Recrutement junior

Critères:
- 20 clients/mois
- 30K€ MRR
- Process fiable

### Phase 3: PRODUCT

**Cible**: 50 clients / mois
**Objectif**: lancer un produit SaaS plus complet

Livrables:
- App mobile
- API clients
- Fonctions premium
- Partenariats locaux

Critères:
- 75K€ MRR
- 50 clients actifs
- 2+ intégrations

---

## 5. Budget infrastructure

- Airtable Pro: 120€/mois
- Zapier Pro: 99€/mois
- Claude API: 50-70€/mois
- Google Workspace / Drive: 6€/mois
- Hébergement / domaine: 20€/mois

**Total:** 295€/mois

---

## 6. Success criteria

### GO

- 80%+ clients satisfaits
- 24-48h délai tenu
- 0 panne critique
- 3 rapports BETA validés
- Infrastructure stable

### NO-GO

- < 70% satisfaction
- Délais > 72h
- Incident critique non résolu
- Données perdues ou erronées
- Automations non fiables

---

## 7. Validation

- Khalif: approbation produit
- Aminata: approbation commerciale
- Bi Boty: approbation technique

---

## 8. Rôles & responsabilités

- **Khalif**: suivi stratégique, décision finale
- **Aminata**: commercial, onboarding client, suivi satisfaction
- **Bi Boty**: technique, génération rapports, QA

---

## 9. Annexes

- Liste de documents clients requis
- Modèles d’e-mails
- Templates de rapport
- Matrice de priorisation
