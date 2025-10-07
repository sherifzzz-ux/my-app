# 📋 Plan de Refonte du Checkout avec PayTech

## 🎯 Objectifs

1. ✅ **Commande sans connexion obligatoire** (guest checkout)
2. ✅ **Intégration complète PayTech** (Orange Money, Wave, CB)
3. ✅ **Expérience fluide et sécurisée**
4. ✅ **Conformité avec le modèle Univers Cosmetix**

---

## 📊 Analyse du Site de Référence (universcosmetix.com)

### Flow de Checkout Observé
1. **Panier** → Client peut commander sans compte
2. **Informations client** → Formulaire complet (nom, téléphone, email, adresse)
3. **Livraison** → Choix de la zone (Dakar <24h / Régions 24-72h)
4. **Paiement** → Sélection méthode (Orange Money, Wave, CB)
5. **Confirmation** → Création commande + redirection paiement
6. **Callback** → Validation paiement + email confirmation

### Éléments Clés à Reproduire
- ✅ Pas d'obligation de connexion
- ✅ Formulaire d'informations complet
- ✅ Récapitulatif visible du panier
- ✅ Sélection zone de livraison avec frais
- ✅ Sélection méthode de paiement (visuel clair)
- ✅ Conditions générales (checkbox)
- ✅ Barre de progression (4 étapes)

---

## 🏗️ Architecture Proposée

### 1. Structure des Pages/Composants

```
app/
  checkout/
    page.tsx                      # Page principale checkout
    success/
      page.tsx                    # Page de confirmation
    
components/
  checkout/
    CheckoutLayout.tsx            # Layout avec progression
    CheckoutSteps.tsx             # Barre de progression (1-4)
    
    # Étape 1: Panier
    CheckoutCart.tsx              # Récapitulatif panier
    
    # Étape 2: Informations client
    CustomerInfoForm.tsx          # Formulaire client (guest ou connecté)
    
    # Étape 3: Livraison
    ShippingSelector.tsx          # Choix zone + calcul frais
    
    # Étape 4: Paiement
    PaymentMethodSelector.tsx     # Orange Money, Wave, CB
    CheckoutSummary.tsx           # Récapitulatif final
    TermsCheckbox.tsx             # CGV + validation
    
lib/
  paytech/
    config.ts                     # Configuration PayTech
    api.ts                        # Wrapper API PayTech
    types.ts                      # Types PayTech
    
server/
  actions/
    checkout.ts                   # Server actions checkout
    order.ts                      # Gestion commandes
```

---

## 🔧 Étape par Étape: Implémentation

### Phase 1: Configuration PayTech (15-30 min)

#### 1.1 Variables d'environnement
```bash
# .env.local
PAYTECH_API_KEY=votre_api_key
PAYTECH_API_SECRET=votre_secret
PAYTECH_ENV=test  # ou production
PAYTECH_SUCCESS_URL=https://votresite.com/checkout/success
PAYTECH_CANCEL_URL=https://votresite.com/checkout
PAYTECH_IPN_URL=https://votresite.com/api/paytech/webhook
```

#### 1.2 Configuration PayTech (`lib/paytech/config.ts`)
```typescript
export const paytechConfig = {
  apiKey: process.env.PAYTECH_API_KEY!,
  apiSecret: process.env.PAYTECH_API_SECRET!,
  baseUrl: process.env.PAYTECH_ENV === 'production' 
    ? 'https://paytech.sn/api' 
    : 'https://test.paytech.sn/api',
  successUrl: process.env.PAYTECH_SUCCESS_URL!,
  cancelUrl: process.env.PAYTECH_CANCEL_URL!,
  ipnUrl: process.env.PAYTECH_IPN_URL!,
}
```

#### 1.3 API Wrapper PayTech (`lib/paytech/api.ts`)
```typescript
// Fonctions principales:
- createPaymentSession()      // Créer session paiement
- verifyPayment()              // Vérifier statut paiement
- handleWebhook()              // Gérer IPN PayTech
```

