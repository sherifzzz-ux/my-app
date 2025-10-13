# 🌸 FlawlessBeauty - Thème Shopify

## 📋 Description

Thème Shopify premium adapté pour FlawlessBeauty, parapharmacie en ligne et cosmétiques au Sénégal. Ce thème respecte fidèlement le design system et l'identité visuelle de FlawlessBeauty.

## ✨ Caractéristiques Principales

### 🎨 Design & Identité Visuelle
- **Couleur principale** : Rose FlawlessBeauty (#F792CC)
- **Typographies** :
  - Titres : Playfair Display (serif élégant)
  - Corps : Inter (sans-serif moderne)
- **Style** : Premium féminin moderne, luxe accessible
- **Responsive** : Optimisé mobile-first

### 🏗️ Structure & Sections

#### 1. Bandeau USP
- Position sticky en haut
- Message par défaut : "LIVRAISON EN MOINS DE 24H À DAKAR (HORS DIMANCHES/JOURS FÉRIÉS)"
- Couleur : Gradient rose principal
- Personnalisable dans les paramètres

#### 2. Header
- Logo FlawlessBeauty (texte ou image)
- Barre de recherche intégrée
- Navigation desktop avec méga-menu
- Icônes : Recherche, Compte, Panier (avec compteur)
- Menu hamburger mobile

#### 3. Carrousel Hero
- Jusqu'à 10 slides
- Auto-rotation 5 secondes
- Navigation flèches + dots
- Overlay gradient rose
- Hauteur : 400px (mobile) / 500px (desktop)

#### 4. Grille de Catégories
- Layout responsive : 2 colonnes (mobile) → 3 colonnes (desktop)
- Effets hover : scale + glow
- Overlay gradient rose/rose pâle
- Images aspect-ratio 1:1 (carré)

#### 5. Cartes Produits
- **Badges dynamiques** :
  - Promo (-X%) : Rouge pulsant
  - Nouveau : Rose principal
  - Stock limité : Or
- **Prix** : Format CFA automatique
- **Actions** :
  - Ajouter au panier (gradient rose)
  - Voir détails (outline)
- **Effets** : Hover lift + glow shadow

#### 6. Footer (4 colonnes)
- **Colonne 1** : À propos + réseaux sociaux
- **Colonne 2** : Catégories principales
- **Colonne 3** : Informations (Marques, Mon compte, Blog, etc.)
- **Colonne 4** : Contact (téléphone, email, adresse)
- **Section paiement** : Orange Money, Wave, Visa, Mastercard
- **Bottom bar** : Copyright + crédits

#### 7. Navigation Mobile Sticky
- Position bottom fixe (z-index 999)
- 5 items : Accueil, Recherche, Boutique, Favoris, Compte
- Icônes Lucide 24×24px
- Hauteur min 44px (touch target)

## 🎨 Charte Graphique

### Couleurs
```css
/* Principales */
--color-primary: 247, 146, 204;        /* #F792CC Rose principal */
--color-primary-glow: 252, 174, 217;   /* #FCB4D9 Rose lumineux */
--color-accent: 241, 123, 100;         /* #F17B64 Corail/Pêche */

/* Fonctionnelles */
--color-urgent: 239, 68, 68;           /* #EF4444 Rouge urgence */
--color-success: 34, 139, 34;          /* #228B22 Vert succès */
--color-gold: 251, 191, 36;            /* #FBBF24 Or premium */

/* Neutres */
--color-background: 255, 255, 255;     /* #FFFFFF Blanc */
--color-foreground: 12, 10, 9;         /* #0C0A09 Noir */
--color-muted: 250, 242, 247;          /* #FAF2F7 Gris rosé */
--color-border: 245, 232, 241;         /* #F5E8F1 Bordures */
```

### Gradients
```css
--gradient-primary: linear-gradient(135deg, #F792CC, #FCB4D9);
--gradient-hero: linear-gradient(135deg, #F792CC 0%, #F17B64 100%);
--gradient-urgent: linear-gradient(135deg, #EF4444 0%, #F17B64 100%);
--gradient-gold: linear-gradient(135deg, #FBBF24 0%, #FDE047 100%);
```

### Shadows
```css
--shadow-soft: 0 2px 20px -2px rgba(247, 146, 204, 0.1);
--shadow-medium: 0 8px 30px -4px rgba(247, 146, 204, 0.15);
--shadow-strong: 0 16px 40px -8px rgba(247, 146, 204, 0.2);
--shadow-glow: 0 0 30px rgba(252, 174, 217, 0.4);
```

### Typographies

#### Tailles
| Niveau | Mobile | Desktop | Graisse | Usage |
|--------|--------|---------|---------|-------|
| H1 | 2.25rem (36px) | 3.75rem (60px) | Bold 700 | Hero titles |
| H2 | 1.875rem (30px) | 3rem (48px) | Bold 700 | Section titles |
| H3 | 1.5rem (24px) | 2.25rem (36px) | Semibold 600 | Subsections |
| H4 | 1.25rem (20px) | 1.875rem (30px) | Semibold 600 | Cards |
| Body | 1rem (16px) | 1.125rem (18px) | Regular 400 | Paragraphs |

## 📦 Fichiers & Structure

### Assets CSS
```
assets/
├── theme.css                          # CSS général
├── flawless-beauty-custom.css         # Styles personnalisés FlawlessBeauty
├── section-header.css                 # Header
├── section-footer.css                 # Footer
├── section-hero-carousel.css          # Carrousel
├── section-category-grid.css          # Grille catégories
├── section-announcement-bar.css       # Bandeau USP
└── ... autres composants
```

### Sections
```
sections/
├── announcement-bar.liquid            # Bandeau USP sticky
├── header.liquid                      # En-tête principal
├── footer.liquid                      # Pied de page
├── hero-carousel.liquid               # Carrousel hero
├── category-grid.liquid               # Grille catégories
├── mobile-nav-sticky.liquid           # Navigation mobile
├── featured-products.liquid           # Produits mis en avant
└── ... autres sections
```

### Snippets
```
snippets/
├── css-variables.liquid               # Variables CSS globales
├── flawless-beauty-product-card.liquid    # Carte produit
├── flawless-beauty-product-badge.liquid   # Badges produits
├── flawless-beauty-announcement-bar.liquid
├── flawless-beauty-footer-nav.liquid
└── ... autres snippets
```

## 🚀 Installation

### 1. Préparation
```bash
cd theme_shopify
zip -r flawlessbeauty-theme.zip ./*
```

### 2. Upload sur Shopify
1. Connexion admin Shopify
2. Boutique en ligne > Thèmes
3. Ajouter un thème > Importer un fichier zip
4. Sélectionner `flawlessbeauty-theme.zip`
5. Publier le thème

### 3. Configuration Initiale

#### a) Logo
- Thème > Personnaliser
- En-tête > Logo
- Importer logo FlawlessBeauty
- Largeur recommandée : 180-200px

#### b) Couleurs (déjà configurées)
Les couleurs FlawlessBeauty sont déjà intégrées dans `css-variables.liquid`

#### c) Typographies (déjà intégrées)
- Playfair Display pour les titres
- Inter pour le corps de texte

#### d) Bandeau USP
- Sections > Bandeau d'annonce
- Texte par défaut : "LIVRAISON EN MOINS DE 24H À DAKAR..."
- Personnalisable si besoin

#### e) Carrousel Hero
- Page d'accueil > Carrousel Hero
- Ajouter 3-10 slides
- Formats recommandés :
  - Desktop : 1920×1080px
  - Mobile : 800×600px

#### f) Grille Catégories
- Ajouter section "Grille de catégories"
- Ajouter 6 catégories principales :
  1. Soin du visage
  2. Corps & Bain
  3. Maquillage
  4. Cheveux
  5. Parfumerie
  6. Parapharmacie
- Images carrées 600×600px min

#### g) Footer
- Thème > Personnaliser > Footer
- Configurer :
  - Texte "À propos"
  - Liens catégories
  - Liens informations
  - Coordonnées contact
  - Réseaux sociaux

### 4. Navigation

#### Menu principal
Créer un menu "main-menu" avec :
- Nouveautés
- Promotion
- Soin du visage (avec sous-catégories)
- Corps & Bain (avec sous-catégories)
- Parapharmacie (avec sous-catégories)
- Cheveux (avec sous-catégories)
- Parfumerie (avec sous-catégories)
- Grossesse et Post-Partum
- Marques

#### Menu footer
Créer menus secondaires pour le footer

## 🎯 Fonctionnalités Spécifiques

### 1. Badges Produits Automatiques
- **Promo** : Si `compare_at_price` > `price`
- **Nouveau** : Si publié < 30 jours
- **Stock limité** : Si inventaire < 10 unités

### 2. Format Prix CFA
Les prix sont automatiquement formatés par Shopify. Configurer :
- Admin > Paramètres > Général
- Devise : XOF (Franc CFA)
- Format : "{{amount}} CFA"

### 3. Animations & Effets
- **Hover produits** : Lift -4px + glow shadow
- **Hover catégories** : Scale 1.05 + overlay
- **Carrousel** : Crossfade 500ms
- **Badges promo** : Pulse animation 2s

### 4. Responsive Breakpoints
```css
Mobile:   < 640px   (2 colonnes)
Tablet:   640-1023px (3 colonnes)
Desktop:  1024px+   (4-5 colonnes)
```

### 5. Navigation Mobile
- Activé automatiquement < 768px
- Fixed bottom, z-index 999
- Body padding-bottom 70px (compensation)

## 🛠️ Personnalisation Avancée

### Modifier les Couleurs
Éditer `snippets/css-variables.liquid` :
```css
--color-primary: R, G, B;  /* Nouvelle couleur */
```

### Ajouter une Section
1. Créer `sections/ma-section.liquid`
2. Créer `assets/section-ma-section.css`
3. Dans le .liquid :
```liquid
{{ 'section-ma-section.css' | asset_url | stylesheet_tag }}
<section class="ma-section">
  <!-- Contenu -->
</section>

{% schema %}
{
  "name": "Ma Section",
  "settings": [...]
}
{% endschema %}
```

### Modifier le Carrousel
- Vitesse auto-rotation : ligne 4 de `hero-carousel.liquid`
- Nombre max slides : `"max_blocks": 10` dans schema

## 📱 Optimisations Mobile

- Touch targets min 44×44px
- Images lazy loading
- Fonts swap display
- CSS critical inline
- Alpine.js defer loading
- Navigation sticky bottom

## 🌐 Adaptation Locale (Sénégal)

### Devise
- **CFA** (XOF) partout
- Format : "15,500 CFA" ou "15 500 CFA"

### Livraison
Messages adaptés :
- "Livraison < 24h à Dakar"
- "24-72h régions"

### Moyens de Paiement
Footer affiche :
- Orange Money
- Wave
- Visa
- Mastercard

## 🔧 Support & Maintenance

### Compatibilité
- Shopify 2.0 (Online Store 2.0)
- Alpine.js 3.x
- Modern browsers (Chrome, Firefox, Safari, Edge)

### Performance Cibles
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

## 📝 Changelog

### Version 1.0 (13 Oct 2025)
- ✅ Adaptation complète design FlawlessBeauty
- ✅ Charte graphique rose principal
- ✅ Carrousel hero 10 slides
- ✅ Grille catégories responsive
- ✅ Footer 4 colonnes
- ✅ Navigation mobile sticky
- ✅ Badges produits automatiques
- ✅ Typographies Playfair + Inter
- ✅ Bandeau USP sticky
- ✅ Effets hover premium

## 📧 Contact & Crédits

**Développé pour** : FlawlessBeauty  
**Parapharmacie en ligne & Cosmétiques**  
**Sénégal**

---

**© 2025 FlawlessBeauty. Tous droits réservés.**
