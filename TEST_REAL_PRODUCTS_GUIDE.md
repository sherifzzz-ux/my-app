# 🧪 Guide de Test - Produits Réels de la Base de Données

## ✅ **Modifications Effectuées**

### **1. Suppression des Données Mockées**
- ✅ Supprimé toutes les données mockées (`mockCategories`, `mockBrands`)
- ✅ L'interface utilise maintenant uniquement les vraies données de Supabase

### **2. APIs Corrigées**
- ✅ APIs mises à jour pour correspondre au schéma Prisma
- ✅ Ajout des champs `categoryId`, `subcategoryId`, `brandId` dans les requêtes
- ✅ Gestion d'erreurs améliorée

### **3. Interface Optimisée**
- ✅ Chargement direct depuis Supabase
- ✅ Messages d'erreur clairs
- ✅ Logs de debug pour diagnostiquer les problèmes

## 🔍 **Vérification de la Base de Données**

### **Étape 1 : Vérifier la Structure de la Table Product**

Exécutez ce script dans Supabase :

```sql
-- Vérifier la structure de la table Product
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'Product' 
ORDER BY ordinal_position;
```

**Résultat attendu :**
- `id` (text, NOT NULL)
- `name` (text, NOT NULL)
- `description` (text, nullable)
- `priceCents` (integer, NOT NULL)
- `oldPriceCents` (integer, nullable)
- `imageUrl` (text, nullable)
- `isFeatured` (boolean, NOT NULL)
- `stock` (integer, NOT NULL)
- `rating` (numeric, nullable)
- `categoryId` (text, NOT NULL)
- `subcategoryId` (text, nullable)
- `brandId` (text, nullable)
- `createdAt` (timestamp, NOT NULL)
- `updatedAt` (timestamp, NOT NULL)

### **Étape 2 : Vérifier les Relations**

```sql
-- Vérifier les contraintes de clé étrangère
SELECT 
    tc.constraint_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name = 'Product';
```

### **Étape 3 : Ajouter des Produits de Test**

Si vous n'avez pas encore de produits, exécutez le script `scripts/add-test-products.sql` :

```sql
-- Ce script ajoutera 12 produits de test dans différentes catégories
-- Assurez-vous d'avoir les catégories, sous-catégories et marques créées
```

## 🚀 **Test de l'Interface**

### **1. Démarrer le Serveur**

```bash
cd my-app
npm run dev
```

### **2. Accéder à l'Interface d'Administration**

Allez sur : `http://localhost:3000/admin/products`

### **3. Vérifications à Effectuer**

#### **A. Chargement des Données**
- ✅ Les catégories s'affichent dans le sélecteur
- ✅ Les sous-catégories apparaissent quand vous sélectionnez une catégorie
- ✅ Les marques s'affichent dans le sélecteur
- ✅ Les produits existants s'affichent dans la liste

#### **B. Création d'un Nouveau Produit**
1. Cliquez sur "Nouveau Produit"
2. Remplissez les champs :
   - **Nom** : "Test Produit"
   - **Catégorie** : Sélectionnez une catégorie
   - **Sous-catégorie** : Devrait se remplir automatiquement
   - **Marque** : Sélectionnez une marque
   - **Prix** : 2500 (25,00€)
   - **Stock** : 10
3. Cliquez sur "Créer"
4. Vérifiez que le produit apparaît dans la liste

#### **C. Modification d'un Produit**
1. Cliquez sur l'icône "Modifier" d'un produit
2. Modifiez le nom ou le prix
3. Cliquez sur "Mettre à jour"
4. Vérifiez que les changements sont sauvegardés

#### **D. Filtres et Recherche**
1. Utilisez la barre de recherche
2. Filtrez par catégorie
3. Filtrez par sous-catégorie
4. Filtrez par marque
5. Filtrez par stock

## 🔧 **Diagnostic des Problèmes**

### **Si les Produits ne s'Affichent Pas**

1. **Vérifiez la Console du Navigateur** (F12)
   - Regardez les logs : "Produits chargés: X"
   - Vérifiez s'il y a des erreurs d'API

2. **Testez les APIs Directement**
   - `http://localhost:3000/api/admin/products-supabase`
   - `http://localhost:3000/api/admin/taxonomy-supabase`

3. **Vérifiez la Base de Données**
   - Exécutez : `SELECT COUNT(*) FROM "Product";`
   - Vérifiez que les relations sont correctes

### **Si les Sous-catégories ne s'Affichent Pas**

1. **Vérifiez les Relations**
   ```sql
   SELECT 
       c.name as category,
       s.name as subcategory
   FROM "Category" c
   LEFT JOIN "Subcategory" s ON c.id = s."categoryId"
   ORDER BY c.name, s.name;
   ```

2. **Vérifiez l'API Taxonomy**
   - Testez : `http://localhost:3000/api/admin/taxonomy-supabase`
   - Vérifiez que les sous-catégories sont incluses dans les catégories

## 📊 **Résultats Attendus**

Après avoir suivi ce guide, vous devriez avoir :

- ✅ **Interface fonctionnelle** avec les vraies données
- ✅ **Produits affichés** selon leur catégorie et sous-catégorie
- ✅ **Création/modification** de produits qui fonctionne
- ✅ **Filtres et recherche** opérationnels
- ✅ **Aucune donnée mockée** dans l'interface

## 🎯 **Prochaines Étapes**

Une fois que tout fonctionne :

1. **Ajoutez vos vrais produits** via l'interface
2. **Configurez les images** des produits
3. **Testez toutes les fonctionnalités** de gestion
4. **Personnalisez l'interface** selon vos besoins

---

**Note** : Si vous rencontrez des problèmes, partagez les logs de la console du navigateur et les erreurs éventuelles pour un diagnostic plus précis.