---

### Phase 2: Mise à Jour du Schéma Prisma (10 min)

#### 2.1 Ajouter champs Guest dans Order
```prisma
model Order {
  id            String   @id @default(cuid())
  orderNumber   String   @unique @default(cuid())
  
  // User optionnel (guest checkout)
  userId        String?
  user          User?    @relation(fields: [userId], references: [id])
  
  // Infos guest (si pas connecté)
  guestEmail    String?
  guestName     String?
  guestPhone    String?
  
  // Adresse de livraison
  shippingName     String
  shippingPhone    String
  shippingAddress  String
  shippingCity     String
  shippingZone     String   // "DAKAR" | "THIES" | "AUTRE"
  shippingFees     Int      @default(0)
  
  // Paiement
  paymentMethod    String   // "ORANGE_MONEY" | "WAVE" | "CARD"
  paymentStatus    String   @default("PENDING")
  paytechToken     String?
  paytechRef       String?
  
  // Totaux
  subtotalCents    Int
  shippingCents    Int
  totalCents       Int
  
  // Statuts
  status           String   @default("PENDING") // PENDING | CONFIRMED | PROCESSING | SHIPPED | DELIVERED | CANCELLED
  
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  
  items            OrderItem[]
}
```

---

### Phase 3: Flow Checkout Multi-Étapes (2-3h)

#### 3.1 État Global du Checkout (`hooks/use-checkout.ts`)
```typescript
interface CheckoutState {
  // Étape actuelle
  step: 1 | 2 | 3 | 4
  
  // Infos client
  customer: {
    isGuest: boolean
    email: string
    name: string
    phone: string
  }
  
  // Livraison
  shipping: {
    zone: 'DAKAR' | 'THIES' | 'AUTRE'
    address: string
    city: string
    fees: number
  }
  
  // Paiement
  payment: {
    method: 'ORANGE_MONEY' | 'WAVE' | 'CARD'
  }
  
  // Conditions
  termsAccepted: boolean
  
  // Actions
  goToStep: (step: number) => void
  updateCustomer: (data: Partial<Customer>) => void
  updateShipping: (data: Partial<Shipping>) => void
  selectPaymentMethod: (method: string) => void
  acceptTerms: (value: boolean) => void
  reset: () => void
}
```

#### 3.2 Page Checkout (`app/checkout/page.tsx`)
```typescript
'use client'

export default function CheckoutPage() {
  const { items } = useCart()
  const { step, goToStep } = useCheckout()
  const session = useSession() // Peut être null (guest)
  
  // Redirection si panier vide
  if (items.length === 0) {
    return <EmptyCartMessage />
  }
  
  return (
    <CheckoutLayout>
      {/* Barre de progression */}
      <CheckoutSteps currentStep={step} />
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Colonne principale */}
        <div className="lg:col-span-2">
          {step === 1 && <CheckoutCart onNext={() => goToStep(2)} />}
          {step === 2 && <CustomerInfoForm session={session} />}
          {step === 3 && <ShippingSelector />}
          {step === 4 && <PaymentMethodSelector />}
        </div>
        
        {/* Sidebar récapitulatif */}
        <div className="lg:col-span-1">
          <CheckoutSummary />
        </div>
      </div>
    </CheckoutLayout>
  )
}
```

#### 3.3 Composants Clés

##### **CustomerInfoForm** (Étape 2)
- Détecte si user connecté
- Si connecté: pré-remplit les champs
- Si guest: formulaire complet
- Option "Créer un compte" (optionnelle)
- Validation email, téléphone, nom

##### **ShippingSelector** (Étape 3)
- Sélecteur de zone:
  - 🏙️ Dakar (Livraison <24h) - 2000 CFA
  - 🌆 Thiès (24-48h) - 3000 CFA
  - 🗺️ Autres régions (48-72h) - 5000 CFA
- Formulaire adresse complète
- Calcul automatique des frais

