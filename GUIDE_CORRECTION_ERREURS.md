# 🔧 Guide de Correction des Erreurs FlawlessBeauty

**Date**: 2025-10-09  
**Statut**: 🔴 Erreurs critiques détectées

---

## 📋 Table des Matières

1. [Résumé des Problèmes](#résumé-des-problèmes)
2. [Correction de la Base de Données](#correction-de-la-base-de-données)
3. [Correction des Images Manquantes](#correction-des-images-manquantes)
4. [Vérification Finale](#vérification-finale)
5. [Prévention Future](#prévention-future)

---

## 🚨 Résumé des Problèmes

### Problème 1: Table Order Incomplète ❌ CRITIQUE
**Erreur**:
```
Invalid `prisma.order.create()` invocation:
The column `orderNumber` does not exist in the current database.
```

**Impact**: 
- ❌ Impossible de créer des commandes
- ❌ Checkout bloqué
- ❌ Application non fonctionnelle

**Colonnes manquantes**: 23/29 colonnes absentes (voir `database_schemas.md`)

---

### Problème 2: Images 404 ⚠️ IMPORTANT
**Erreurs**:
```
_next/image?url=%2Fimages%2Fshampoing.jpg - 404
_next/image?url=%2Fimages%2Ffond-teint.jpg - 404
_next/image?url=%2Fimages%2Fvitamines.jpg - 404
```

**Impact**: 
- ⚠️ Images de produits non affichées
- ⚠️ Expérience utilisateur dégradée
- ✅ Application fonctionnelle (erreur non bloquante)

---

## 🔧 Correction de la Base de Données

### Méthode 1: Script SQL Direct (RECOMMANDÉ)

#### Étape 1: Sauvegarde de sécurité
```sql
-- Connectez-vous à Supabase SQL Editor
-- Créez une sauvegarde de la table Order
CREATE TABLE "Order_backup" AS SELECT * FROM "Order";

-- Vérifiez la sauvegarde
SELECT COUNT(*) FROM "Order_backup";
```

#### Étape 2: Exécution du script de correction
```bash
# 1. Ouvrez Supabase SQL Editor
# 2. Copiez le contenu de scripts/sql/02-fix-order-table.sql
# 3. Exécutez le script complet

# Le script effectue automatiquement:
# ✅ Création des ENUMs manquants (ShippingZone, PaymentMethod, PaymentStatus)
# ✅ Ajout de toutes les 23 colonnes manquantes
# ✅ Migration des données existantes (si applicable)
# ✅ Ajout des contraintes (UNIQUE sur orderNumber, NOT NULL, etc.)
# ✅ Génération automatique des orderNumber pour les commandes existantes
```

#### Étape 3: Vérification
```sql
-- Vérifiez que toutes les colonnes ont été ajoutées
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
    AND table_name = 'Order'
ORDER BY ordinal_position;

-- Résultat attendu: 29 colonnes (au lieu de 6)
```

#### Étape 4: Test de création de commande
```sql
-- Testez l'insertion d'une commande
INSERT INTO "Order" (
    "id",
    "orderNumber",
    "firstName",
    "lastName",
    "email",
    "phone",
    "ville",
    "quartier",
    "adresseDetaillee",
    "subtotalCents",
    "shippingCents",
    "totalCents",
    "status",
    "paymentStatus",
    "paymentMethod",
    "shippingZone"
) VALUES (
    'test_order_001',
    'ORD-TEST-001',
    'Test',
    'Client',
    'test@example.com',
    '771234567',
    'Dakar',
    'Plateau',
    'Près de la place de l''indépendance',
    50000,
    3000,
    53000,
    'PENDING',
    'PENDING',
    'ORANGE_MONEY',
    'DAKAR'
);

-- Vérifiez l'insertion
SELECT * FROM "Order" WHERE "orderNumber" = 'ORD-TEST-001';

-- Supprimez le test
DELETE FROM "Order" WHERE "orderNumber" = 'ORD-TEST-001';
```

---

### Méthode 2: Via Prisma (ALTERNATIVE)

⚠️ **ATTENTION**: Cette méthode peut entraîner une perte de données si la base de données contient des données incompatibles avec le schéma.

```bash
# Option 1: Push du schéma (pour dev uniquement)
npx prisma db push --accept-data-loss

# Option 2: Créer et appliquer une migration (pour production)
npx prisma migrate dev --name add_order_columns

# Vérifier que tout est synchronisé
npx prisma db pull
npx prisma generate
```

**Avantages**:
- ✅ Synchronisation automatique
- ✅ Gestion des migrations

**Inconvénients**:
- ❌ Risque de perte de données
- ❌ Moins de contrôle sur le processus

---

### Méthode 3: Script Node.js (POUR AUTOMATISATION)

Créez un fichier `scripts/fix-database.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

const prisma = new PrismaClient()

async function fixDatabase() {
  try {
    console.log('🔍 Vérification de la base de données...')
    
    // Vérifier si les colonnes manquent
    const result = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = 'Order'
    `
    
    console.log(`📊 Nombre de colonnes actuelles: ${result.length}`)
    
    if (result.length < 29) {
      console.log('⚠️  Colonnes manquantes détectées!')
      console.log('🔧 Application du script de correction...')
      
      // Exécuter le script SQL
      execSync('psql $DATABASE_URL -f scripts/sql/02-fix-order-table.sql', {
        stdio: 'inherit'
      })
      
      console.log('✅ Base de données corrigée!')
    } else {
      console.log('✅ Base de données déjà à jour!')
    }
    
    // Régénérer le client Prisma
    console.log('🔄 Régénération du client Prisma...')
    execSync('npx prisma generate', { stdio: 'inherit' })
    
    console.log('✨ Processus terminé avec succès!')
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

fixDatabase()
```

**Exécution**:
```bash
tsx scripts/fix-database.ts
```

---

## 🖼️ Correction des Images Manquantes

### Analyse du Problème

Les images suivantes sont référencées dans la base de données mais n'existent pas:
- `/images/shampoing.jpg`
- `/images/fond-teint.jpg`
- `/images/vitamines.jpg`

### Solution 1: Créer les Images Manquantes

**Option A: Télécharger des images réelles**
```bash
# Créez les fichiers images dans public/images/
# Utilisez des images libres de droits depuis:
# - Unsplash.com
# - Pexels.com
# - Pixabay.com

# Exemple de structure:
public/images/
  ├── shampoing.jpg         # Image de shampoing
  ├── fond-teint.jpg        # Image de fond de teint
  └── vitamines.jpg         # Image de vitamines
```

**Option B: Utiliser des images existantes**
```bash
# Créez des liens symboliques vers des images existantes
cd public/images
ln -s loreal-elvive-shampoo.png shampoing.jpg
ln -s maybelline-pink-mascara.png fond-teint.jpg
ln -s vitamin-c-serum.png vitamines.jpg
```

---

### Solution 2: Mettre à Jour la Base de Données

**Script SQL pour corriger les références d'images**:

```sql
-- Remplacer les images manquantes par des placeholders ou images existantes

-- Pour shampoing.jpg
UPDATE "Product" 
SET "imageUrl" = '/loreal-elvive-shampoo.png'
WHERE "imageUrl" = '/images/shampoing.jpg';

-- Pour fond-teint.jpg
UPDATE "Product" 
SET "imageUrl" = '/maybelline-pink-mascara.png'
WHERE "imageUrl" = '/images/fond-teint.jpg';

-- Pour vitamines.jpg
UPDATE "Product" 
SET "imageUrl" = '/vitamin-c-serum.png'
WHERE "imageUrl" = '/images/vitamines.jpg';

-- Vérifier les changements
SELECT id, name, "imageUrl" 
FROM "Product" 
WHERE "imageUrl" LIKE '/images/%';
```

---

### Solution 3: API de Correction Automatique

Un endpoint API existe déjà: `/api/admin/fix-images`

**Utilisation**:
```bash
# Appelez l'API pour corriger automatiquement les images
curl -X POST http://localhost:3000/api/admin/fix-images \
  -H "Content-Type: application/json"

# Ou via le navigateur (nécessite authentification admin)
# Accédez à: http://localhost:3000/api/admin/fix-images
```

**Ce que fait l'API**:
1. ✅ Scanne tous les produits
2. ✅ Détecte les images 404
3. ✅ Remplace par des images valides ou placeholders
4. ✅ Retourne un rapport de correction

---

### Solution 4: Script de Vérification des Images

Créez `scripts/check-images.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function checkImages() {
  console.log('🔍 Vérification des images...\n')
  
  const products = await prisma.product.findMany({
    select: { id: true, name: true, imageUrl: true }
  })
  
  const issues = []
  
  for (const product of products) {
    if (!product.imageUrl) {
      issues.push({
        product: product.name,
        issue: 'Pas d\'image définie',
        imageUrl: null
      })
      continue
    }
    
    // Vérifier si l'image existe
    const imagePath = path.join(process.cwd(), 'public', product.imageUrl)
    
    if (!fs.existsSync(imagePath)) {
      issues.push({
        product: product.name,
        issue: 'Image introuvable',
        imageUrl: product.imageUrl
      })
    }
  }
  
  if (issues.length > 0) {
    console.log(`❌ ${issues.length} problème(s) détecté(s):\n`)
    console.table(issues)
  } else {
    console.log('✅ Toutes les images sont valides!')
  }
  
  await prisma.$disconnect()
}

checkImages()
```

**Exécution**:
```bash
tsx scripts/check-images.ts
```

---

## ✅ Vérification Finale

### Checklist de Vérification

Après avoir appliqué les corrections, vérifiez:

#### 1. Base de Données
```bash
# Connectez-vous à Supabase et exécutez:
# scripts/sql/01-diagnostic-database.sql

# Vérifiez que la section 7 (colonnes manquantes) est vide
# Résultat attendu: "✅ EXISTE" pour toutes les colonnes
```

#### 2. Application Next.js
```bash
# Redémarrez le serveur de développement
npm run dev

# Testez le checkout
# 1. Ajoutez un produit au panier
# 2. Accédez au checkout
# 3. Remplissez le formulaire
# 4. Vérifiez qu'aucune erreur Prisma n'apparaît
```

#### 3. Images
```bash
# Vérifiez les images dans le navigateur
# 1. Ouvrez la console développeur (F12)
# 2. Naviguez sur le site
# 3. Vérifiez qu'il n'y a plus d'erreurs 404 pour les images
```

#### 4. Logs
```bash
# Vérifiez les logs serveur
# Aucune erreur de type:
# - "column does not exist"
# - "Failed to load resource: 404"
```

---

## 🛡️ Prévention Future

### 1. Utiliser les Migrations Prisma

**Toujours créer des migrations pour les changements de schéma**:

```bash
# Au lieu de modifier directement la base de données
# Modifiez prisma/schema.prisma puis:
npx prisma migrate dev --name description_du_changement

# En production:
npx prisma migrate deploy
```

### 2. Validation des Images

**Ajoutez une validation côté API**:

```typescript
// app/api/products/route.ts
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  const data = await req.json()
  
  // Valider que l'image existe
  if (data.imageUrl) {
    const imagePath = path.join(process.cwd(), 'public', data.imageUrl)
    if (!fs.existsSync(imagePath)) {
      return Response.json(
        { error: 'Image not found' },
        { status: 400 }
      )
    }
  }
  
  // Créer le produit...
}
```

### 3. Tests Automatisés

**Créez des tests pour détecter les problèmes**:

```typescript
// tests/database.test.ts
import { describe, it, expect } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Database Schema', () => {
  it('should have all required Order columns', async () => {
    const columns = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = 'Order'
    `
    
    const requiredColumns = [
      'id', 'orderNumber', 'firstName', 'lastName',
      'email', 'phone', 'ville', 'quartier',
      'adresseDetaillee', 'subtotalCents', 'shippingCents',
      'totalCents', 'status', 'paymentStatus', 'paymentMethod'
    ]
    
    const columnNames = columns.map(c => c.column_name)
    
    requiredColumns.forEach(col => {
      expect(columnNames).toContain(col)
    })
  })
})
```

### 4. Script de Santé (Health Check)

**Créez un endpoint de santé**:

```typescript
// app/api/health/route.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Vérifier la connexion à la base de données
    await prisma.$queryRaw`SELECT 1`
    
    // Vérifier le schéma Order
    const columns = await prisma.$queryRaw`
      SELECT COUNT(*) as count
      FROM information_schema.columns
      WHERE table_schema = 'public' 
        AND table_name = 'Order'
    `
    
    const orderColumnsCount = columns[0].count
    const isOrderSchemaValid = orderColumnsCount >= 29
    
    return Response.json({
      status: 'healthy',
      database: 'connected',
      orderSchema: isOrderSchemaValid ? 'valid' : 'invalid',
      orderColumnsCount
    })
  } catch (error) {
    return Response.json(
      { 
        status: 'unhealthy',
        error: error.message 
      },
      { status: 500 }
    )
  }
}
```

**Utilisation**:
```bash
# Vérifier la santé de l'application
curl http://localhost:3000/api/health
```

### 5. Documentation

**Maintenez à jour**:
- ✅ `database_schemas.md` - Structure de la base de données
- ✅ `GUIDE_CORRECTION_ERREURS.md` - Ce guide
- ✅ `README.md` - Instructions de démarrage
- ✅ Commentaires dans `prisma/schema.prisma`

---

## 📞 Support

### En cas de problème persistant

1. **Vérifiez les logs**:
   ```bash
   # Logs de l'application
   npm run dev
   
   # Logs Prisma en mode debug
   DEBUG=prisma:* npm run dev
   ```

2. **Consultez la documentation**:
   - `database_schemas.md` - Structure de la base de données
   - `README.md` - Guide de démarrage
   - [Documentation Prisma](https://www.prisma.io/docs)
   - [Documentation Supabase](https://supabase.com/docs)

3. **Réinitialisez la base de données** (dernier recours):
   ```bash
   # ATTENTION: Cela supprimera toutes les données!
   
   # 1. Sauvegardez vos données
   npx prisma db pull
   
   # 2. Réinitialisez
   npx prisma migrate reset
   
   # 3. Ressemez les données
   npx prisma db seed
   ```

---

## 📝 Résumé des Commandes

### Correction de la base de données
```bash
# Via Supabase SQL Editor
# Exécutez: scripts/sql/02-fix-order-table.sql

# OU via Prisma
npx prisma db push
npx prisma generate
```

### Vérification
```bash
# Diagnostic complet
# Exécutez dans Supabase: scripts/sql/01-diagnostic-database.sql

# Vérifier les images
tsx scripts/check-images.ts

# Health check
curl http://localhost:3000/api/health
```

### Démarrage de l'application
```bash
# Installer les dépendances
npm install

# Générer le client Prisma
npx prisma generate

# Démarrer en dev
npm run dev

# Accéder à l'application
# http://localhost:3000
```

---

## ✨ Conclusion

En suivant ce guide:
1. ✅ La base de données sera complète et fonctionnelle
2. ✅ Les images seront correctement affichées
3. ✅ Le checkout fonctionnera sans erreur
4. ✅ L'application sera stable et prête pour la production

**Temps estimé de correction**: 15-30 minutes

**Dernière mise à jour**: 2025-10-09
