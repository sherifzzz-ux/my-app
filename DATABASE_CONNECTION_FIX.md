# 🔧 Guide de Résolution - Problème de Connexion Base de Données

## 🚨 **Problème Identifié**
```
Error: P1001: Can't reach database server at `db.fjarsnhfbdmlqgyfjzvt.supabase.co:5432`
```

## 🎯 **Solutions à Essayer**

### **1. Vérifier la Configuration Supabase**

1. **Aller sur le dashboard Supabase** : https://supabase.com/dashboard
2. **Sélectionner votre projet**
3. **Aller dans Settings > Database**
4. **Copier la nouvelle URL de connexion** (elle peut avoir changé)

### **2. Mettre à Jour le Fichier .env**

Créer ou modifier le fichier `.env.local` dans le dossier `my-app/` :

```bash
# URL de connexion Supabase (remplacer par votre vraie URL)
DATABASE_URL="postgresql://postgres:[VOTRE_MOT_DE_PASSE]@db.[VOTRE_PROJECT_ID].supabase.co:5432/postgres"

# URL directe pour Prisma
DIRECT_URL="postgresql://postgres:[VOTRE_MOT_DE_PASSE]@db.[VOTRE_PROJECT_ID].supabase.co:5432/postgres"

# Autres variables d'environnement
NEXTAUTH_SECRET="votre-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### **3. Vérifier la Connexion**

```bash
cd my-app
npx prisma db push
```

### **4. Si la Connexion Fonctionne**

Exécuter le script de migration :

```bash
node scripts/add-display-settings.js
```

### **5. Alternative : Utiliser la Version Simple**

En attendant la résolution du problème de connexion, vous pouvez utiliser :

- **Page simple** : `/admin/products-simple`
- **Fonctionnalités** : Gestion des produits avec les champs existants
- **Limitations** : Pas de paramètres d'affichage avancés

## 🔍 **Diagnostic Avancé**

### **Vérifier la Connexion Manuelle**

```bash
# Tester la connexion PostgreSQL
psql "postgresql://postgres:[MOT_DE_PASSE]@db.[PROJECT_ID].supabase.co:5432/postgres"
```

### **Vérifier les Variables d'Environnement**

```bash
# Dans le dossier my-app
node -e "console.log(process.env.DATABASE_URL)"
```

## 🚀 **Une Fois la Connexion Résolue**

1. **Exécuter la migration** :
   ```bash
   npx prisma db push
   ```

2. **Ajouter les paramètres d'affichage** :
   ```bash
   node scripts/add-display-settings.js
   ```

3. **Utiliser les pages complètes** :
   - `/admin/products` - Gestion complète des produits
   - `/admin/product-display` - Contrôle de l'affichage

## 📞 **Support**

Si le problème persiste :
1. Vérifier que le projet Supabase est actif
2. Vérifier que l'IP n'est pas bloquée
3. Regenerer les clés API dans Supabase
4. Contacter le support Supabase si nécessaire

---

**Note** : La version simple fonctionne avec la structure actuelle de la base de données et permet de gérer les produits en attendant la résolution du problème de connexion.
