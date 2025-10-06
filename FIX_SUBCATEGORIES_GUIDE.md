# 🔧 Guide de Résolution - Sous-catégories ne s'affichent pas

## 🎯 **Problème Identifié**

Quand vous choisissez une catégorie dans le formulaire de produit, les sous-catégories associées ne s'affichent pas dans le sélecteur.

## 🔍 **Causes Possibles**

### **1. Base de données vide**
- Aucune catégorie ou sous-catégorie dans la base de données
- Relations entre catégories et sous-catégories manquantes

### **2. Problème de connexion à la base de données**
- Variables d'environnement manquantes
- Base de données non accessible
- Schéma Prisma non synchronisé

### **3. Problème dans les APIs**
- API `/api/admin/taxonomy` qui ne retourne pas les bonnes données
- Données mal formatées

## 🛠️ **Solutions**

### **Étape 1 : Vérifier la connexion à la base de données**

```bash
# Dans le dossier my-app
npx prisma db push
```

Si cette commande échoue, vérifiez votre fichier `.env` :
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
DIRECT_URL="postgresql://username:password@localhost:5432/database_name"
```

### **Étape 2 : Vérifier les données existantes**

```bash
# Exécuter le script de vérification
node scripts/check-database-data.js
```

### **Étape 3 : Créer des données de test**

Si aucune donnée n'existe, le script créera automatiquement :
- 5 catégories principales
- 10 sous-catégories
- 5 marques

### **Étape 4 : Tester les APIs**

Ouvrez votre navigateur et testez ces URLs (après avoir démarré le serveur) :

1. **API Taxonomy** : `http://localhost:3000/api/admin/taxonomy`
   - Devrait retourner : `{ categories: [...], subcategories: [...], brands: [...] }`

2. **API Brands** : `http://localhost:3000/api/admin/brands`
   - Devrait retourner : `[{ id, name, slug }, ...]`

### **Étape 5 : Vérifier la console du navigateur**

1. Allez sur `/admin/products`
2. Ouvrez les outils de développement (F12)
3. Regardez l'onglet Console
4. Cliquez sur "Nouveau Produit"
5. Sélectionnez une catégorie
6. Vérifiez les logs dans la console

Vous devriez voir :
```
Données de taxonomie chargées: { categories: [...], subcategories: [...], brands: [...] }
Catégorie sélectionnée: [ID]
Catégorie trouvée: { id, name, subcategories: [...] }
Sous-catégories: [...]
```

## 🔧 **Solutions Alternatives**

### **Solution 1 : Données Mockées (Temporaire)**

Si la base de données ne fonctionne pas, nous pouvons utiliser des données mockées :

```javascript
// Dans app/admin/products/page.tsx
const mockCategories = [
  {
    id: '1',
    name: 'Soin du visage',
    slug: 'soin-du-visage',
    subcategories: [
      { id: '1-1', name: 'Nettoyants', slug: 'nettoyants', categoryId: '1' },
      { id: '1-2', name: 'Hydratants', slug: 'hydratants', categoryId: '1' },
      { id: '1-3', name: 'Protection solaire', slug: 'protection-solaire', categoryId: '1' }
    ]
  }
  // ... autres catégories
];
```

### **Solution 2 : Vérification Manuelle**

1. **Vérifiez le fichier `.env`** dans le dossier `my-app`
2. **Redémarrez le serveur** : `npm run dev`
3. **Vérifiez les logs** dans la console du navigateur
4. **Testez les APIs** directement dans le navigateur

## 🚨 **Problèmes Courants**

### **Erreur : "Can't reach database server"**
- Vérifiez que PostgreSQL est démarré
- Vérifiez les credentials dans `.env`
- Vérifiez que la base de données existe

### **Erreur : "Unknown argument displaySettings"**
- Exécutez `npx prisma db push` pour synchroniser le schéma
- Redémarrez le serveur

### **APIs retournent des erreurs 401/403**
- Vérifiez que vous êtes connecté en tant qu'admin
- Vérifiez la configuration d'authentification

## 📞 **Support**

Si le problème persiste :

1. **Partagez les logs de la console** du navigateur
2. **Partagez les erreurs** de la base de données
3. **Vérifiez** que toutes les étapes ci-dessus ont été suivies

---

**Note** : Une fois la base de données configurée, le système fonctionnera parfaitement avec toutes les fonctionnalités de gestion des produits, catégories, sous-catégories et marques.