##### **PaymentMethodSelector** (Étape 4)
- Cards visuelles pour chaque méthode:
  ```
  [🟠 Orange Money]  [🔵 Wave]  [💳 Carte Bancaire]
  ```
- Récapitulatif final:
  - Articles (N items)
  - Sous-total
  - Frais de livraison
  - **Total**
- Checkbox CGV
- Bouton "Finaliser la commande"

---

### Phase 4: API Routes PayTech (1-2h)

#### 4.1 Créer Session Paiement (`app/api/paytech/session/route.ts`)
```typescript
export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json()
    
    // 1. Récupérer commande
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    })
    
    // 2. Créer session PayTech
    const session = await createPaytechSession({
      amount: order.totalCents,
      currency: 'XOF',
      item_name: `Commande #${order.orderNumber}`,
      ref_command: order.orderNumber,
      custom_field: orderId,
      success_url: paytechConfig.successUrl,
      cancel_url: paytechConfig.cancelUrl,
      ipn_url: paytechConfig.ipnUrl,
    })
    
    // 3. Sauvegarder token PayTech
    await prisma.order.update({
      where: { id: orderId },
      data: { 
        paytechToken: session.token,
        paytechRef: session.ref,
      }
    })
    
    // 4. Retourner URL de paiement
    return NextResponse.json({ 
      url: session.redirect_url 
    })
  } catch (error) {
    // Gestion erreurs
  }
}
```

#### 4.2 Webhook PayTech (IPN) (`app/api/paytech/webhook/route.ts`)
```typescript
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json()
    
    // 1. Vérifier signature PayTech
    const isValid = verifyPaytechSignature(payload)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
    
    // 2. Récupérer commande
    const orderId = payload.custom_field
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    })
    
    // 3. Mettre à jour statut selon PayTech
    if (payload.status === 'success') {
      await prisma.order.update({
        where: { id: orderId },
        data: { 
          paymentStatus: 'PAID',
          status: 'CONFIRMED',
        }
      })
      
      // 4. Envoyer email confirmation
      await sendOrderConfirmationEmail(order)
      
      // 5. Mettre à jour stock
      await updateProductStock(order.items)
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    // Gestion erreurs
  }
}
```

#### 4.3 Page Success (`app/checkout/success/page.tsx`)
```typescript
export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; ref?: string }>
}) {
  const params = await searchParams
  
  // Vérifier paiement PayTech
  const payment = await verifyPaytechPayment(params.token)
  
  if (payment.status === 'success') {
    return (
      <div className="container py-12">
        <CheckIcon className="w-16 h-16 text-green-500 mx-auto" />
        <h1 className="text-3xl font-bold text-center mt-6">
          Commande confirmée !
        </h1>
        <p className="text-center text-muted-foreground mt-2">
          Merci pour votre commande. Vous recevrez un email de confirmation.
        </p>
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/account/orders">Voir mes commandes</Link>
          </Button>
        </div>
      </div>
    )
  }
  
  return <ErrorMessage />
}
```

---

### Phase 5: Server Actions (1h)

#### 5.1 Créer Commande (`server/actions/checkout.ts`)
```typescript
'use server'

export async function createGuestOrder(data: {
  // Items
  items: CartItem[]
  
  // Customer
  email: string
  name: string
  phone: string
  
  // Shipping
  address: string
  city: string
  zone: 'DAKAR' | 'THIES' | 'AUTRE'
  
  // Payment
  paymentMethod: 'ORANGE_MONEY' | 'WAVE' | 'CARD'
}) {
  try {
    // 1. Calculer totaux
    const subtotal = calculateSubtotal(data.items)
    const shippingFees = getShippingFees(data.zone)
    const total = subtotal + shippingFees
    
    // 2. Créer commande
    const order = await prisma.order.create({
      data: {
        // Guest
        guestEmail: data.email,
        guestName: data.name,
        guestPhone: data.phone,
        
        // Shipping
        shippingName: data.name,
        shippingPhone: data.phone,
        shippingAddress: data.address,
        shippingCity: data.city,
        shippingZone: data.zone,
        shippingFees: shippingFees,
        
        // Payment
        paymentMethod: data.paymentMethod,
        paymentStatus: 'PENDING',
        
        // Totaux
        subtotalCents: subtotal,
        shippingCents: shippingFees,
        totalCents: total,
        
        status: 'PENDING',
        
        // Items
        items: {
          create: data.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            priceCents: item.priceCents,
          }))
        }
      },
      include: { items: true }
    })
    
    // 3. Retourner orderId
    return { success: true, orderId: order.id }
  } catch (error) {
    return { success: false, error: 'Erreur création commande' }
  }
}
```

---

## 🎨 Expérience Utilisateur

### Flow Complet

```
[1. PANIER] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│
│ • Affichage des articles
│ • Modification quantités
│ • Bouton "Passer à la livraison"
│
▼

