# 📋 DESCRIPTIF COMPLET DU SITE FLAWLESSBEAUTY

## 🏗️ 1. STRUCTURE GÉNÉRALE DE LA PAGE

### Disposition Globale

Le site FlawlessBeauty adopte une **architecture moderne en couches verticales** :

#### 🎯 Ordre des Sections Principales
```
┌─────────────────────────────────────────┐
│  Bandeau USP (Livraison <24h)          │ ← Fixé en haut
├─────────────────────────────────────────┤
│  Header Principal                       │ ← Sticky
│  - Logo centré (mobile) / gauche (desk) │
│  - Barre de recherche visible           │
│  - Icônes Cœur, Mon compte, Panier      │
├─────────────────────────────────────────┤
│  Méga-menu Catégories                   │ ← Navigation principale
│  - Multi-niveaux avec dropdowns         │
├─────────────────────────────────────────┤
│  Hero Section (Carrousel)               │ ← Pleine largeur 400-500px
│  - 10 slides auto (5s interval)         │
│  - Gradient overlay rose/rose pâle      │
├─────────────────────────────────────────┤
│  Grille Catégories                      │ ← Largeur conteneur max-7xl
│  - 6 catégories principales             │
│  - Aspect square, hover scale           │
├─────────────────────────────────────────┤
│  Produits Mis en Avant                  │ ← Section centrée
│  - Grille responsive produits           │
├─────────────────────────────────────────┤
│  Logos Marques Partenaires              │ ← Défilement automatique
│  - Animation scroll infinie             │
├─────────────────────────────────────────┤
│  Showcase Produits                      │ ← Section alternée
│  - Mise en avant promotions             │
├─────────────────────────────────────────┤
│  Recommandations Personnalisées         │ ← Contenu dynamique
├─────────────────────────────────────────┤
│  Section Nouveautés                     │ ← Derniers produits
├─────────────────────────────────────────┤
│  Footer (Desktop)                       │ ← 4 colonnes, fond sombre
│  - Catégories, Service, Légal, Paiement│
├─────────────────────────────────────────┤
│  Navigation Mobile Fixe                 │ ← Bottom bar (mobile only)
│  - 4 boutons : Accueil, Marques,       │
│    Panier, Compte                       │
└─────────────────────────────────────────┘
```

### Largeur du Contenu

- **Conteneur principal** : `max-w-7xl` (1280px max) centré avec `mx-auto`
- **Padding horizontal** : 
  - Mobile : `px-4` (16px)
  - Tablette : `px-6` (24px)
  - Desktop : `px-8` (32px)
- **Hero Section** : **Pleine largeur** (100vw) avec overlay
- **Footer** : **Pleine largeur** fond sombre, contenu en `max-w-7xl`

### Comportement Scroll et Interactions

#### ✨ Effets de Défilement
- **Scroll vertical classique** (pas de parallaxe)
- **Header sticky** : reste visible lors du scroll
- **Bandeau USP** : reste fixe en haut (visible en permanence)
- **Navigation mobile** : bottom bar fixe en `z-[9999]`

#### 🎬 Animations au Scroll
- **Fade-in progressif** sur les cartes produits
- **Hover lift** : élévation de -4px au survol (`-translate-y-1`)
- **Hover glow** : ombre portée animée (`shadow-glow`)
- **Scale hover** : agrandissement 1.05× sur les catégories

#### 🔄 Effets Automatiques
- **Carrousel hero** : rotation auto 5s avec indicateurs dots
- **Scroll marques** : défilement horizontal infini (20s loop)
- **Pulse badges** : animation pulsation 2s sur badges promo

---

## 🎨 2. CHARTE GRAPHIQUE ET IDENTITÉ VISUELLE

### Palette de Couleurs Principales

#### 🌸 Couleur Signature : Rose FlawlessBeauty
```css
--primary: 330 67% 76%       /* #F792CC - Rose principal */
--primary-foreground: 0 0% 100%  /* Blanc pour contraste */
--primary-glow: 330 67% 85%     /* #FBB8E3 - Effet lumineux */
```
**Utilisation** : Badges, boutons principaux, liens actifs, logos, accents visuels

#### 🎀 Couleurs Secondaires
```css
--secondary: 330 25% 95%        /* #F9ECF6 - Rose très pâle */
--secondary-foreground: 330 67% 30%  /* #7A1952 - Rose foncé pour texte */
--accent: 15 86% 65%            /* #F37958 - Coral/Pêche pour accents */
```
**Utilisation** : Fonds de carte, états hover, variations de boutons

