# 🚨 FIX URGENT: Erreur orderNumber au checkout

## Problème
```
Invalid `prisma.order.create()` invocation:
The column `orderNumber` does not exist in the current database.
```

## Solution Immédiate (2 minutes)

### Option 1: Script SQL Direct ⚡ (LE PLUS RAPIDE)

1. **Ouvrez votre client PostgreSQL** (pgAdmin, DBeaver, ou terminal psql)

2. **Copiez-collez et exécutez** le contenu de `scripts/quick-fix.sql`
   
   OU utilisez cette commande dans le terminal :
   ```bash
   psql $DATABASE_URL -f scripts/quick-fix.sql
   ```

3. **C'est fait !** Le checkout devrait fonctionner immédiatement.

### Option 2: Migration Prisma (SI VOUS AVEZ ACCÈS LOCAL)

```bash
# 1. Assurez-vous d'avoir la DATABASE_URL dans votre .env
export DATABASE_URL="postgresql://..."

# 2. Exécutez la migration
npx prisma migrate deploy

# 3. Redémarrez votre application
```

### Option 3: Via Vercel (SI DÉPLOYÉ SUR VERCEL)

```bash
# 1. Récupérez les variables d'environnement
vercel env pull .env.local

# 2. Exécutez la migration
npx prisma migrate deploy
```

## Vérification

Après avoir exécuté le fix, vérifiez que tout fonctionne :

1. **Testez le checkout** : Créez une nouvelle commande
2. **Vérifiez dans la base** :
   ```sql
   SELECT orderNumber, firstName, email FROM "Order" LIMIT 5;
   ```

## Ce que fait le fix

Le script ajoute :
- ✅ Colonne `orderNumber` (unique, auto-généré)
- ✅ Champs client requis (firstName, lastName, email, phone, etc.)
- ✅ Champs de livraison (ville, quartier, adresseDetaillee)
- ✅ Support du guest checkout (userId nullable)
- ✅ Enums PaymentMethod, PaymentStatus, ShippingZone
- ✅ Tables UserFavorite et DeliveryZone

## Commandes existantes

Les commandes existantes reçoivent automatiquement :
- Un orderNumber généré (format: `ORD-xxxxx`)
- Des valeurs par défaut pour les champs manquants

## Support

Si l'erreur persiste après le fix :

1. **Vérifiez les logs** :
   ```bash
   vercel logs
   ```

2. **Régénérez le client Prisma** :
   ```bash
   npx prisma generate
   ```

3. **Redéployez** :
   ```bash
   vercel --prod
   ```

## Fichiers créés

- ✅ `scripts/quick-fix.sql` - Script SQL à exécuter directement
- ✅ `scripts/apply-migration.sh` - Script bash automatisé
- ✅ `prisma/migrations/20251009000000_add_order_number_and_guest_checkout/migration.sql` - Migration Prisma complète
- ✅ `MIGRATION_FIX.md` - Documentation détaillée

## Prochaines étapes

Après le fix :
1. Testez le checkout complet (guest + utilisateur connecté)
2. Vérifiez l'affichage des commandes dans l'admin
3. Testez tous les moyens de paiement (Orange Money, Wave, CB, Cash on Delivery)

---

**Note:** Ce fix est sûr et n'affectera pas les commandes existantes. Il ajoute simplement les colonnes manquantes avec des valeurs par défaut appropriées.
