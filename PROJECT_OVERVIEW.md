# 🛍️ MAMI-SHOP - Documentation Projet

## 📋 Vue d'ensemble

**Mami-Shop** est une application e-commerce spécialisée en parapharmacie et cosmétiques, ciblant le marché sénégalais avec livraison 24h à Dakar. L'application utilise une architecture Next.js 15 full-stack moderne avec une base de données PostgreSQL.

## 🏗️ Architecture Technique

### Stack Principal

- **Framework** : Next.js 15 + React 19 + TypeScript
- **Styling** : Tailwind CSS v4 + Radix UI
- **Base de données** : PostgreSQL + Prisma ORM
- **Authentification** : NextAuth v5 (Auth.js)
- **État client** : Zustand avec persistance localStorage
- **Paiements** : Stripe (configuré)
- **Runtime** : Node.js + Edge (middleware)

### Structure des Dossiers

```text
my-app/
├── app/                    # App Router Next.js 15
│   ├── api/               # Routes API
│   ├── [slug]/            # Pages dynamiques catégories
│   ├── account/           # Pages compte utilisateur
│   └── layout.tsx         # Layout principal
├── components/            # Composants React
│   ├── flawless/         # Composants spécifiques FlawlessBeauty
│   ├── ui/               # Composants UI réutilisables (Radix)
│   └── product/          # Composants produits
├── hooks/                # Hooks personnalisés Zustand
├── lib/                  # Utilitaires (Prisma, utils)
├── prisma/               # Schéma et seed base de données
└── public/               # Assets statiques
```

## 🗄️ Modèle de Données

### Entités Principales

- **User** : Utilisateurs avec auth multiple (credentials + OAuth)
- **Category/Subcategory** : Hiérarchie de catégories produits
- **Product** : Produits avec prix CFA, images, stock, ratings
- **Brand** : Marques partenaires (NIVEA, The Ordinary, etc.)
- **Cart/CartItem** : Panier persistant en base
- **Order/OrderItem** : Commandes avec statuts (PENDING/PAID/SHIPPED/CANCELLED)
- **Review** : Avis clients avec notes
- **Address** : Adresses de livraison multiples par utilisateur

### Relations Clés

```text
User 1:N → Orders, Reviews, Cart, Addresses
Product N:1 → Category, Subcategory, Brand
Product 1:N → Reviews, OrderItems, CartItems
```

## 🔐 Système d'Authentification

### Architecture Dual-Auth

1. **`auth.ts`** (Runtime Node.js)

   - Credentials (email/password + bcryptjs)
   - OAuth Google + GitHub
   - Accès complet base de données

2. **`auth-edge.ts`** (Runtime Edge)

   - OAuth uniquement (Edge compatible)
   - Protection middleware routes

### Protection Routes

- `/admin/*` → Authentifié requis
- `/api/admin/*` → Authentifié requis
- `/account/*` → Authentifié requis
- Middleware avec autorisation par callback

## 🎨 Interface Utilisateur

### Design System

- **Marque** : FlawlessBeauty - Parapharmacie en ligne
- **Couleur principale** : Rose `#F792CC`
- **Typographie** : Inter (UI) + Playfair Display (titres)
- **Responsive** : Mobile-first, breakpoints Tailwind

### Composants Principaux

- **Header** : Navigation complexe avec méga-menu hover-intent
- **HeroSection** : Carousel automatique 10 slides (5s interval)
- **CategoryGrid** : Grille catégories avec images
- **FeaturedProducts** : Produits vedettes depuis base
- **Footer** : Navigation organisée + infos légales

### Navigation

```text
PROMOTION | SOIN DU VISAGE | CORPS & BAIN | PARAPHARMACIE
CHEVEUX | PARFUMERIE | GROSSESSE ET POST-PARTUM | MARQUES
```

## 🛒 Gestion Commerce

### State Management (Zustand)

- **useCart** : Panier avec persistance `mami-shop-cart`
- **useWishlist** : Favoris avec persistance `mami-shop-wishlist`

### Fonctionnalités E-commerce

- Prix en CFA (formatage Sénégal)
- Gestion stock temps réel
- Système de promotions (oldPriceCents)
- Ratings et avis produits
- Adresses livraison multiples

## 🌐 API Routes

### Structure API

```text
/api/auth/[...nextauth]     # NextAuth handlers
/api/account/profile        # PATCH profil utilisateur
/api/account/addresses      # CRUD adresses
/api/checkout/session       # Stripe checkout
/api/checkout/webhook       # Webhooks Stripe
```

