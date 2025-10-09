# Estimation des Coûts Mensuels - Application E-Commerce

**Date : Octobre 2025**  
**Application : Univers Cosmetix Clone**

---

## 📊 Résumé Exécutif

| Scénario | Coût Mensuel Estimé |
|----------|---------------------|
| **Démarrage (0-100 commandes/mois)** | **15 000 - 30 000 FCFA** (~$25-50) |
| **Croissance (100-500 commandes/mois)** | **45 000 - 90 000 FCFA** (~$75-150) |
| **Établi (500-2000 commandes/mois)** | **120 000 - 240 000 FCFA** (~$200-400) |

---

## 🔧 Services Utilisés et Coûts Détaillés

### 1. **Hébergement Next.js - Vercel**

#### Plan Hobby (Gratuit)
- ✅ **Coût : 0 FCFA/mois**
- Limites :
  - 100 GB de bande passante
  - Builds illimités
  - Domaines personnalisés
  - SSL automatique
- **Recommandé pour** : Phase de lancement (0-1000 visiteurs/jour)

#### Plan Pro (Recommandé pour production)
- 💰 **Coût : 12 000 FCFA/mois** (~$20/mois)
- Inclus :
  - 1 TB de bande passante
  - Support prioritaire
  - Analytics avancées
  - Protection DDoS
  - Membres d'équipe illimités
- **Recommandé pour** : Production (1000+ visiteurs/jour)

#### Plan Enterprise (Pour scale)
- 💰 **Coût : Sur devis (180 000+ FCFA/mois)** (~$300+/mois)
- Pour trafic très élevé

**Estimation retenue : 0-12 000 FCFA/mois**

---

### 2. **Base de Données PostgreSQL - Supabase**

#### Plan Free
- ✅ **Coût : 0 FCFA/mois**
- Limites :
  - 500 MB de stockage DB
  - 1 GB de bande passante
  - 50 000 requêtes API/mois
- **Recommandé pour** : Tests et démarrage

#### Plan Pro
- 💰 **Coût : 15 000 FCFA/mois** (~$25/mois)
- Inclus :
  - 8 GB de stockage DB
  - 50 GB de bande passante
  - 500 000 requêtes API/mois
  - Sauvegardes quotidiennes (7 jours)
  - SSL
