# ⚡ CORRECTION RAPIDE - FlawlessBeauty

**Vous avez une erreur "orderNumber does not exist" ?**  
**Suivez ces 3 étapes simples !**

---

## 🚨 Erreur Détectée

```
Invalid `prisma.order.create()` invocation:
The column `orderNumber` does not exist in the current database.
```

---

## ✅ Solution en 3 Étapes (5 minutes)

### Étape 1: Vérifiez votre DATABASE_URL
```bash
# Vérifiez que DATABASE_URL est définie
echo $DATABASE_URL

# Si vide, exportez-la
export DATABASE_URL="postgresql://..."
```

---

### Étape 2: Exécutez le Script de Correction ⭐
```bash
# Correction automatique en 1 commande
./scripts/fix-database-auto.sh
```

**C'est tout !** Le script fait automatiquement:
- ✅ Diagnostic de la base de données
- ✅ Sauvegarde de sécurité
- ✅ Ajout des 23 colonnes manquantes
- ✅ Création des ENUMs
- ✅ Vérification finale
- ✅ Régénération du client Prisma

---

### Étape 3: Redémarrez l'Application
```bash
npm run dev
```

**Testez**: Accédez au checkout, il devrait fonctionner ! 🎉

---

## 📱 Alternative: Via Supabase (Interface Graphique)

Si vous préférez l'interface graphique:

1. **Ouvrez Supabase SQL Editor**
   - Allez sur votre projet Supabase
   - Cliquez sur "SQL Editor"

2. **Exécutez le Script**
   - Ouvrez le fichier `scripts/sql/02-fix-order-table.sql`
   - Copiez tout le contenu
   - Collez dans SQL Editor
   - Cliquez sur "Run"

3. **Vérifiez**
   - Le script affiche des messages "NOTICE" pour chaque colonne ajoutée
   - Vérifiez qu'il affiche "29 colonnes" à la fin

4. **Régénérez Prisma**
   ```bash
   npx prisma generate
   ```

5. **Redémarrez**
   ```bash
   npm run dev
   ```

---

## 🎯 Résultat Attendu

### Avant la Correction ❌
```
Table Order: 6 colonnes
Erreur: orderNumber does not exist
Checkout: Bloqué
```

### Après la Correction ✅
```
Table Order: 29 colonnes
Erreur: Aucune
Checkout: Fonctionnel
```

---

## 🔍 Vérification

### Comment savoir si c'est corrigé ?

**Test 1: Vérification Base de Données**
```bash
psql $DATABASE_URL -f scripts/sql/01-diagnostic-database.sql
```

Cherchez la section 7:
- ✅ Si toutes les colonnes affichent "✅ EXISTE" → C'est bon !
- ❌ Si certaines affichent "❌ MANQUANTE" → Relancez l'étape 2

**Test 2: Vérification Application**
```bash
# Démarrer l'application
npm run dev

# Aller sur http://localhost:3000
# Ajouter un produit au panier
# Aller au checkout
# Remplir le formulaire

# Si aucune erreur n'apparaît dans la console → C'est bon !
```

---

## 🐛 Problèmes Courants

### "DATABASE_URL not found"
```bash
# Ajoutez DATABASE_URL dans .env.local
echo 'DATABASE_URL="postgresql://..."' >> .env.local

# Ou exportez temporairement
export DATABASE_URL="postgresql://..."
```

### "Permission denied on script"
```bash
# Rendez le script exécutable
chmod +x scripts/fix-database-auto.sh
```

### "psql: command not found"
**Solution 1**: Utilisez Supabase SQL Editor (voir alternative ci-dessus)

**Solution 2**: Installez PostgreSQL client
```bash
# Ubuntu/Debian
sudo apt install postgresql-client

# macOS
brew install postgresql
```

---

## 📚 Pour Aller Plus Loin

Une fois la correction effectuée, consultez:

1. **`database_schemas.md`**
   - Structure complète de la base de données
   - Documentation de toutes les tables

2. **`GUIDE_CORRECTION_ERREURS.md`**
   - Guide détaillé de correction
   - Prévention des erreurs futures
   - Multiples méthodes de correction

3. **`scripts/sql/README.md`**
   - Documentation des scripts SQL
   - Guide d'utilisation avancé

---

## 💡 En Résumé

```bash
# Correction en 1 ligne
./scripts/fix-database-auto.sh && npm run dev
```

**Temps de correction**: 2-5 minutes  
**Difficulté**: 🟢 Facile  
**Résultat**: ✅ Application fonctionnelle

---

## 📞 Besoin d'Aide ?

Si le problème persiste:

1. Vérifiez les logs du script
2. Consultez `GUIDE_CORRECTION_ERREURS.md` pour plus de détails
3. Exécutez le diagnostic: `psql $DATABASE_URL -f scripts/sql/01-diagnostic-database.sql`

---

**Dernière mise à jour**: 2025-10-09
