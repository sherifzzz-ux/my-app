# ⚡ Instructions Rapides - Résolution Erreur Checkout

## 🎯 Problème

```
Error: The column `orderNumber` does not exist in the current database.
```

## 🚀 Solution Rapide (5 minutes)

### Étape 1 : Ouvrir Supabase

1. Allez sur https://app.supabase.com
2. Ouvrez votre projet **FlawlessBeauty**
3. Cliquez sur **SQL Editor** dans le menu de gauche

### Étape 2 : Sauvegarder (Important !)

Créez un nouveau query et exécutez :

```sql
SELECT * INTO "Order_backup" FROM "Order";
```

### Étape 3 : Diagnostic

Créez un nouveau query et exécutez :

```sql
SELECT 
    CASE 
        WHEN column_name IS NULL THEN '❌ MANQUANTE'
        ELSE '✅ EXISTE'
    END AS status,
    expected_column
FROM (
    VALUES ('orderNumber'), ('firstName'), ('lastName'), ('email'), ('phone')
) AS expected(expected_column)
LEFT JOIN information_schema.columns c
    ON c.table_schema = 'public' 
    AND c.table_name = 'Order' 
    AND c.column_name = expected.expected_column;
```

**Si vous voyez des ❌ MANQUANTE**, passez à l'étape 4.

### Étape 4 : Correction

1. Ouvrez le fichier `scripts/sql/02-fix-order-table.sql`
2. Copiez **TOUT** le contenu
3. Collez dans un nouveau query dans Supabase
4. Cliquez sur **Run** (ou Ctrl+Enter)
5. Attendez les messages de confirmation

Vous devriez voir :
```
NOTICE: Colonne orderNumber ajoutée avec succès
NOTICE: Colonne firstName ajoutée
NOTICE: Colonne lastName ajoutée
...
```

### Étape 5 : Vérification

Exécutez :

```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'Order' 
  AND column_name = 'orderNumber';
```

**Si ça retourne un résultat** → ✅ C'est bon !

### Étape 6 : Test

1. Retournez sur votre site
2. Ajoutez un produit au panier
3. Allez au checkout
4. Essayez de passer une commande

**Si ça marche** → 🎉 Problème résolu !

## 📱 Alternative : Via Terminal

Si vous préférez le terminal :

```bash
# 1. Diagnostic automatique
./scripts/diagnose-db.sh

# 2. Push le schéma Prisma
npx prisma db push

# 3. Générer le client
npx prisma generate

# 4. Tester
npm run dev
```

## ❓ FAQ Express

**Q : Vais-je perdre mes données ?**  
R : Non, le script ajoute seulement les colonnes manquantes.

**Q : Combien de temps ça prend ?**  
R : Moins de 5 minutes si vous suivez les étapes.

**Q : Et si ça ne marche pas ?**  
R : Consultez le guide complet : `GUIDE-RESOLUTION-DB.md`

**Q : Les images 404 c'est grave ?**  
R : Non, c'est un problème séparé (images manquantes). Le checkout va fonctionner quand même.

## 🆘 Aide

Si vous êtes bloqué :

1. Lisez le guide complet : `GUIDE-RESOLUTION-DB.md`
2. Consultez la doc détaillée : `scripts/sql/README.md`
3. Vérifiez les logs dans Supabase

---

**Créé le** : 2025-10-09  
**Pour** : FlawlessBeauty - Erreur checkout Supabase
