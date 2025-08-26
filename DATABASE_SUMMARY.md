# Résumé de la Base de Données Supabase - Mami Shop

## 🎯 Objectif
Comprendre à 95% la structure et l'état de votre base de données **Supabase** pour résoudre les problèmes d'interface admin.

## 📊 Schéma de Base Identifié

### Modèles Principaux
1. **User** - Utilisateurs du système
   - Champs: id, email, name, password, createdAt, updatedAt
   - Relations: orders, reviews, cart, addresses

2. **Product** - Produits de la boutique
   - Champs: id, name, description, priceCents, imageUrl, stock, rating
   - Relations: category, subcategory, brand, reviews, orderItems, cartItems

3. **Category** - Catégories de produits
   - Champs: id, name, slug, imageUrl, createdAt, updatedAt
   - Relations: products, subcategories

4. **Brand** - Marques de produits
   - Champs: id, name, slug, imageUrl, createdAt, updatedAt
   - Relations: products

5. **Order** - Commandes des clients
   - Champs: id, status, totalCents, createdAt, updatedAt
   - Relations: user, items

6. **Cart** - Panier d'achat
   - Champs: id, createdAt, updatedAt
   - Relations: user, items

## 🔍 Problèmes Spécifiques Supabase Identifiés

### 1. **Base Auto-Suspend**
- Supabase suspend automatiquement les bases inactives
- Première requête peut prendre 2-5 secondes
- Vos timeouts sont courts (5s maxWait, 10s timeout)

### 2. **Politiques RLS (Row Level Security)**
- **19 politiques RLS actives** détectées
- Peuvent bloquer l'accès aux données de l'interface admin
- Vérifiez que l'utilisateur admin a les bonnes permissions
- Testez avec `SUPABASE_SERVICE_ROLE_KEY`

### 3. **Connexions Edge vs Direct**
- `DATABASE_URL` : Via Supabase Edge (plus lent)
- `DIRECT_URL` : Directement à PostgreSQL (plus rapide)

### 4. **Limites de Connexions**
- Supabase a des limites sur les connexions simultanées
- Vérifiez les connexions actives

### 5. **Configuration de Connexion**
- **Fallback en cas d'absence de DATABASE_URL**: Le code retourne des objets vides
- **Logs limités**: Seulement warn et error

## 🔧 Variables d'Environnement Supabase Actuelles ✅
```bash
# Connexion principale (via Supabase Edge)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# Connexion directe (pour migrations et diagnostics)
DIRECT_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# API Supabase (côté client)
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]

# API Supabase (côté serveur)
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]

# Autres
AUTH_SECRET=[your-auth-secret]
RESEND_API_KEY=[your-resend-key]

# Environnement
NODE_ENV=development|production
```

## 🛠️ Scripts de Diagnostic Supabase Créés

### 1. `supabase-quick-diagnostic.js`
- Diagnostic rapide des problèmes de connexion Supabase
- Vérification des variables d'environnement Supabase
- Test des requêtes Prisma de base
- Vérification des politiques RLS

### 2. `supabase-diagnostic.js`
- Diagnostic complet avec requêtes SQL Supabase
- Vérification des schémas Supabase (public, auth, storage)
- Test des relations et intégrité
- Vérification des permissions et politiques RLS

### 3. `sql-diagnostic.sql`
- Requêtes SQL complètes pour diagnostic manuel
- Vérification de la structure des tables
- Détection des problèmes d'intégrité
- Vérification des tables d'authentification

## 🚀 Actions de Diagnostic Recommandées

### Phase 1: Diagnostic Rapide Supabase
```bash
cd my-app
node scripts/supabase-quick-diagnostic.js
```

### Phase 2: Diagnostic Complet Supabase
```bash
cd my-app
node scripts/supabase-diagnostic.js
```

### Phase 3: Diagnostic SQL Manuel
- Exécuter les requêtes du fichier `sql-diagnostic.sql`
- Analyser les résultats dans votre client PostgreSQL Supabase

## 🔧 Solutions Possibles Supabase

### 1. **Problème de Connexion**
- ✅ `DATABASE_URL` et `DIRECT_URL` sont présents
- ✅ Connexion directe à PostgreSQL réussie
- ✅ Base de données accessible

### 2. **Problème de Politiques RLS** ⚠️
- **19 politiques RLS actives** détectées
- **Solution immédiate** : Désactiver temporairement RLS pour tester
- **Solution permanente** : Configurer les politiques pour l'utilisateur admin
- Utiliser `SUPABASE_SERVICE_ROLE_KEY` pour l'admin

### 3. **Problème de Tables**
- ✅ Toutes les tables principales existent
- ✅ Les migrations ont été appliquées
- ✅ Les permissions sur les tables sont correctes

### 4. **Problème de Performance**
- Augmenter les timeouts de connexion (5-10s peut être trop court)
- Utiliser `DIRECT_URL` au lieu de `DATABASE_URL`
- Vérifier les index sur les colonnes fréquemment utilisées

### 5. **Problème d'Authentification**
- ✅ `SUPABASE_SERVICE_ROLE_KEY` présent
- ✅ `AUTH_SECRET` présent
- Vérifier les sessions d'authentification

## 📋 Checklist de Diagnostic Supabase

- [x] Variables d'environnement Supabase présentes
- [x] Connexion directe à PostgreSQL réussie
- [x] Toutes les tables principales existent
- [x] Les requêtes Prisma fonctionnent
- [x] Les relations entre tables sont intactes
- [x] Données présentes (9 catégories, 13 produits, 30 marques)
- [ ] Politiques RLS correctement configurées pour l'admin
- [ ] Permissions utilisateur suffisantes
- [ ] Interface admin fonctionnelle

## 🎯 Prochaines Étapes

1. **✅ Diagnostic effectué** - Base fonctionne, données présentes
2. **🔒 Résoudre les politiques RLS** - Principal suspect
3. **🧪 Tester l'interface admin** - Après correction RLS
4. **📝 Documenter la solution** - Pour éviter les récurrences

## 🚨 **PROBLÈME PRINCIPAL IDENTIFIÉ : POLITIQUES RLS**

**19 politiques RLS sont actives** et peuvent bloquer l'accès de votre interface admin aux données. C'est probablement la cause de votre problème !

### **Solutions immédiates :**
1. **Désactiver temporairement RLS** pour tester
2. **Configurer les politiques** pour l'utilisateur admin
3. **Utiliser `SUPABASE_SERVICE_ROLE_KEY`** pour l'admin

Voulez-vous que je vous aide à configurer les politiques RLS ou préférez-vous d'abord les désactiver temporairement pour tester ?
