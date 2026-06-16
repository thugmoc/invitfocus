# 🎨 DESIGN SYSTEM - INVITEFOCUS

**Version finale du design system pour la plateforme de diagnostic financier.**

---

## 1. Design tokens

### Couleurs

- `--color-primary`: #2E75B6
- `--color-primary-dark`: #1C5A96
- `--color-primary-light`: #5B9FD9
- `--color-accent`: #F96167
- `--color-accent-dark`: #E73847
- `--color-surface`: #FFFFFF
- `--color-surface-alt`: #F8FBFF
- `--color-border`: #D8DFE5
- `--color-text`: #1A1A2E
- `--color-muted`: #889098
- `--color-success`: #27AE60
- `--color-warning`: #F39C12
- `--color-danger`: #E74C3C
- `--color-info`: #3178C6

### Typographie

**Font stack**
- Primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
- Mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Menlo, Courier, monospace

**Échelle de taille**
- `H1`: 2.75rem / 44px / 700
- `H2`: 2.25rem / 36px / 700
- `H3`: 1.75rem / 28px / 600
- `H4`: 1.375rem / 22px / 600
- `H5`: 1.125rem / 18px / 600
- `H6`: 1rem / 16px / 600
- `Body Large`: 1.125rem / 18px / 400
- `Body`: 1rem / 16px / 400
- `Small`: 0.875rem / 14px / 400
- `Caption`: 0.75rem / 12px / 400

### Poids de police

- Light: 300
- Regular: 400
- Medium: 500
- SemiBold: 600
- Bold: 700

### Espacement

- `xs`: 4px / 0.25rem
- `sm`: 8px / 0.5rem
- `md`: 16px / 1rem
- `lg`: 24px / 1.5rem
- `xl`: 32px / 2rem
- `2xl`: 48px / 3rem
- `3xl`: 64px / 4rem
- `4xl`: 96px / 6rem

### Bordures

- `radius-none`: 0px
- `radius-sm`: 6px
- `radius-md`: 8px
- `radius-lg`: 12px
- `radius-xl`: 16px
- `radius-2xl`: 24px
- `radius-full`: 9999px

### Animations

- `duration-fast`: 120ms
- `duration-base`: 200ms
- `duration-slow`: 300ms
- `easing-standard`: cubic-bezier(0.4, 0, 0.2, 1)
- `easing-entrance`: cubic-bezier(0.0, 0, 0.2, 1)
- `easing-exit`: cubic-bezier(0.4, 0, 1, 1)

### Ombres

- `shadow-xs`: 0 1px 2px rgba(0, 0, 0, 0.04)
- `shadow-sm`: 0 4px 6px rgba(0, 0, 0, 0.08)
- `shadow-md`: 0 8px 16px rgba(0, 0, 0, 0.10)
- `shadow-lg`: 0 16px 32px rgba(0, 0, 0, 0.12)
- `shadow-xl`: 0 24px 48px rgba(0, 0, 0, 0.14)

---

## 2. Responsive & accessibilité

### Breakpoints

- `xs`: 320px
- `sm`: 480px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `xxl`: 1536px
- `max`: 1920px

### Principes

- Mobile-first
- Grilles adaptatives
- Textes lisibles dès 320px
- Touch targets >= 44px
- Pas de scroll horizontal sur mobile
- Images et vidéos responsives

### Conformité WCAG 2.1 AA

- Ratio de contraste texte / fond >= 4.5:1
- Ratio large texte >= 3:1
- Focus visible sur tous les éléments interactifs
- Textes redimensionnables sans perte de contenu
- Structure sémantique HTML et attributs ARIA
- Formulaires accessibles et labels associés

---

## 3. Composants principaux

### Boutons

**Variants**
- `Primary`: fond #2E75B6, texte blanc, radius 12px
- `Accent`: fond #F96167, texte blanc, radius 12px
- `Secondary`: fond blanc, bord #2E75B6, texte #2E75B6
- `Ghost`: fond transparent, bord #D8DFE5, texte #1A1A2E
- `Danger`: fond #E74C3C, texte blanc
- `Success`: fond #27AE60, texte blanc

**Tailles**
- Small: 10px 16px / 14px
- Medium: 12px 24px / 16px
- Large: 16px 32px / 18px

**États**
- Default: opacité 1
- Hover: shadow-lg, translateY(-2px)
- Active: scale(0.98)
- Disabled: opacité 0.5, curseur `not-allowed`
- Loading: spinner intégré, interaction bloquée

### Champs de formulaire

- Hauteur: 44px standard
- Padding: 12px 16px
- Bord: 1px solid #D8DFE5
- Bord radius: 12px
- Background: #FFFFFF
- Police: 16px, #1A1A2E

**États**
- Focus: bord #2E75B6, ombre légère
- Erreur: bord #E74C3C, texte #E74C3C
- Succès: bord #27AE60, icône valide
- Disabled: fond #F8FBFF, texte #889098

### Cartes

- Fond: #FFFFFF
- Bord: 1px solid #E8ECEF
- Border radius: 16px
- Padding: 24px
- Ombre: 0 16px 40px rgba(46, 117, 182, 0.08)
- Hover: border #2E75B6, shadow-lg, lift

### Modal

- Overlay: rgba(26, 26, 46, 0.55)
- Container: max-width 640px
- Padding: 32px
- Border radius: 20px
- Focus trap et accessible
- Animation: translateY(16px) + opacity

### Tableaux

- Ligne alternée légère
- Header fixe sur desktop
- Lignes au hover: fond #F0E6FF
- Actions iconographiques + label
- Pagination accessible

### Badges

- Info: #3178C6
- Succès: #27AE60
- Avertissement: #F39C12
- Danger: #E74C3C
- Neutre: #889098

---

## 4. Guidelines UX

### Lisibilité

- Titres bien hiérarchisés
- Interlignage 1.5
- Paragraphes courts
- Listes à puces pour informations clés

### Visibilité

- CTA principaux en bleu primaire
- Accent rouge pour actions critiques et erreurs
- Couleurs neutres pour interfaces secondaires
- Contrastes validés systématiquement

### Formulaires

- Labels au-dessus des champs
- Aide inline pour erreurs
- Validation en temps réel
- Navigation clavier complète

### Comportements

- Animations discrètes et optimisées
- Transitions 200ms standard
- Pas de contenu masqué ou non-lisible
- Interactions tactiles prioritaires

---

## 5. Patterns de page

### Page Dashboard

- Header fixe
- Cards de synthèse
- Navigation secondaire claire
- Grille responsive 1 à 3 colonnes
- Footer minimal

### Page Client

- En-tête client avec statut
- Section documents + uploads
- Section rapport disponible
- Timeline d'avancement
- Sidebar actions rapides

### Page Reporting

- Tableau des rapports
- Filtres par statut / période
- Boutons download et preview
- Résumé KPIs en haut

### Page Onboarding

- Étapes claires 1-2-3-4
- Instructions visuelles
- Champs simples
- Messages de confirmation

---

## 6. Accessibilité et qualité

- Design aligné WCAG 2.1 AA
- Focus visible sur tous les éléments
- Texte lisible sur mobile et desktop
- Interaction clavier complète
- Contraste testé sur les couleurs principales
- Composants réutilisables et fiables