#### 🔥 Couleurs Fonctionnelles
```css
--urgent: 0 85% 60%            /* #E8384F - Rouge urgence */
--success: 142 76% 36%         /* #15B662 - Vert succès */
--gold: 43 96% 56%             /* #F2C94C - Or pour badges premium */
--destructive: 0 84.2% 60.2%   /* #E63946 - Rouge erreur */
```

#### ⚪ Palette Neutre
```css
--background: 0 0% 100%        /* #FFFFFF - Fond principal blanc */
--foreground: 222.2 84% 4.9%   /* #020817 - Texte principal noir */
--muted: 330 25% 96%           /* #FAF3F8 - Gris rosé clair */
--muted-foreground: 215.4 16.3% 46.9%  /* #64748B - Gris moyen */
--border: 330 25% 92%          /* #F5E5F1 - Bordures rose pâle */
```

### Typographies

#### 📝 Polices Principales
```css
--font-serif: 'Playfair Display', serif  /* Titres élégants */
--font-sans: 'Inter', sans-serif         /* Texte courant moderne */
```

#### 📏 Hiérarchie Typographique

| Niveau | Classe CSS | Taille Mobile | Taille Desktop | Graisse | Usage |
|--------|-----------|---------------|----------------|---------|-------|
| H1 | `heading-1` | 2.25rem (36px) | 3.75rem (60px) | Bold 700 | Titres hero |
| H2 | `heading-2` | 1.875rem (30px) | 3rem (48px) | Bold 700 | Titres sections |
| H3 | `heading-3` | 1.5rem (24px) | 2.25rem (36px) | Semibold 600 | Sous-sections |
| H4 | `heading-4` | 1.25rem (20px) | 1.875rem (30px) | Semibold 600 | Cartes |
| H5 | `heading-5` | 1.125rem (18px) | 1.5rem (24px) | Semibold 600 | Petits titres |
| Body | `text-body` | 1rem (16px) | 1.125rem (18px) | Regular 400 | Paragraphes |
| Small | `text-body-sm` | 0.875rem (14px) | 1rem (16px) | Regular 400 | Texte secondaire |
| Caption | `text-caption` | 0.75rem (12px) | 0.875rem (14px) | Regular 400 | Labels/métadonnées |

#### 📐 Espacements Typographiques
- **Line-height titres** : `leading-tight` (1.25)
- **Line-height body** : `leading-relaxed` (1.625)
- **Letter-spacing titres hero** : `tracking-wider` (0.05em)

### Icônes et Illustrations

#### 🎭 Style d'Icônes : **Lucide Icons**
- **Style** : Minimaliste, outline (contours fins)
- **Épaisseur** : 2px stroke
- **Tailles** :
  - Mobile : `h-6 w-6` (24px)
  - Desktop : `h-5 w-5` (20px)
  - Menu mobile : `h-6 w-6` (24px pour zones tactiles)

#### 🖼️ Style d'Illustrations
- **Type** : Photos produits haute qualité + overlays gradient
- **Ambiance** : Clean, moderne, premium
- **Traitement** : Overlay rose translucide sur images catégories

### Ambiance Générale

**Identité visuelle** : 
✨ **Premium Féminin Moderne** – Luxe accessible avec une touche de douceur

**Caractéristiques** :
- 🌸 **Élégance féminine** sans être enfantine
- 💎 **Luxe accessible** : qualité perçue sans ostentation
- 🎨 **Minimalisme raffiné** : espace blanc généreux
- ✨ **Moderne & Dynamique** : animations subtiles, interactions fluides
- 🇸🇳 **Adaptation locale** : codes culturels sénégalais (devise CFA, promesse livraison Dakar)

---

## 🖼️ 3. ÉLÉMENTS VISUELS

### Images

#### 📸 Types d'Images
1. **Bannières Hero** (10 slides)
   - **Format** : Paysage 16:9 adaptatif
   - **Dimensions** : 1920×1080px (desktop) / 800×600px (mobile)
   - **Traitement** : Overlay `bg-black/20` pour contraste texte
   - **Positionnement** : `object-cover` pleine hauteur 400-500px