[2. INFORMATIONS CLIENT] ━━━━━━━━━━━━━━━━━
│
│ Si connecté:
│   • Pré-remplissage des champs
│   • Option "Utiliser une autre adresse"
│
│ Si guest:
│   • Formulaire complet (email, nom, téléphone)
│   • Option "Créer un compte" (optionnelle)
│
│ • Validation en temps réel
│ • Bouton "Continuer vers la livraison"
│
▼

[3. LIVRAISON] ━━━━━━━━━━━━━━━━━━━━━━━━━━━
│
│ • Sélection zone (radio buttons):
│   ○ Dakar (<24h) - 2000 CFA
│   ○ Thiès (24-48h) - 3000 CFA
│   ○ Autres (48-72h) - 5000 CFA
│
│ • Adresse complète (textarea)
│ • Ville (input)
│
│ • Mise à jour automatique du total
│ • Bouton "Continuer vers le paiement"
│
▼

[4. PAIEMENT] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│
│ • Sélection méthode (cards visuelles):
│   [🟠 Orange Money] [🔵 Wave] [💳 CB]
│
│ • Récapitulatif:
│   Sous-total: 25 000 CFA
│   Livraison: 2 000 CFA
│   ─────────────────────
│   Total: 27 000 CFA
│
│ • Checkbox CGV ☐ J'accepte les conditions
│
│ • Bouton "Finaliser la commande" (désactivé si CGV non coché)
│
▼

[5. REDIRECTION PAYTECH] ━━━━━━━━━━━━━━━━━
│
│ • Création de la commande en BDD
│ • Création session PayTech
│ • Redirection vers interface PayTech
│
▼

[6. PAIEMENT PAYTECH] ━━━━━━━━━━━━━━━━━━━━
│
│ • Interface PayTech (hors site)
│ • Saisie numéro + validation
│ • Confirmation OTP
│
▼

[7. CALLBACK] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│
│ Si succès:
│   • Redirection /checkout/success?token=xxx
│   • Webhook IPN met à jour commande
│   • Email de confirmation envoyé
│   • Panier vidé
│
│ Si échec/annulation:
│   • Redirection /checkout?error=1
│   • Message d'erreur
│   • Possibilité de réessayer
│
```

---

## 🔒 Sécurité & Validation

### 1. Validation des Données

#### Schéma Zod pour Checkout
```typescript
const customerSchema = z.object({
  email: z.string().email('Email invalide'),
  name: z.string().min(3, 'Nom trop court'),
  phone: z.string().regex(/^(77|78|76|70|75)[0-9]{7}$/, 'Téléphone invalide'),
})

const shippingSchema = z.object({
  zone: z.enum(['DAKAR', 'THIES', 'AUTRE']),
  address: z.string().min(10, 'Adresse trop courte'),
  city: z.string().min(2, 'Ville invalide'),
})

const paymentSchema = z.object({
  method: z.enum(['ORANGE_MONEY', 'WAVE', 'CARD']),
})

