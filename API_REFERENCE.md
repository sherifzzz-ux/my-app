# 🔌 API REFERENCE - FlawlessBeauty

**Date:** 2025-10-06  
**Total Endpoints:** 47  
**Base URL:** `/api`

---

## 📋 TABLE DES MATIÈRES

- [Account APIs](#account-apis) (5 endpoints)
- [Admin APIs](#admin-apis) (33 endpoints)
- [Auth APIs](#auth-apis) (2 endpoints)
- [Public APIs](#public-apis) (7 endpoints)

---

## 👤 ACCOUNT APIS

### 1. Addresses Management
**Endpoint:** `POST/GET/PUT/DELETE /api/account/addresses`  
**Auth:** Required  
**Description:** CRUD adresses de livraison utilisateur

**GET** - Liste toutes les adresses
```typescript
Response: {
  addresses: Address[]
}
```

**POST** - Créer une adresse
```typescript
Body: {
  name: string
  phone: string
  city: string
  addressLine1: string
  addressLine2?: string
  isDefault?: boolean
}
```

---

### 2. Favorites/Wishlist
**Endpoint:** `POST/GET/DELETE /api/account/favorites`  
**Auth:** Required  
**Description:** Gestion liste de souhaits

**GET** - Liste des favoris
```typescript
Response: {
  favorites: UserFavorite[]
}
```

**POST** - Ajouter aux favoris
```typescript
Body: {
  productId: string
}
```

---

### 3. Orders History
**Endpoint:** `GET /api/account/orders`  
**Auth:** Required  
**Description:** Historique des commandes utilisateur

```typescript
Response: {
  orders: Order[]
}
```

---

### 4. Profile Management
**Endpoint:** `GET/PUT /api/account/profile`  
**Auth:** Required  
**Description:** Gestion du profil utilisateur

**GET** - Récupérer profil
```typescript
Response: {
  user: {
    id: string
    email: string
    name: string
  }
}
```

**PUT** - Mettre à jour profil
```typescript
Body: {
  name?: string
  email?: string
}
```

---

### 5. Account Stats
**Endpoint:** `GET /api/account/stats`  
**Auth:** Required  
**Description:** Statistiques du compte utilisateur

```typescript
Response: {
  totalOrders: number
  totalSpent: number
  favoriteCount: number
  addressCount: number
}
```

---

## 🔐 ADMIN APIS

### Overview & Dashboard

#### 1. Admin Overview
**Endpoint:** `GET /api/admin/overview`  
**Auth:** Admin required  
**Description:** Dashboard KPI et métriques

```typescript
Response: {
  // Compteurs
  totalProducts: number
  totalCategories: number
  totalBrands: number
  totalStock: number
  totalStockValue: number
  
  // Alertes
  lowStockProducts: number
  outOfStockProducts: number
  featuredProducts: number
  
  // Données
  recentProducts: Product[]
  expensiveProducts: Product[]
  categoriesWithCount: Category[]
  
  // Commandes (placeholders)
  totalOrders: number
  totalRevenue: number
  totalUsers: number
  recentOrders: Order[]
  monthlyRevenue: MonthlyData[]
  orderStatuses: StatusData[]
  topProducts: ProductData[]
}
```

---

#### 2. Analytics
**Endpoint:** `GET /api/admin/analytics`  
**Auth:** Admin required  
**Description:** Données analytiques avancées

```typescript
Query: {
  startDate?: string
  endDate?: string
  metric?: 'revenue' | 'orders' | 'customers'
}

Response: {
  analytics: AnalyticsData
}
```

---

#### 3. Audit Log
**Endpoint:** `GET /api/admin/audit`  
**Auth:** Admin required  
**Description:** Journal d'audit des actions admin

```typescript
Response: {
  logs: AuditLog[]
}
```

---

### Products Management

#### 4. Products CRUD
**Endpoint:** `POST/GET/PUT/DELETE /api/admin/products`  
**Auth:** Admin required  
**Description:** Gestion complète des produits

**GET** - Liste produits avec filtres
```typescript
Query: {
  page?: number
  limit?: number
  category?: string
  brand?: string
  search?: string
  sortBy?: string
}

Response: {
  products: Product[]
  total: number
  page: number
  limit: number
}
```

**POST** - Créer un produit
```typescript
Body: {
  name: string
  description?: string
  priceCents: number
  oldPriceCents?: number
  categoryId: string
  subcategoryId?: string
  brandId?: string
  imageUrl?: string
  stock: number
  isFeatured?: boolean
}
```

**PUT** - Mettre à jour produit
**DELETE** - Supprimer produit

---

#### 5. Product by ID
**Endpoint:** `GET/PUT/DELETE /api/admin/products/[id]`  
**Auth:** Admin required  
**Description:** Actions sur un produit spécifique

---

#### 6. Products Import
**Endpoint:** `POST /api/admin/products/import`  
**Auth:** Admin required  
**Description:** Import CSV de produits

```typescript
Body: FormData {
  file: File (CSV)
}

Response: {
  imported: number
  errors: string[]
}
```

---

#### 7. Products Supabase
**Endpoint:** `GET/POST /api/admin/products-supabase`  
**Auth:** Admin required  
**Description:** Gestion produits via Supabase

---

#### 8. Product Supabase by ID
**Endpoint:** `GET/PUT/DELETE /api/admin/products-supabase/[id]`  
**Auth:** Admin required

---

### Categories Management

#### 9. Categories CRUD
**Endpoint:** `POST/GET/PUT/DELETE /api/admin/categories`  
**Auth:** Admin required  
**Description:** Gestion des catégories

**GET** - Liste catégories
```typescript
Response: {
  categories: Category[]
}
```

**POST** - Créer catégorie
```typescript
Body: {
  name: string
  slug: string
  imageUrl?: string
}
```

---

#### 10. Category by ID
**Endpoint:** `GET/PUT/DELETE /api/admin/categories/[id]`  
**Auth:** Admin required

---

### Brands Management

#### 11. Brands CRUD
**Endpoint:** `POST/GET/PUT/DELETE /api/admin/brands`  
**Auth:** Admin required  
**Description:** Gestion des marques

**GET** - Liste marques
```typescript
Response: {
  brands: Brand[]
}
```

**POST** - Créer marque
```typescript
Body: {
  name: string
  slug: string
  imageUrl?: string
}
```

---

#### 12. Brand by ID
**Endpoint:** `GET/PUT/DELETE /api/admin/brands/[id]`  
**Auth:** Admin required

---

#### 13. Brands Supabase
**Endpoint:** `GET/POST /api/admin/brands-supabase`  
**Auth:** Admin required

---

### Orders Management

#### 14. Orders CRUD
**Endpoint:** `GET/PUT /api/admin/orders`  
**Auth:** Admin required  
**Description:** Gestion des commandes

**GET** - Liste commandes
```typescript
Query: {
  status?: 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED'
  page?: number
  limit?: number
}

Response: {
  orders: Order[]
  total: number
}
```

**PUT** - Mettre à jour statut commande
```typescript
Body: {
  orderId: string
  status: OrderStatus
}
```

---

#### 15. Order by ID
**Endpoint:** `GET/PUT /api/admin/orders/[id]`  
**Auth:** Admin required

---

#### 16. Orders Export
**Endpoint:** `GET /api/admin/orders/export`  
**Auth:** Admin required  
**Description:** Export CSV des commandes

```typescript
Query: {
  startDate?: string
  endDate?: string
  format?: 'csv' | 'xlsx'
}

Response: File (CSV/XLSX)
```

---

### Users Management

#### 17. Users CRUD
**Endpoint:** `GET/POST/PUT/DELETE /api/admin/users`  
**Auth:** Admin required  
**Description:** Gestion des utilisateurs

**GET** - Liste utilisateurs
```typescript
Query: {
  page?: number
  limit?: number
  search?: string
}

Response: {
  users: User[]
  total: number
}
```

---

#### 18. User Orders
**Endpoint:** `GET /api/admin/users/[id]/orders`  
**Auth:** Admin required  
**Description:** Commandes d'un utilisateur

---

#### 19. User Suspend
**Endpoint:** `POST /api/admin/users/[id]/suspend`  
**Auth:** Admin required  
**Description:** Suspendre un utilisateur

---

#### 20. User Reactivate
**Endpoint:** `POST /api/admin/users/[id]/reactivate`  
**Auth:** Admin required  
**Description:** Réactiver un utilisateur

---

### Messages Management

#### 21. Messages CRUD
**Endpoint:** `GET/POST /api/admin/messages`  
**Auth:** Admin required  
**Description:** Gestion des messages support

**GET** - Liste messages
```typescript
Query: {
  status?: 'read' | 'unread' | 'archived'
}

Response: {
  messages: Message[]
}
```

---

#### 22. Message Reply
**Endpoint:** `POST /api/admin/messages/reply`  
**Auth:** Admin required  
**Description:** Répondre à un message

```typescript
Body: {
  messageId: string
  reply: string
}
```

---

#### 23. Message Read
**Endpoint:** `PUT /api/admin/messages/[id]/read`  
**Auth:** Admin required

---

#### 24. Message Unread
**Endpoint:** `PUT /api/admin/messages/[id]/unread`  
**Auth:** Admin required

---

#### 25. Message Archive
**Endpoint:** `PUT /api/admin/messages/[id]/archive`  
**Auth:** Admin required

---

### Newsletter Management

#### 26. Newsletter Subscribers
**Endpoint:** `GET/POST /api/admin/newsletter/subscribers`  
**Auth:** Admin required  
**Description:** Gestion abonnés newsletter

**GET** - Liste abonnés
```typescript
Response: {
  subscribers: Subscriber[]
  total: number
}
```

**POST** - Ajouter abonné
```typescript
Body: {
  email: string
}
```

---

#### 27. Subscriber by ID
**Endpoint:** `DELETE /api/admin/newsletter/subscribers/[id]`  
**Auth:** Admin required

---

#### 28. Newsletter Export
**Endpoint:** `GET /api/admin/newsletter/export`  
**Auth:** Admin required  
**Description:** Export liste emails

```typescript
Response: File (CSV)
```

---

### Settings Management

#### 29. General Settings
**Endpoint:** `GET/PUT /api/admin/settings/general`  
**Auth:** Admin required  
**Description:** Paramètres généraux du site

```typescript
Body: {
  siteName?: string
  siteDescription?: string
  contactEmail?: string
  phoneNumber?: string
}
```

---

#### 30. E-commerce Settings
**Endpoint:** `GET/PUT /api/admin/settings/ecommerce`  
**Auth:** Admin required  
**Description:** Paramètres e-commerce

```typescript
Body: {
  currency?: string
  taxRate?: number
  freeShippingThreshold?: number
  lowStockThreshold?: number
}
```

---

#### 31. Shipping Settings
**Endpoint:** `GET/PUT /api/admin/settings/shipping`  
**Auth:** Admin required  
**Description:** Paramètres de livraison

```typescript
Body: {
  dakarDeliveryTime?: string
  regionsDeliveryTime?: string
  shippingCost?: number
}
```

---

### Taxonomy Management

#### 32. Taxonomy
**Endpoint:** `GET /api/admin/taxonomy`  
**Auth:** Admin required  
**Description:** Vue complète de la taxonomie

```typescript
Response: {
  categories: Category[]
  subcategories: Subcategory[]
  brands: Brand[]
}
```

---

#### 33. Taxonomy Supabase
**Endpoint:** `GET /api/admin/taxonomy-supabase`  
**Auth:** Admin required

---

## 🔑 AUTH APIS

### 1. NextAuth Handlers
**Endpoint:** `GET/POST /api/auth/[...nextauth]`  
**Description:** Endpoints NextAuth (signin, signout, callback, etc.)

**Available routes:**
- `/api/auth/signin` - Connexion
- `/api/auth/signout` - Déconnexion
- `/api/auth/callback/:provider` - OAuth callback
- `/api/auth/session` - Récupérer session
- `/api/auth/csrf` - CSRF token

---

### 2. Logout
**Endpoint:** `POST /api/auth/logout`  
**Description:** Déconnexion personnalisée

---

## 🌐 PUBLIC APIS

### 1. Products Search
**Endpoint:** `GET /api/products`  
**Description:** Recherche publique de produits

```typescript
Query: {
  search?: string
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'name' | 'price' | 'date' | 'rating'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
}

Response: {
  products: Product[]
  total: number
  page: number
  limit: number
}
```

---

### 2. Categories
**Endpoint:** `GET /api/categories/[slug]/subcategories`  
**Description:** Sous-catégories d'une catégorie

```typescript
Response: {
  subcategories: Subcategory[]
}
```

---

### 3. Promotions
**Endpoint:** `GET /api/promotions`  
**Description:** Produits en promotion

```typescript
Response: {
  promotions: Product[]
}
```

---

### 4. Checkout Session
**Endpoint:** `POST /api/checkout/session`  
**Description:** Créer session de paiement Stripe

```typescript
Body: {
  items: CartItem[]
  customer: {
    name: string
    phone: string
    city: string
    addressLine1: string
  }
}

Response: {
  id: string  // Session ID
  url: string // Checkout URL
}
```

---

### 5. Checkout Webhook
**Endpoint:** `POST /api/checkout/webhook`  
**Description:** Webhook Stripe pour confirmations

**Headers:**
```
stripe-signature: <signature>
```

---

### 6. Uploadthing Core
**Endpoint:** `POST /api/uploadthing/core`  
**Description:** Configuration Uploadthing

---

### 7. Uploadthing Route
**Endpoint:** `POST /api/uploadthing/route`  
**Description:** Upload de fichiers

---

### 8. Maintenance
**Endpoint:** `GET /api/maintenance`  
**Description:** Statut maintenance du site

```typescript
Response: {
  status: 'active' | 'maintenance'
  message?: string
}
```

---

## 🔒 AUTHENTIFICATION

### Protection des routes

Toutes les routes `/api/admin/*` et `/api/account/*` nécessitent une authentification.

**Headers requis:**
```
Cookie: next-auth.session-token=<token>
```

**Erreurs possibles:**
- `401 Unauthorized` - Non authentifié
- `403 Forbidden` - Non autorisé (pas admin)
- `404 Not Found` - Ressource introuvable
- `500 Internal Server Error` - Erreur serveur

---

## 📝 CONVENTIONS

### Formats de réponse

**Succès:**
```typescript
{
  data: T
  message?: string
}
```

**Erreur:**
```typescript
{
  error: string
  details?: any
}
```

### Codes HTTP

- `200 OK` - Succès
- `201 Created` - Ressource créée
- `400 Bad Request` - Requête invalide
- `401 Unauthorized` - Non authentifié
- `403 Forbidden` - Non autorisé
- `404 Not Found` - Introuvable
- `500 Internal Server Error` - Erreur serveur

---

## 🧪 EXEMPLES D'UTILISATION

### Créer un produit (Admin)
```typescript
const response = await fetch('/api/admin/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Crème Hydratante',
    description: 'Crème pour tous types de peau',
    priceCents: 1500000, // 15,000 CFA
    categoryId: 'cat_123',
    brandId: 'brand_456',
    stock: 50,
    isFeatured: true
  })
})

const { data } = await response.json()
```

---

### Rechercher des produits (Public)
```typescript
const response = await fetch('/api/products?search=crème&category=soin-du-visage&sortBy=price&order=asc&page=1&limit=20')

const { products, total } = await response.json()
```

---

### Créer session de paiement (Public)
```typescript
const response = await fetch('/api/checkout/session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    items: [
      { id: 'prod_1', name: 'Produit 1', priceCents: 1000000, quantity: 2 }
    ],
    customer: {
      name: 'John Doe',
      phone: '+221771234567',
      city: 'Dakar',
      addressLine1: 'Rue 10, Parcelles Assainies'
    }
  })
})

const { url } = await response.json()
// Rediriger vers url pour paiement
```

---

## 📊 STATISTIQUES API

- **Total endpoints:** 47
- **Admin routes:** 33 (70%)
- **Public routes:** 7 (15%)
- **Account routes:** 5 (10%)
- **Auth routes:** 2 (5%)

---

**Dernière mise à jour:** 2025-10-06  
**Version API:** 1.0