### Pages Dynamiques

- `[slug]` → Résolution catégorie → redirect `/catalog?cat=slug`
- `/account` → Dashboard utilisateur authentifié
- `/addresses` → Gestion adresses livraison

## 🚀 Configuration

### Variables Environnement

```bash
# Base de données PostgreSQL
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth v5
AUTH_SECRET="32+chars-secret"
AUTH_URL="http://localhost:3000"

# OAuth Providers
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### Scripts Disponibles

```bash
npm run dev              # Développement Turbopack
npm run build            # Build production
npm run db:generate      # Génération client Prisma
npm run db:migrate       # Migrations base
npm run db:seed          # Peuplement données demo
npm run db:studio        # Interface Prisma Studio
npm run build:full       # Build complet avec DB
```

## 📦 Données de Démonstration

### Utilisateurs Test

- `demo@mami-shop.test` / `password123`
- `alice@mami-shop.test` (OAuth uniquement)
- `bob@mami-shop.test` (OAuth uniquement)

### Catégories Cosmétiques

- Soin du visage (protection solaire, soins ciblés, etc.)
- Corps & Bain (soins corps, épilation, hygiène)
- Parapharmacie (compléments, soins spécialisés)
- Cheveux (routine capillaire, compléments)
- Parfumerie (femmes, hommes, huiles, bougies)
- Grossesse et Post-partum

### Marques Disponibles

**Parapharmacie & Dermatologie :**

- Avène, ACM Laboratoire, CeraVe, Eucerin, La Roche-Posay, Uriage
- Ducray, Klorane, Caudalie, Nuhanciam, Topicrem, Mixa

**Korean Beauty :**

- Anua, Beauty of Joseon, Laneige

**Soins Corps & Beauté :**

- NIVEA, Dove, Vaseline, Bi-Oil, Biolane

**Nutrition & Compléments :**

- Biocyte, Eafit, Granions

**Marques Premium :**

- Bio Recherche, Château Rouge, Nova, OXYPROLANE

**The Ordinary** (sérums concentrés)

### Produits Exemple

- Sérum Vitamine C Éclat (155 CFA)
- Niacinamide 10% + Zinc 1% (149 CFA)
- Crème Corps Nourrissante NIVEA (120 CFA)
- Masque Nuit Hydratant Korean (220 CFA)

## 🎯 Spécificités Business

### Marché Cible

- **Géolocalisation** : Sénégal (prix CFA)
- **Livraison** : 24h à Dakar (hors dimanches/jours fériés)
- **Segment** : Parapharmacie premium + K-Beauty

### Fonctionnalités Métier

- Livraison gratuite dès 39€ (mentioned in metadata)
- Bannière promotionnelle persistante
- Catégorisation spécialisée cosmétiques
- Focus sur marques dermatologiques

## 🔧 Points Techniques Importants

### Performance

- Images statiques (pas toujours Next.js Image)
- Prisma avec logs warn/error uniquement
- Edge runtime pour middleware rapide

### Sécurité

- JWT stateless avec NextAuth
- Protection CSRF intégrée
- Hachage bcryptjs pour passwords
- Validation Zod sur credentials

### Évolutivité

- Architecture découplée API/Frontend
- State management scalable (Zustand)
- Base données relationnelle normalisée
- Support multi-tenant prêt

## 🚨 Points d'Attention

1. **SEO** : Métadonnées basiques, manque schema markup
2. **Images** : Optimisation Next.js Image incomplète
3. **Monitoring** : Logs minimaux, pas de télémétrie
4. **Tests** : Aucun test automatisé configuré
5. **Internationalisation** : Une seule locale (français)

## 📚 Commandes Utiles

```bash
# Démarrage développement
npm install
cp env.example .env  # Configurer variables
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev

# Base de données
npm run db:studio    # Interface Prisma
npm run db:seed      # Reset données demo

# Production
npm run build
npm start
```

## 📞 Context pour l'IA

Ce projet est une boutique e-commerce Next.js 15 moderne spécialisée en cosmétiques pour le marché sénégalais. L'architecture utilise des patterns avancés (dual-auth, Zustand, Prisma) avec un focus sur l'UX mobile et la performance. Le code est bien structuré avec TypeScript strict et suit les meilleures pratiques React/Next.js 2024.

**Dernière mise à jour** : Janvier 2025Commande ECHO activ�e.