const checkoutSchema = z.object({
  customer: customerSchema,
  shipping: shippingSchema,
  payment: paymentSchema,
  termsAccepted: z.literal(true, { message: 'Vous devez accepter les CGV' }),
})
```

### 2. Protection des Routes API

```typescript
// Rate limiting
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  // Limite: 5 tentatives par minute
  const identifier = req.ip ?? 'anonymous'
  const { success } = await rateLimit.check(identifier, 5, '1m')
  
  if (!success) {
    return NextResponse.json(
      { error: 'Trop de tentatives' }, 
      { status: 429 }
    )
  }
  
  // Suite du traitement...
}
```

### 3. Vérification Stock Avant Paiement

```typescript
async function verifyStockAvailability(items: CartItem[]) {
  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId }
    })
    
    if (!product || product.stock < item.quantity) {
      throw new Error(`Stock insuffisant pour ${product?.name}`)
    }
  }
}
```

---

## 📧 Emails & Notifications

### 1. Email Confirmation Commande

```typescript
// lib/emails/order-confirmation.tsx
import { Resend } from 'resend'

export async function sendOrderConfirmationEmail(order: Order) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  await resend.emails.send({
    from: 'Univers Cosmetix <noreply@universcosmetix.com>',
    to: order.guestEmail || order.user.email,
    subject: `Confirmation de commande #${order.orderNumber}`,
    html: `
      <h1>Merci pour votre commande !</h1>
      <p>Bonjour ${order.shippingName},</p>
      <p>Votre commande #${order.orderNumber} a bien été confirmée.</p>
      
      <h2>Récapitulatif</h2>
      <ul>
        ${order.items.map(item => `
          <li>${item.product.name} x${item.quantity} - ${formatCFA(item.priceCents * item.quantity)}</li>
        `).join('')}
      </ul>
      
      <p><strong>Total: ${formatCFA(order.totalCents)}</strong></p>
      
      <h2>Livraison</h2>
      <p>
        ${order.shippingAddress}<br>
        ${order.shippingCity}, ${order.shippingZone}
      </p>
      <p>Délai: ${getDeliveryDelay(order.shippingZone)}</p>
      
      <p>Vous pouvez suivre votre commande sur notre site.</p>
    `
  })
}
```

### 2. Email Expédition

```typescript
export async function sendShippingNotificationEmail(order: Order) {
  // Email envoyé quand status = "SHIPPED"
  // Avec numéro de suivi si disponible
}
```

---

## 📱 Responsive & Accessibilité

### 1. Mobile-First Design

- Checkout en une seule colonne sur mobile
- Récapitulatif collapsible
- Boutons CTA fixes en bas
- Inputs adaptés (type="tel" pour téléphone)

### 2. Accessibilité

- Labels explicites sur tous les champs
- Messages d'erreur associés (aria-describedby)
- Focus management entre les étapes
- Annonces pour lecteurs d'écran (aria-live)

### 3. Progressive Enhancement

- Formulaire fonctionnel sans JS
- Validation côté serveur obligatoire
- Fallback pour les erreurs réseau

---

## 🧪 Tests à Effectuer

### 1. Tests Fonctionnels

- [ ] Commande guest (utilisateur non connecté)
- [ ] Commande utilisateur connecté
- [ ] Paiement Orange Money réussi
- [ ] Paiement Wave réussi
- [ ] Paiement CB réussi
- [ ] Paiement annulé
- [ ] Paiement échoué
- [ ] Stock insuffisant
- [ ] Email de confirmation reçu
- [ ] Webhook IPN reçu et traité
- [ ] Mise à jour stock après commande

### 2. Tests de Sécurité

- [ ] Rate limiting fonctionnel
- [ ] Validation des données côté serveur
- [ ] Protection CSRF
- [ ] Vérification signature webhook
- [ ] Pas de manipulation du prix côté client

### 3. Tests de Performance

- [ ] Temps de chargement checkout < 2s
- [ ] Pas de blocage UI pendant validation
- [ ] Optimisation images produits

---

## 📊 Métriques à Suivre

### Analytics Checkout

```typescript
// lib/analytics/checkout.ts