2. **Images Catégories**
   - **Format** : Carré 1:1 (aspect-square)
   - **Overlay** : Gradient `from-pink-200 to-pink-300` opacité 80%
   - **Hover** : Scale 1.1× avec transition 300ms
   - **Dimensions** : Responsive (100% container width)

3. **Photos Produits**
   - **Format** : Carré ou portrait 3:4
   - **Fond** : Blanc pur (#FFFFFF) ou transparent
   - **Bordure** : `rounded-lg` (12px)
   - **Optimisation** : Next.js `<Image>` avec lazy loading

4. **Logos Marques**
   - **Format** : PNG transparent
   - **Hauteur** : 40-60px max
   - **Traitement** : Niveaux de gris ou couleur originale
   - **Défilement** : Horizontal infini 20s

#### 🖼️ Placement des Images
- **Hero** : Fond pleine largeur avec texte superposé
- **Catégories** : Grille 2 colonnes (mobile) → 3 colonnes (desktop)
- **Produits** : Grille 2→3→4→5 colonnes selon breakpoint
- **Marques** : Bande horizontale défilante

#### 🎭 Formes et Bordures
- **Boutons** : `rounded-md` (6px) standard
- **Cartes** : `rounded-lg` (12px) ou `rounded-xl` (16px) pour cartes promo
- **Avatars** : `rounded-full` (circulaire)
- **Badges** : `rounded-full` (pilule) ou `rounded-lg` (rectangle arrondi)

### Logos

#### 🏷️ Logo Principal "FlawlessBeauty"
- **Position** : Header centré (mobile) / gauche (desktop)
- **Typographie** : Texte stylisé (non image)
  - Ligne 1 : "FlawlessBeauty" – `text-2xl font-bold text-[#F792CC]`
  - Ligne 2 : "Parapharmacie en ligne & Cosmétiques" – `text-xs text-gray-500`
- **Taille** : 
  - Mobile : `text-xl` (20px)
  - Desktop : `text-2xl` (24px)
- **Fond** : Transparent sur fond blanc header

#### 🎨 Logo Footer
- **Position** : Colonne 1/4 du footer
- **Style** : `text-2xl font-serif text-pink-400 italic`
- **Texte** : "Flawless Beauty" (variante serif italic)

### Boutons

#### 🎯 Styles de Boutons

| Type | Classe | Couleur | Forme | Hover |
|------|--------|---------|-------|-------|
| Primary | `bg-primary` | Rose #F792CC | `rounded-md` | Opacité 90% |
| Ghost | `variant="ghost"` | Transparent | `rounded-md` | Fond gris clair |
| Outline | `border border-primary` | Contour rose | `rounded-md` | Fond rose pâle |
| Destructive | `bg-destructive` | Rouge | `rounded-md` | Opacité 90% |
| CTA | `bg-gradient-primary` | Gradient rose | `rounded-lg` | Glow effect |

#### ✨ Effets au Survol
- **Transition** : `transition-all duration-300 ease-out`
- **Hover lift** : `-translate-y-1` (élévation 4px)
- **Hover glow** : `box-shadow: var(--shadow-glow)`
- **Hover scale** : `scale-105` (5% agrandissement)
- **Couleur** : Opacité 80-90% ou teinte plus claire

#### 📱 Tailles Boutons
```css
sm: h-9 px-3 text-sm     /* Petits boutons menu */
md: h-10 px-4 text-base  /* Boutons standards */
lg: h-11 px-8 text-lg    /* Boutons CTA */
mobile: h-12 px-6 text-base /* Boutons tactiles mobile (min 44×44px) */
```

### Bannières et Sliders

#### 🎠 Carrousel Hero
- **Hauteur** : 
  - Mobile : `h-[400px]` (400px)
  - Desktop : `h-[500px]` (500px)
- **Transitions** : Fade croisé (crossfade) 500ms
- **Auto-rotation** : 5 secondes par slide
- **Contrôles** :
  - Flèches latérales : `bg-white/80` rondes
  - Dots indicateurs : Bas centré, 12px, rose actif / blanc inactif
- **Overlay** : `bg-black/20` pour contraste texte
- **Fond gradient** : `from-pink-50 to-rose-50` (fallback)

#### 🏷️ Bannière USP (Top)
- **Hauteur** : `py-2` (32px environ)
- **Fond** : `bg-[#F792CC]` (rose principal)
- **Texte** : `text-white text-sm text-center`
- **Contenu** : "LIVRAISON EN MOINS DE 24H À DAKAR (HORS DIMANCHES/JOURS FÉRIÉS)"
- **Position** : Fixe en haut `sticky top-0 z-50`

### Badges et Labels

#### 🏷️ Types de Badges

1. **Badge Promo** (`.promo-badge`)
   - Fond : Gradient rouge/corail `--gradient-urgent`
   - Texte : Blanc, `text-xs font-bold`
   - Forme : `rounded-full` (pilule)
   - Animation : `pulse-glow` 2s infini

2. **Badge Discount** (`.discount-badge`)
   - Fond : Gradient or `--gradient-gold`
   - Texte : Noir, `text-sm font-bold`
   - Forme : `rounded-lg` (rectangle arrondi)
   - Ombre : `shadow-medium`

3. **Badge Nouveau**
   - Fond : `bg-accent` (corail)
   - Texte : Blanc, `text-xs`
   - Forme : `rounded-full`
   - Position : Coin supérieur droit produit

4. **Badge Stock Faible**
   - Fond : `bg-urgent/10` (rouge transparent)
   - Texte : Rouge `text-urgent`, `text-xs`
   - Icône : Point rouge clignotant

### Pictogrammes

#### 🎯 Style des Icônes
- **Bibliothèque** : Lucide Icons (outline)
- **Alignement** : Centre vertical avec texte
- **Taille standard** : 
  - Navigation : `h-5 w-5` (20px)
  - Mobile nav : `h-6 w-6` (24px)
  - CTA : `h-4 w-4` (16px)
- **Couleur** : Héritage du parent ou `text-primary`

#### 📍 Icônes Principales Utilisées
- 🏠 `Home` – Accueil mobile
- 🔍 `Search` – Recherche
- ❤️ `Heart` – Wishlist
- 🛒 `ShoppingCart` – Panier
- 👤 `User` – Mon compte
- 📦 `Grid3X3` – Marques
- ☰ `Menu` – Menu hamburger
- ✕ `X` – Fermer
- ⌄ `ChevronDown` – Dropdown
- ‹› `ChevronLeft/Right` – Navigation carrousel

---

## 🧭 4. NAVIGATION ET INTERACTIONS

### Menu Principal

#### 🖥️ Desktop – Méga-menu Horizontal
- **Position** : Sous le header, `border-t py-3`
- **Fond** : `bg-gray-50 rounded-lg border` (encadré arrondi)
- **Layout** : Flexbox centré avec wrap
- **Espacement** : `gap-2` entre items

**Items de Menu** :
```
NOUVEAUTÉS | PROMOTION | SOIN DU VISAGE ▼ | CORPS & BAIN ▼ | 
PARAPHARMACIE ▼ | CHEVEUX ▼ | PARFUMERIE ▼ | 
GROSSESSE ET POST-PARTUM | MARQUES
```

#### 📱 Mobile – Menu Hamburger
- **Déclencheur** : Icône `☰ Menu` top-left
- **Animation** : Slide-down depuis header
- **Fond** : `bg-white border-t`
- **Items** : Liste verticale `flex-col space-y-2`
- **Accordéon** : Chevron dépliable pour sous-catégories

#### 🎯 Dropdowns Sous-Catégories (Desktop)

**Comportement Hover-Intent** :
- **Délai ouverture** : 80ms après hover
- **Délai fermeture** : 150ms après leave
- **Position** : `absolute z-[10000] left-1/2 -translate-x-1/2 top-full mt-2`
- **Largeur** : `w-80` (320px fixe)

**Style Dropdown** :
```css
bg-white rounded-xl shadow-xl 
border border-[#F792CC]/30 
ring-1 ring-[#F792CC]/15
```
- **Barre supérieure** : `h-1 bg-[#F792CC]` (accent coloré)
- **Items** : `px-4 py-2.5 text-sm hover:bg-[#FFDAFC] hover:text-[#F792CC]`
- **Transition** : `transition-colors` 200ms

### États des Liens

#### 🎨 États Visuels

| État | Style | Exemple |
|------|-------|---------|
| **Normal** | `text-gray-700` | Texte gris foncé |
| **Hover** | `text-[#F792CC] bg-[#FFDAFC]` | Rose + fond rose pâle |
| **Active** | `text-[#F792CC] underline` | Rose + souligné |
| **Focus** | `ring-2 ring-primary ring-offset-2` | Anneau rose 2px |
| **Disabled** | `opacity-50 pointer-events-none` | Grisé désactivé |

#### 🔗 Liens Textuels
- **Standard** : `text-primary hover:text-primary/80 underline-offset-4 hover:underline`
- **Footer** : `text-gray-400 hover:text-white`
- **Fil d'Ariane** : `text-muted-foreground hover:text-foreground`

### Effets d'Apparition

#### ✨ Animations d'Entrée

1. **Fade-in** (`animate-fade-in`)
   ```css
   0%: opacity 0, translateY(10px)
   100%: opacity 1, translateY(0)
   Duration: 300ms ease-out
   ```

2. **Scale-in** (`animate-scale-in`)
   ```css
   0%: opacity 0, scale(0.95)
   100%: opacity 1, scale(1)
   Duration: 200ms ease-out
   ```

3. **Slide-up** (`animate-slide-up`)
   ```css
   0%: opacity 0, translateY(20px)
   100%: opacity 1, translateY(0)
   Duration: 400ms ease-out
   ```

4. **Bounce-in** (modals, toasts)
   ```css
   0%: opacity 0, scale(0.3)
   50%: opacity 1, scale(1.05)
   70%: scale(0.9)
   100%: scale(1)
   Duration: 500ms ease-out
   ```

#### 🎬 Déclencheurs
- **Au chargement page** : Sections principales en fade-in
- **Au scroll** : Lazy components en slide-up (intersection observer)
- **Au hover** : Cartes produits/catégories en scale + glow
- **Au clic** : Modals en bounce-in

### Scroll Behavior

#### 📜 Comportement de Défilement

1. **Ancres internes** : `scroll-behavior: smooth`
   ```html
   <a href="#top">↑ Retour en haut</a> 
   <!-- Smooth scroll vers <body id="top"> -->
   ```

2. **Sections animées** : 
   - Apparition progressive au scroll (Intersection Observer)
   - Seuil : 20% de la section visible
   - Animation : `slide-up` + `fade-in`

3. **Scroll horizontal marques** :
   - Auto-scroll infini sans interaction utilisateur
   - Vitesse : 20s pour 1 boucle complète
   - Direction : droite → gauche

4. **Sticky Elements** :
   - Header : `sticky top-0 z-50`
   - Bandeau USP : reste visible au scroll
   - Mobile nav : `fixed bottom-0 z-[9999]`

#### 🎯 Points d'Ancrage
- `#top` – Haut de page (body)
- `#categories` – Section catégories
- `#nouveautes` – Section nouveautés
- `#marques` – Logos marques
- Footer automatique (scroll to bottom)

---

## 🧩 5. CONTENU TYPE

### Titres et Sous-Titres

#### 📝 Formats Standards

**Page d'Accueil – Hero** :
```html
<div class="text-sm text-pink-600 font-medium mb-2 italic">
  Livraison gratuite à Dakar
</div>
<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-2 tracking-wider">
  FLAWLESS BEAUTY
</h1>
<h2 class="text-lg md:text-xl text-gray-700 font-medium mb-4">
  VOTRE BEAUTÉ, NOTRE PASSION
</h2>
<p class="text-gray-600 mb-6 max-w-md">
  Découvrez notre sélection premium de cosmétiques...
</p>
```

**Sections Catégories** :
```html
<h2 class="heading-2 mb-2 text-center">Flawless Beauty</h2>
<p class="text-lead text-primary text-center">
  Parapharmacie en ligne & Cosmétiques
</p>
```

**Titres Produits** :
```html
<h3 class="heading-4 mb-2 line-clamp-2">
  Sérum Hydratant Anti-Âge 50ml
</h3>
<p class="text-body-sm text-muted-foreground line-clamp-3">
  Formule enrichie en acide hyaluronique...
</p>
```

#### 🎨 Alignements
- **Hero** : Gauche / Droite / Centré selon slide (variable `textPosition`)
- **Sections** : Centré (`text-center`)
- **Produits** : Gauche (`text-left`)
- **Footer** : Gauche en colonnes

### Paragraphes

#### 📄 Styles de Texte

**Texte Lead** (intro sections) :
```css
class="text-lead"
/* text-lg md:text-xl leading-relaxed text-secondary-enhanced */
```

**Texte Body** (paragraphes standards) :
```css
class="text-body"
/* text-base md:text-lg leading-relaxed text-primary-enhanced */
```

**Texte Small** (descriptions produits) :
```css
class="text-body-sm"
/* text-sm md:text-base leading-relaxed text-secondary-enhanced */
```

**Texte Caption** (labels, métadonnées) :
```css
class="text-caption"
/* text-xs md:text-sm leading-normal text-muted-enhanced */
```

#### 📐 Espacements Paragraphes
- **Vertical** : `mb-4` (16px) entre paragraphes
- **Justification** : `text-left` (pas de justifié)
- **Max-width** : 
  - Texte hero : `max-w-md` (28rem / 448px)
  - Texte sections : `max-w-2xl` (42rem / 672px)
  - Descriptions produits : 100% largeur carte

### Sections Répétitives

#### 🛍️ Cartes Produits

**Structure HTML** :
```html
<div class="group relative overflow-hidden rounded-lg bg-card border hover-scale hover-glow">
  <!-- Badge Promo (conditionnel) -->
  <div class="absolute top-2 right-2 z-10">
    <span class="promo-badge">-30%</span>
  </div>
  
  <!-- Image Produit -->
  <div class="aspect-square relative overflow-hidden">
    <img src="..." alt="..." class="object-cover group-hover:scale-110 transition-transform" />
  </div>
  
  <!-- Contenu Textuel -->
  <div class="p-4">
    <h3 class="heading-5 mb-2 line-clamp-2">Nom Produit</h3>
    <div class="flex items-center gap-2 mb-2">
      <span class="text-lg font-bold text-foreground">15,500 CFA</span>
      <span class="text-sm text-muted line-through">22,000 CFA</span>
    </div>
    <p class="text-body-sm line-clamp-2 mb-4">Description courte...</p>
    
    <!-- Boutons Actions -->
    <div class="flex gap-2">
      <Button variant="primary" size="sm" class="flex-1">
        Ajouter au panier
      </Button>
      <Button variant="ghost" size="sm">
        <Heart className="h-4 w-4" />
      </Button>
    </div>
  </div>
</div>
```

**Variantes** :
- Grille 2 colonnes (mobile) → 3 (tablette) → 4 (desktop) → 5 (large desktop)
- Densité : 16 / 32 / 48 produits par page (sélecteur utilisateur)

#### 💬 Cartes Témoignages (si implémenté)
```html
<div class="bg-card rounded-xl p-6 shadow-soft">
  <div class="flex items-center gap-3 mb-4">
    <div class="skeleton-avatar"></div>
    <div>
      <h4 class="font-semibold">Nom Client</h4>
      <div class="flex text-gold">★★★★★</div>
    </div>
  </div>
  <p class="text-body-sm italic">"Avis client..."</p>
</div>
```

#### 📰 Cartes Articles Blog (structure future)
```html
<article class="bg-card rounded-lg overflow-hidden shadow-soft hover-lift">
  <img src="..." alt="..." class="w-full h-48 object-cover" />
  <div class="p-4">
    <span class="text-caption text-muted">12 Oct 2025</span>
    <h3 class="heading-4 mt-2 mb-2">Titre Article</h3>
    <p class="text-body-sm line-clamp-3">Extrait...</p>
    <a href="..." class="link-enhanced mt-3 inline-block">Lire la suite →</a>
  </div>
</article>
```

---

## 📱 6. RESPONSIVE DESIGN

### Breakpoints Système

```css
/* Tailwind Breakpoints */
xs:  375px  /* Petits mobiles */
sm:  640px  /* Mobiles large / phablets */
md:  768px  /* Tablettes */
lg:  1024px /* Laptops */
xl:  1280px /* Desktops */
2xl: 1400px /* Large screens */
3xl: 1600px /* Ultra-wide */
```

### Adaptations par Composant

#### 📱 Header

**Mobile (< 768px)** :
- Menu hamburger `☰` top-left
- Logo centré `text-xl`
- Barre recherche pleine largeur sous logo
- Icônes compactes `h-5 w-5`
- Navigation → Accordéon vertical

**Desktop (≥ 768px)** :
- Logo gauche `text-2xl`
- Barre recherche centrale `max-w-md`
- Icônes standard `h-5 w-5`
- Méga-menu horizontal avec dropdowns

#### 🎠 Hero Section

| Breakpoint | Hauteur | Taille Titre | Position Texte |
|------------|---------|--------------|----------------|
| Mobile     | 400px   | `text-4xl`   | Centré         |
| Desktop    | 500px   | `text-6xl`   | Variable (left/center/right) |

**Adaptations** :
- Texte hero passe en `max-w-lg` centré sur mobile
- Boutons navigation (flèches) restent visibles mais plus petits
- Dots indicateurs : espacement réduit sur mobile

#### 🗂️ Grilles Catégories & Produits

**Grille Catégories** :
```css
Mobile (< 640px):   grid-cols-2  /* 2 colonnes */
Tablet (≥ 640px):   grid-cols-3  /* 3 colonnes */
Desktop (≥ 1024px): grid-cols-3  /* 3 colonnes (maintenu) */
```

**Grille Produits** :
```css
Mobile (< 640px):   grid-cols-2  /* 2 colonnes */
Tablet (≥ 640px):   grid-cols-3  /* 3 colonnes */
Desktop (≥ 1024px): grid-cols-4  /* 4 colonnes */
XL (≥ 1280px):      grid-cols-5  /* 5 colonnes */
```

**Images** :
- Mobile : `aspect-square` maintenu, taille réduite à 80% container
- Desktop : Taille standard 100% container
- Lazy loading : activé sur toutes tailles

#### 🦶 Footer

**Mobile (< 768px)** :
- Colonnes passent en **pile verticale** `grid-cols-1`
- Espacement augmenté `gap-8`
- Texte centré optionnel
- Copyright en `text-xs`

**Desktop (≥ 768px)** :
- **4 colonnes** `grid-cols-4`
- Texte aligné gauche
- Espacement réduit `gap-8`

#### 🧭 Navigation Mobile (Bottom Bar)

**Affichage** :
- Mobile (< 768px) : `block fixed bottom-0` en `z-[9999]`
- Desktop (≥ 768px) : `hidden` (masqué)

**Structure** :
```html
<div class="grid grid-cols-4 max-w-md mx-auto">
  <a href="/" class="mobile-nav-item">
    <Home class="mobile-nav-icon" /> <!-- 24×24px -->
    <span class="text-xs font-medium">ACCUEIL</span>
  </a>
  <!-- 3 autres items... -->
</div>
```

**Zones tactiles** :
- Hauteur min : `min-h-[44px]` (Apple HIG)
- Largeur min : `min-w-[44px]`
- Padding : `p-2` + `space-y-1`

### Texte Responsive

#### 📝 Tailles Adaptatives

**Titres** :
```css
H1: text-4xl md:text-5xl lg:text-6xl
H2: text-3xl md:text-4xl lg:text-5xl
H3: text-2xl md:text-3xl lg:text-4xl
H4: text-xl md:text-2xl lg:text-3xl
```

**Body** :
```css
Lead: text-lg md:text-xl
Body: text-base md:text-lg
Small: text-sm md:text-base
Caption: text-xs md:text-sm
```

**Alignement** :
- Mobile : `text-center` pour titres hero
- Desktop : `text-left | text-center | text-right` selon `textPosition`
- Produits : Toujours `text-left`

### Espacement Responsive

#### 📏 Sections

```css
.section-spacing: py-8 md:py-12 lg:py-16
.section-spacing-sm: py-6 md:py-8 lg:py-12
.section-spacing-lg: py-12 md:py-16 lg:py-24
```

#### 📦 Conteneurs

```css
.container-responsive: mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl
```

**Padding horizontal** :
- Mobile : `px-4` (16px)
- Tablet : `px-6` (24px)
- Desktop : `px-8` (32px)

### Images Responsive

#### 🖼️ Optimisations

**Next.js Image Component** :
```jsx
<Image 
  src="..." 
  alt="..." 
  fill 
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
  className="object-cover"
  loading="lazy"
/>
```

**Adaptations** :
- Mobile : Résolution 400px largeur
- Tablet : Résolution 600px largeur
- Desktop : Résolution 800px largeur
- Retina : 2× densité automatique

**Compression** :
- Format WebP prioritaire (fallback JPEG)
- Qualité : 85% (compromis poids/qualité)
- Placeholder : Blur hash 10px

### Interactions Tactiles

#### 👆 Touch Targets (Mobile)

**Tailles minimales** (Apple HIG) :
```css
.touch-target: min-h-[44px] min-w-[44px]
.mobile-button: h-12 px-6 text-base
```

**Espacement** :
- Entre boutons tactiles : `gap-2` min (8px)
- Zone de sécurité : `safe-area-inset` pour notch

**Feedback tactile** :
- Active state : `active:scale-95`
- Ripple effect : Non implémenté (peut ajouter)
- Haptic feedback : Non supporté web (potentiel PWA)

---

## 🎯 ANNEXES

### Gradients Prédéfinis

```css
--gradient-primary: linear-gradient(135deg, #F792CC, #FBB8E3)
--gradient-hero: linear-gradient(135deg, #F792CC 0%, #F37958 100%)
--gradient-urgent: linear-gradient(135deg, #E8384F 0%, #F37958 100%)
--gradient-gold: linear-gradient(135deg, #F2C94C 0%, #F5D96E 100%)
```

### Ombres Portées

```css
--shadow-soft: 0 2px 20px -2px hsl(330 67% 76% / 0.1)
--shadow-medium: 0 8px 30px -4px hsl(330 67% 76% / 0.15)
--shadow-strong: 0 16px 40px -8px hsl(330 67% 76% / 0.2)
--shadow-glow: 0 0 30px hsl(330 67% 85% / 0.4)
```

### Animations Clés

| Nom | Durée | Easing | Usage |
|-----|-------|--------|-------|
| `fade-in` | 300ms | ease-out | Apparition sections |
| `scale-in` | 200ms | ease-out | Modals, popups |
| `slide-up` | 400ms | ease-out | Cartes au scroll |
| `pulse-glow` | 2s | ease-in-out infinite | Badges promo |
| `float` | 3s | ease-in-out infinite | Icônes flottantes |
| `shimmer` | 2s | ease-in-out infinite | Skeletons loading |
| `scroll` | 20s | linear infinite | Marques défilantes |

### Codes Couleurs Complets (Hex)

| Nom | HSL | HEX | Usage |
|-----|-----|-----|-------|
| Primary | 330 67% 76% | #F792CC | Rose principal |
| Primary Glow | 330 67% 85% | #FBB8E3 | Effet lumineux |
| Secondary | 330 25% 95% | #F9ECF6 | Rose pâle |
| Accent | 15 86% 65% | #F37958 | Corail/Pêche |
| Urgent | 0 85% 60% | #E8384F | Rouge urgence |
| Success | 142 76% 36% | #15B662 | Vert succès |
| Gold | 43 96% 56% | #F2C94C | Or premium |
| Muted | 330 25% 96% | #FAF3F8 | Gris rosé clair |
| Border | 330 25% 92% | #F5E5F1 | Bordures |
| Background | 0 0% 100% | #FFFFFF | Fond blanc |
| Foreground | 222.2 84% 4.9% | #020817 | Texte noir |

---

## 📊 MÉTRIQUES DE PERFORMANCE

### Objectifs Core Web Vitals

- **LCP** (Largest Contentful Paint) : < 2.5s
- **FID** (First Input Delay) : < 100ms
- **CLS** (Cumulative Layout Shift) : < 0.1

### Optimisations Appliquées

✅ **Next.js Image Optimization** : Formats WebP, lazy loading, responsive srcset  
✅ **Code Splitting** : Lazy components, dynamic imports  
✅ **GPU Acceleration** : `transform-gpu` sur animations  
✅ **Font Loading** : `display: swap`, preload désactivé (éviter FOUT)  
✅ **CSS Scoping** : Tailwind JIT, purge automatique  
✅ **Compression** : Gzip/Brotli serveur  
✅ **Cache Strategy** : `revalidate` ISR, CDN headers  

---

## 🛠️ STACK TECHNIQUE

### Frontend
- **Framework** : Next.js 15 (App Router)
- **UI** : React 19 + TypeScript
- **Styling** : Tailwind CSS 4 + Shadcn UI
- **Icônes** : Lucide Icons
- **Animations** : Tailwind Animate + Custom Keyframes

### Backend
- **Runtime** : Node.js + Edge Functions (dual runtime)
- **ORM** : Prisma
- **Database** : PostgreSQL
- **Auth** : NextAuth.js v5
- **State** : Zustand + React Query

### Intégrations
- **Paiement** : Stripe (+ migration PayTech en cours)
- **Upload** : Uploadthing
- **Email** : Resend

---

**Document généré le : 13 Octobre 2025**  
**Version du site : 1.0 (95% complète)**  
**Auteur : FlawlessBeauty Dev Team**