- **Recommandé pour** : Production (jusqu'à 1000 commandes/mois)

#### Supabase Team
- 💰 **Coût : 15 000 FCFA/mois + usage**
- Stockage supplémentaire : 750 FCFA/GB/mois
- Bande passante : 540 FCFA/GB

**Estimation retenue : 0-20 000 FCFA/mois**

#### Alternative : Neon PostgreSQL
- Plan gratuit généreux (3 GB)
- Plan Scale : ~30 000 FCFA/mois pour 50 GB

---

### 3. **Stockage Images - Supabase Storage**

Déjà inclus dans Supabase (voir ci-dessus)

#### Plan Free
- 1 GB de stockage
- 2 GB de transfert/mois

#### Plan Pro
- 100 GB de stockage inclus
- 200 GB de transfert inclus
- Coût supplémentaire : 1 275 FCFA/GB de stockage, 540 FCFA/GB de transfert

**Estimation stockage produits :**
- 500 produits × 3 images × 200 KB = ~300 MB
- **Coût : Inclus dans Supabase**

---

### 4. **Upload de Fichiers - Uploadthing**

#### Plan Free
- ✅ **Coût : 0 FCFA/mois**
- Limites :
  - 2 GB de stockage
  - 2 GB de bande passante/mois
  - 100 uploads/jour
- **Recommandé pour** : Démarrage (ajout de quelques produits/jour)

#### Plan Pro
- 💰 **Coût : 12 000 FCFA/mois** (~$20/mois)
- Inclus :
  - 100 GB de stockage
  - 100 GB de bande passante
  - Uploads illimités

**Estimation retenue : 0-12 000 FCFA/mois**

---

### 5. **Paiements - Stripe**

#### Frais de transaction
- 💰 **2.9% + 150 FCFA par transaction réussie**
- Pas d'abonnement mensuel
- Frais pour cartes internationales : 3.9% + 150 FCFA

**Calcul estimatif :**
- Panier moyen : 25 000 FCFA
- 100 commandes/mois : **~75 000 FCFA de frais**
- 500 commandes/mois : **~375 000 FCFA de frais**

**Note :** Ces frais sont prélevés sur le CA, pas des coûts fixes.

#### Alternative : PayTech (Sénégal)
- Orange Money : ~2-3% par transaction
- Wave : ~1-2% par transaction
- **Recommandé pour réduire les frais locaux**

**Estimation retenue : Variable selon CA (2-3% du chiffre d'affaires)**

---

### 6. **Emails - Resend**

#### Plan Free
- ✅ **Coût : 0 FCFA/mois**
- Limites :
  - 3 000 emails/mois
  - 100 emails/jour
- **Recommandé pour** : Démarrage (jusqu'à 100 commandes/mois)

#### Plan Pro
- 💰 **Coût : 12 000 FCFA/mois** (~$20/mois)
- Inclus :
  - 50 000 emails/mois
  - Support prioritaire
  - Analytics

**Estimation emails mensuels :**
- Confirmation commande : 1 email/commande
- Mise à jour statut : 2-3 emails/commande
- Newsletter : optionnel
- 100 commandes × 4 emails = 400 emails/mois (gratuit)
- 500 commandes × 4 emails = 2 000 emails/mois (gratuit)

**Estimation retenue : 0-12 000 FCFA/mois**

---

### 7. **Authentification - NextAuth.js**

- ✅ **Coût : 0 FCFA/mois** (gratuit, self-hosted)
- Inclus :
  - OAuth (Google, GitHub)
  - Credentials
  - JWT

---

### 8. **Monitoring & Analytics**

#### Vercel Analytics (inclus dans Pro)
- Inclus dans le plan Pro Vercel
- Ou gratuit avec limitations

#### Google Analytics
- ✅ **Coût : 0 FCFA/mois** (gratuit)

#### Sentry (Error Monitoring) - Optionnel
- Plan gratuit : 5 000 événements/mois
- Plan Team : 15 000 FCFA/mois pour 50 000 événements

**Estimation retenue : 0 FCFA/mois**

---

### 9. **Nom de Domaine**

- 💰 **Coût : 6 000-18 000 FCFA/an** (~1 000-1 500 FCFA/mois)
- .com : ~7 500 FCFA/an
- .sn : ~15 000 FCFA/an

**Estimation retenue : 1 000 FCFA/mois**

---

### 10. **CDN & Cache - Cloudflare (Optionnel)**

#### Plan Free
- ✅ **Coût : 0 FCFA/mois**
- CDN illimité
- SSL gratuit
- Protection DDoS basique

#### Plan Pro
- 💰 **Coût : 12 000 FCFA/mois**
- Cache amélioré
- Protection DDoS avancée

**Estimation retenue : 0 FCFA/mois** (Vercel inclut déjà un CDN)

---

## 💰 Récapitulatif par Scénario

### 📍 Scénario 1 : DÉMARRAGE (0-100 commandes/mois)

| Service | Coût Mensuel |
|---------|--------------|
| Vercel Hobby | 0 FCFA |
| Supabase Free | 0 FCFA |
| Uploadthing Free | 0 FCFA |
| Stripe (sur CA) | ~75 000 FCFA* |
| Resend Free | 0 FCFA |
| NextAuth | 0 FCFA |
| Domaine | 1 000 FCFA |
| **TOTAL FIXE** | **~1 000 FCFA/mois** |
| **Frais variables** | **~75 000 FCFA (sur CA de ~2.5M FCFA)** |

*Frais Stripe = 2.9% du CA, pas un coût fixe mais prélevé sur les ventes

---

### 📍 Scénario 2 : CROISSANCE (100-500 commandes/mois)

| Service | Coût Mensuel |
|---------|--------------|
| Vercel Pro | 12 000 FCFA |
| Supabase Pro | 15 000 FCFA |
| Uploadthing Pro | 12 000 FCFA |
| Stripe (sur CA) | ~375 000 FCFA* |
| Resend Free | 0 FCFA |
| NextAuth | 0 FCFA |
| Domaine | 1 000 FCFA |
| **TOTAL FIXE** | **~40 000 FCFA/mois** |
| **Frais variables** | **~375 000 FCFA (sur CA de ~12.5M FCFA)** |

---

### 📍 Scénario 3 : ÉTABLI (500-2000 commandes/mois)

| Service | Coût Mensuel |
|---------|--------------|
| Vercel Pro | 12 000 FCFA |
| Supabase Pro + Extra | 20 000 FCFA |
| Uploadthing Pro | 12 000 FCFA |
| Stripe (sur CA) | ~1 500 000 FCFA* |
| Resend Pro | 12 000 FCFA |
| NextAuth | 0 FCFA |
| Domaine | 1 000 FCFA |
| Sentry (optionnel) | 15 000 FCFA |
| **TOTAL FIXE** | **~72 000 FCFA/mois** |
| **Frais variables** | **~1 500 000 FCFA (sur CA de ~50M FCFA)** |

---

## 🎯 Recommandations pour Optimiser les Coûts

### 1. **Phase de Lancement (0-3 mois)**
**Budget recommandé : 0-15 000 FCFA/mois**

- ✅ Commencer avec tous les plans gratuits
- ✅ Utiliser Vercel Hobby (gratuit)
- ✅ Supabase Free (suffisant pour démarrer)
- ✅ Uploadthing Free
- ✅ Resend Free
- ⚠️ Passer à PayTech (Orange Money/Wave) au lieu de Stripe pour réduire les frais de 2.9% à ~1.5%

### 2. **Phase de Croissance (3-12 mois)**
**Budget recommandé : 40 000-60 000 FCFA/mois**

- ✅ Passer à Vercel Pro (12 000 FCFA)
- ✅ Passer à Supabase Pro (15 000 FCFA)
- ✅ Garder Resend Free (2K emails/mois suffisent)
- ⚠️ Optimiser les images (WebP, compression) pour réduire le stockage
- ⚠️ Mettre en place un cache agressif (ISR Next.js)

### 3. **Phase Établie (12+ mois)**
**Budget recommandé : 60 000-90 000 FCFA/mois**

- ✅ Tous les services Pro
- ✅ Monitoring avec Sentry
- ✅ Sauvegardes DB quotidiennes
- ⚠️ Négocier les frais PayTech/Stripe avec le volume
- ⚠️ Considérer un serveur dédié si >5000 commandes/mois

---

## 💡 Optimisations Spécifiques pour le Marché Sénégalais

### 1. **Paiements Locaux**
- ✅ **Remplacer Stripe par PayTech**
  - Orange Money : ~1.5% (vs 2.9% Stripe)
  - Wave : ~1% (vs 2.9% Stripe)
  - **Économie : ~1.5% du CA**
  - Sur 10M FCFA/mois = **150 000 FCFA économisés**

### 2. **Hébergement**
- ✅ Garder Vercel (CDN mondial, rapide au Sénégal)
- ⚠️ Alternative : Serveur local si besoin (plus complexe)

### 3. **Images**
- ✅ Compression WebP (réduction 30-50% du poids)
- ✅ Lazy loading (réduction bande passante)
- ✅ Redimensionnement automatique (Next.js Image)

### 4. **Base de Données**
- ✅ Supabase région EU proche du Sénégal
- ✅ Index optimisés pour requêtes fréquentes
- ✅ Pagination pour limiter les transferts

---

## 📈 Projection sur 12 Mois

| Mois | Commandes | CA Estimé | Coûts Fixes | Frais Paiement (2%) | Total Coûts | % du CA |
|------|-----------|-----------|-------------|---------------------|-------------|---------|
| 1-2 | 20-50 | 500K-1.2M | 1K | 10K-24K | 11K-25K | 2.2% |
| 3-4 | 50-100 | 1.2M-2.5M | 1K | 24K-50K | 25K-51K | 2.1% |
| 5-6 | 100-200 | 2.5M-5M | 40K | 50K-100K | 90K-140K | 3.6% |
| 7-9 | 200-500 | 5M-12.5M | 40K | 100K-250K | 140K-290K | 2.8% |
| 10-12 | 500-1000 | 12.5M-25M | 60K | 250K-500K | 310K-560K | 2.5% |

**Moyenne coûts infrastructure : 2-4% du chiffre d'affaires**

---

## ⚠️ Coûts Supplémentaires à Prévoir

### 1. **Marketing (hors infrastructure)**
- Publicité Facebook/Instagram : 30 000-150 000 FCFA/mois
- Google Ads : 30 000-150 000 FCFA/mois
- Influenceurs : variable

### 2. **Opérations**
- Emballage et packaging : ~500-1000 FCFA/commande
- Livraison (si non facturée au client) : 1000-3000 FCFA/commande
- Support client : 1-2 personnes si >500 commandes/mois

### 3. **Légal & Administratif**
- Comptabilité : 15 000-30 000 FCFA/mois
- Assurance : variable
- Licence commerciale : annuel

---

## 🎯 Conclusion

### Coûts d'Infrastructure Pure (SANS frais de paiement)

| Phase | Coût Mensuel Fixe |
|-------|-------------------|
| **Démarrage** | **1 000 FCFA/mois** (tout gratuit sauf domaine) |
| **Croissance** | **40 000 FCFA/mois** (plans Pro) |
| **Établi** | **60 000-90 000 FCFA/mois** (plans Pro + monitoring) |

### Coûts Totaux (AVEC frais de paiement)

Les frais de paiement représentent la majorité des coûts :
- **1.5-2.9% du chiffre d'affaires** selon le moyen de paiement
- Sur 10M FCFA/mois de CA = **150K-290K FCFA de frais**

### 💰 Résumé Final

**L'infrastructure technique coûte peu cher** (1 000 - 90 000 FCFA/mois selon la phase).

**Les vrais coûts sont :**
1. **Frais de paiement** (1.5-2.9% du CA) - plus vous vendez, plus c'est élevé
2. **Marketing et acquisition** (budget à définir selon objectifs)
3. **Logistique et opérations** (livraison, packaging, personnel)

**Recommandation de démarrage :**
- Commencer avec **1 000 FCFA/mois** (tout gratuit)
- Prévoir **budget marketing de 50 000-100 000 FCFA/mois**
- Passer aux plans Pro quand le CA dépasse **2-3M FCFA/mois**

---

**Dernière mise à jour : Octobre 2025**