export const trackCheckoutEvent = {
  started: (value: number) => {
    // Analytics: Checkout initié
  },
  stepCompleted: (step: number, value: number) => {
    // Analytics: Étape complétée
  },
  paymentMethodSelected: (method: string) => {
    // Analytics: Méthode sélectionnée
  },
  completed: (orderId: string, value: number) => {
    // Analytics: Conversion
  },
  abandoned: (step: number, value: number) => {
    // Analytics: Abandon
  },
}
```

### KPIs à Monitorer

- Taux de conversion checkout
- Taux d'abandon par étape
- Répartition méthodes de paiement
- Temps moyen de checkout
- Taux d'erreur PayTech

---

## 🚀 Déploiement

### 1. Variables d'Environnement

```bash
# Production
PAYTECH_API_KEY=prod_key
PAYTECH_API_SECRET=prod_secret
PAYTECH_ENV=production
PAYTECH_SUCCESS_URL=https://universcosmetix.com/checkout/success
PAYTECH_CANCEL_URL=https://universcosmetix.com/checkout
PAYTECH_IPN_URL=https://universcosmetix.com/api/paytech/webhook

# Resend (emails)
RESEND_API_KEY=re_xxx

# Base de données
DATABASE_URL=postgresql://...
```

### 2. Configuration PayTech Backend

- [ ] Créer compte PayTech production
- [ ] Configurer URL webhook (IPN)
- [ ] Tester en environnement sandbox
- [ ] Activer en production
- [ ] Monitorer les transactions

### 3. SSL & Sécurité

- [ ] Certificat SSL actif
- [ ] Headers de sécurité configurés
- [ ] CORS configuré pour PayTech
- [ ] Rate limiting activé

---

## 📝 Checklist Finale

### Avant Mise en Production

- [ ] Migration Prisma effectuée
- [ ] Tests PayTech sandbox passés
- [ ] Emails de confirmation fonctionnels
- [ ] Webhook IPN testé
- [ ] Flow guest checkout complet
- [ ] Flow user connecté complet
- [ ] Validation des formulaires
- [ ] Gestion des erreurs
- [ ] Messages d'erreur clairs
- [ ] Mobile responsive
- [ ] Accessibilité validée
- [ ] Analytics configurées
- [ ] Monitoring activé
- [ ] Documentation API PayTech
- [ ] Formation équipe support

---

## 🎯 Résumé des Priorités

### Priorité 1 (MVP - 4-6h)
1. Configuration PayTech de base
2. Checkout guest (formulaire simple)
3. Création commande en BDD
4. Intégration PayTech (redirection)
5. Webhook IPN basique
6. Page success

### Priorité 2 (Amélioration - 2-3h)
1. Multi-étapes avec progression
2. Récapitulatif sidebar
3. Calcul frais de livraison
4. Validation robuste
5. Gestion erreurs complète

### Priorité 3 (Polish - 2-3h)
1. Emails de confirmation
2. Design amélioré
3. Animations
4. Analytics
5. Tests complets

---

## 🔗 Ressources

### Documentation PayTech
- API Documentation: [À compléter]
- Guide d'intégration: [À compléter]
- Support: [À compléter]

### Code de Référence
- Univers Cosmetix: https://www.universcosmetix.com/checkout
- Stripe Checkout (pour inspiration): https://stripe.com/docs/checkout

### Outils
- Prisma Studio: `npx prisma studio`
- PayTech Sandbox: [URL à compléter]
- Postman Collection: [À créer]

---

## ✅ Prochaines Étapes

1. **Valider ce plan** avec l'équipe
2. **Obtenir les credentials PayTech** (test + prod)
3. **Commencer Phase 1**: Configuration PayTech
4. **Implémenter Phase 2**: Mise à jour schéma
5. **Développer Phase 3**: Flow checkout
6. **Intégrer Phase 4**: API PayTech
7. **Tester Phase 5**: Tests complets
8. **Déployer**: Mise en production progressive

---

**Estimation totale: 10-15 heures de développement**

**Prêt à commencer l'implémentation ? 🚀**
