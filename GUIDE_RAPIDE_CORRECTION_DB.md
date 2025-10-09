# 🚀 Guide rapide : Corriger la base de données

## ⏱️ Temps estimé : 5 minutes

---

## 🎯 Objectif

Résoudre l'erreur :
```
Error: The column `orderNumber` does not exist in the current database.
```

---

## 📝 Étapes à suivre

### 1️⃣ Ouvrir Supabase (1 min)

1. Aller sur [app.supabase.com](https://app.supabase.com)
2. Sélectionner le projet FlawlessBeauty
3. Cliquer sur **"SQL Editor"** dans la barre latérale

### 2️⃣ Exécuter le script de correction (2 min)

1. Dans le SQL Editor, créer une nouvelle requête
2. Copier **TOUT** le contenu du fichier :
   ```
   scripts/sql/02-fix-order-table.sql
   ```
3. Coller dans l'éditeur Supabase
4. Cliquer sur **"Run"** (ou `Ctrl+Enter`)
5. Attendre le message de succès :
   ```
   ✅ Migration terminée avec succès !
   📊 Nombre total de colonnes dans Order : 29
   ```

### 3️⃣ Vérifier la correction (1 min)

1. Créer une nouvelle requête dans le SQL Editor
2. Copier le contenu du fichier :
   ```
   scripts/sql/03-verify-order-table.sql
   ```
3. Coller et exécuter
4. Vérifier le message :
   ```
   ✅ Toutes les colonnes requises sont présentes !
   🚀 La table Order est prête pour le checkout PayTech
   ```

### 4️⃣ Régénérer Prisma (1 min)

Dans votre terminal local :

```bash
# Régénérer le client Prisma
npx prisma generate

# Redémarrer le serveur
npm run dev
```

---

## ✅ Vérification finale

Tester le checkout :

1. Aller sur [http://localhost:3000](http://localhost:3000)
2. Ajouter des produits au panier
3. Cliquer sur "Commander"
4. ✅ L'erreur `orderNumber does not exist` devrait être **résolue**

---

## 🆘 En cas de problème

### Erreur : "permission denied"
```bash
# Vous devez être connecté en tant qu'admin Supabase
# Vérifier vos droits dans le dashboard
```

### Erreur : "type already exists"
```bash
# C'est normal ! Le script gère les doublons
# Continuer l'exécution
```

### Le checkout ne fonctionne toujours pas
```bash
# 1. Vérifier que vous avez bien exécuté 02-fix-order-table.sql
# 2. Vérifier que npx prisma generate a bien fonctionné
# 3. Redémarrer le serveur : npm run dev
# 4. Vider le cache du navigateur : Ctrl+Shift+R
```

---

## 📚 Documentation complète

Pour plus de détails, consulter :

- 📄 **SOLUTIONS_IMPLEMENTEES.md** - Résumé complet des solutions
- 📄 **TROUBLESHOOTING.md** - Guide de dépannage
- 📄 **database_schemas.md** - Structure de la base de données
- 📄 **scripts/sql/README.md** - Guide des scripts SQL

---

## 🎉 C'est tout !

Après ces 4 étapes, votre base de données sera corrigée et le checkout fonctionnel.

**Temps total : 5 minutes** ⏱️

---

**Besoin d'aide ?** Consulter le fichier `TROUBLESHOOTING.md`
