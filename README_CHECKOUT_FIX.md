# 🔧 Fix Checkout - Erreur orderNumber

## 🚨 Problème
Le checkout échoue avec l'erreur : **"The column orderNumber does not exist in the current database"**

## ✅ Solution (30 secondes)

### Exécutez ce script SQL dans votre base PostgreSQL :

```sql
-- Ajouter orderNumber à la table Order
ALTER TABLE "public"."Order" ADD COLUMN IF NOT EXISTS "orderNumber" TEXT;

-- Générer des orderNumbers pour les commandes existantes
UPDATE "public"."Order" 
SET "orderNumber" = 'ORD-' || SUBSTRING(gen_random_uuid()::text, 1, 12)
WHERE "orderNumber" IS NULL;

-- Rendre orderNumber obligatoire et unique
ALTER TABLE "public"."Order" ALTER COLUMN "orderNumber" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "Order_orderNumber_key" ON "public"."Order"("orderNumber");
```

**OU** utilisez le script complet :
```bash
psql $DATABASE_URL -f scripts/quick-fix.sql
```

## 📚 Documentation complète

- **Fix rapide** : `URGENT_FIX.md` 
- **Migration Prisma** : `MIGRATION_FIX.md`
- **Script SQL complet** : `scripts/quick-fix.sql`
- **Script automatisé** : `scripts/apply-migration.sh`

## 🧪 Test

Après le fix, testez le checkout :
1. Ajoutez des produits au panier
2. Procédez au checkout
3. Vérifiez que la commande est créée avec un orderNumber

## ℹ️ Fichiers image manquants

Les erreurs 404 pour les images (`shampoing.jpg`, `fond-teint.jpg`, `vitamines.jpg`) sont séparées. Ces images doivent être ajoutées dans `/public/images/`.

---

**Temps estimé de résolution** : 1-2 minutes
