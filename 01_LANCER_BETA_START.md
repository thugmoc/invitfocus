# 01_LANCER_BETA_START

## Guide BETA en 6 étapes (J1-J14)

**Objectif:** lancer le programme BETA, intégrer les clients existants et délivrer les premiers rapports.

---

## Étape 1: Préparation (Jour 1)

1. Vérifier les documents clients existants dans le dossier Google Drive fourni.
   - Lien: https://drive.google.com/drive/folders/1A62XdE0I6I2TB7-NbC3BiLRCoQOSZQi1?usp=sharing
2. Valider les accès Airtable et Zapier.
3. Confirmer la configuration des scripts Python et des clés API (Claude, Google, Airtable).
4. Exécuter un test rapide:
   - `python scripts/test_airtable_connection.py`
   - `python generate_report.py --client test`

### Livrables
- Accès au dossier Drive validé
- Environnement Python prêt
- Clés API en place

---

## Étape 2: Onboarding des clients (J2-J4)

1. Importer les clients existants dans Airtable.
2. Créer le pipeline de collecte de données pour chaque client.
3. Envoyer le formulaire de données et les instructions d’upload.
4. Noter les clients déjà prêts et prioriser ceux avec données complètes.

### Script de kick-off
```bash
python scripts/import_clients_from_drive.py --drive-folder "1A62XdE0I6I2TB7-NbC3BiLRCoQOSZQi1"
```

### Livrables
- Clients importés dans Airtable
- Documents indexés
- Priorité donnée aux clients les plus complets

---

## Étape 3: Collecte & validation (J5-J8)

1. Vérifier l’état des documents reçus.
2. Calculer le score qualité pour chaque dossier.
3. Relancer les clients incomplets.
4. Marquer les clients prêts à l’analyse.

### Checklist
- [ ] Dossier complet
- [ ] Documents lisibles
- [ ] Comptabilité disponible
- [ ] BP / trésorerie disponibles

---

## Étape 4: Génération des rapports (J9-J11)

1. Lancer la génération en batch pour les clients prêts.
2. Vérifier chaque PDF.
3. Mettre à jour Airtable avec les liens de rapport.
4. Préparer la livraison et le message de suivi.

### Commande
```bash
python generate_all_reports.py --status "Ready for Analysis"
```

---

## Étape 5: Livraison & présentation (J12-J13)

1. Envoyer les rapports aux clients.
2. Programmer les calls de présentation.
3. Collecter le feedback immédiat.
4. Intégrer les retours dans Airtable.

### Email de livraison
```text
Bonjour [Nom],

Votre diagnostic financier INVITEFOCUS est prêt.
Vous pouvez le télécharger ici: [LIEN PDF].

Nous proposons un call de présentation le [DATE].

Cordialement,
L’équipe INVITEFOCUS
```

---

## Étape 6: Revue finale & décision GO/NO-GO (J14)

1. Évaluer les résultats BETA.
2. Mesurer les KPIs: satisfaction, délai, qualité.
3. Consigner les retours et les bugs.
4. Prendre la décision GO/NO-GO.

### Critères GO
- 80%+ satisfaction clients
- 24-48h délai de livraison
- 0 incident critique non résolu
- 2 cas clients prêts

### Critères NO-GO
- Retours négatifs répétés
- Données manquantes critiques
- Processus non fiable
- Problèmes techniques majeurs

---

## Calendrier jour par jour

| Jour | Activité | Résultat |
|------|----------|----------|
| J1 | Préparation technique | Environnement prêt |
| J2 | Import clients | Base Airtable initiale |
| J3 | Kick-off + collecte | Documents en cours |
| J4 | Relances + validation | Dossiers prêts |
| J5 | Analyse initiale | Batch 1 prêt |
| J6 | Génération rapport | PDF produit |
| J7 | Livraison | Clients informés |
| J8 | Feedback | Ajustements faits |
| J9 | Nouvelle génération | Batch 2 |
| J10 | Contrôle qualité | Vérification |
| J11 | Préparation call | Agenda fixé |
| J12 | Présentation | Livraisons confirmées |
| J13 | derniers ajustements | corrections terminées |
| J14 | Décision GO/NO-GO | Go ou pause |
