# Scripts SQL de Diagnostic et Correction - FlawlessBeauty

Ce dossier contient des scripts SQL pour diagnostiquer et corriger les problèmes de base de données Supabase.

## 🔍 Problème Identifié

L'erreur rencontrée au checkout :
```
Invalid `prisma.order.create()` invocation:
The column `orderNumber` does not exist in the current database.
```

**Cause** : Le schéma Prisma définit des colonnes qui n'existent pas dans la base de données Supabase. Cela arrive quand les migrations Prisma n'ont pas été appliquées correctement.

## 📋 Scripts Disponibles

### 1. `01-diagnostic-database.sql` - Diagnostic Complet

**Objectif** : Analyser l'état actuel de votre base de données

**Ce qu'il fait** :
- Liste toutes les tables
- Vérifie la structure de la table `Order`
- Liste les contraintes et index
- Vérifie les clés étrangères
- Compte les enregistrements
- Vérifie les types ENUM
- Identifie les colonnes manquantes
- Affiche l'historique des migrations Prisma

**Comment l'utiliser** :
1. Connectez-vous à Supabase : https://app.supabase.com
2. Ouvrez votre projet FlawlessBeauty
3. Allez dans `SQL Editor`
4. Créez un nouveau query
5. Copiez-collez le contenu de ce script
6. Exécutez chaque requête une par une pour obtenir les informations

**Requêtes importantes** :
- **Requête 2** : Structure de la table Order (vérifiez si orderNumber existe)
- **Requête 7** : Liste des colonnes manquantes (❌ = manquante, ✅ = existe)
- **Requête 9** : Historique des migrations Prisma

### 2. `02-fix-order-table.sql` - Correction de la Table Order

**Objectif** : Ajouter automatiquement toutes les colonnes manquantes

**Ce qu'il fait** :
- Ajoute la colonne `orderNumber` avec des valeurs uniques
- Ajoute les colonnes du guest checkout (firstName, lastName, email, phone)
- Ajoute les colonnes d'adresse détaillée (ville, quartier, adresseDetaillee)
- Crée les types ENUM si nécessaires
- Ajoute les colonnes PayTech
- Vérifie et affiche le résultat final

**⚠️ IMPORTANT : Sauvegardez vos données avant** :
```sql
SELECT * INTO "Order_backup" FROM "Order";
```

**Comment l'utiliser** :
1. Ouvrez le `SQL Editor` de Supabase
2. Copiez-collez TOUT le script
3. Exécutez-le en une seule fois
4. Vérifiez les messages de confirmation

**Vérification après exécution** :
Le script affichera automatiquement toutes les colonnes de la table Order à la fin.

### 3. `03-reset-prisma-migrations.sql` - Réinitialisation (Avancé)

**Objectif** : Réinitialiser complètement la base de données

**⚠️ TRÈS DANGEREUX - Supprime toutes les données !**

**Options disponibles** :
- Option 1 : Reset complet (supprime tout)
- Option 2 : Reset uniquement la table Order
- Option 3 : Vérifier l'état des migrations

**Quand l'utiliser** :
- Uniquement en développement
- Si la corruption est trop importante
- Pour repartir de zéro

## 🚀 Guide de Résolution Étape par Étape

### Méthode 1 : Correction SQL Directe (Recommandé)

1. **Diagnostic** :
   ```bash
   # Exécutez 01-diagnostic-database.sql dans Supabase SQL Editor
   # Notez les colonnes manquantes
   ```

2. **Sauvegarde** :
   ```sql
   SELECT * INTO "Order_backup" FROM "Order";
   SELECT * INTO "OrderItem_backup" FROM "OrderItem";
   ```

3. **Correction** :
   ```bash
   # Exécutez 02-fix-order-table.sql dans Supabase SQL Editor
   ```

4. **Vérification** :
   ```sql
   SELECT column_name FROM information_schema.columns 
   WHERE table_name = 'Order' 
   ORDER BY column_name;
   ```

5. **Test** :
   - Retournez sur votre site
   - Testez le checkout
   - Vérifiez qu'il n'y a plus d'erreur

### Méthode 2 : Reset Prisma (Si Méthode 1 échoue)

1. **Backup complet** :
   ```bash
   # Depuis Supabase Dashboard > Settings > Database > Backups
   # Ou utilisez pg_dump si vous avez accès
   ```

2. **Reset local** :
   ```bash
   # Dans votre terminal, à la racine du projet
   npx prisma migrate reset
   ```

3. **Push vers Supabase** :
   ```bash
   npx prisma db push
   ```

4. **Vérification** :
   ```bash
   npx prisma studio
   # Vérifiez que toutes les tables sont correctes
   ```

5. **Re-seed** (si vous avez un script de seed) :
   ```bash
   npx prisma db seed
   ```

## 📊 Résultats Attendus

Après avoir exécuté `02-fix-order-table.sql`, vous devriez voir :

```
NOTICE: Colonne orderNumber ajoutée avec succès
NOTICE: Colonne firstName ajoutée
NOTICE: Colonne lastName ajoutée
NOTICE: Colonne email ajoutée
NOTICE: Colonne phone ajoutée
NOTICE: Colonne ville ajoutée
NOTICE: Colonne quartier ajoutée
NOTICE: Colonne adresseDetaillee ajoutée
NOTICE: Colonne orderNote ajoutée
...
```

Et la table finale devrait avoir **environ 30 colonnes**.

## 🔧 Commandes Prisma Utiles

```bash
# Vérifier l'état du schéma
npx prisma validate

# Voir le schéma actuel de la BD
npx prisma db pull

# Comparer schéma Prisma vs BD
npx prisma migrate status

# Générer le client Prisma
npx prisma generate

# Ouvrir Prisma Studio
npx prisma studio

# Push le schéma sans créer de migration
npx prisma db push

# Reset complet (⚠️ supprime les données)
npx prisma migrate reset
```

## ❓ FAQ

### Q: Pourquoi ces colonnes manquent-elles ?
R: Probablement parce que les migrations Prisma n'ont pas été exécutées sur Supabase, ou que le schéma a été modifié sans migration.

### Q: Vais-je perdre mes données ?
R: Non, le script `02-fix-order-table.sql` ajoute seulement les colonnes manquantes et préserve les données existantes. Mais faites quand même une sauvegarde !

### Q: Que faire si le script échoue ?
R: 
1. Vérifiez les messages d'erreur
2. Assurez-vous d'avoir les droits d'administration
3. Vérifiez que vous êtes connecté à la bonne base de données
4. Contactez le support si le problème persiste

### Q: Comment vérifier que tout fonctionne ?
R: Testez le checkout sur votre site. Si vous pouvez créer une commande sans erreur, c'est résolu !

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs d'erreur dans Supabase
2. Exécutez `01-diagnostic-database.sql` et partagez les résultats
3. Vérifiez que votre `DATABASE_URL` pointe vers Supabase
4. Assurez-vous que Prisma est à jour : `npm update prisma @prisma/client`

## 🎯 Prochaines Étapes

Après avoir corrigé la base de données :

1. **Testez le checkout complet**
2. **Vérifiez les autres fonctionnalités** (panier, commandes, etc.)
3. **Configurez les migrations automatiques** pour éviter ce problème à l'avenir
4. **Mettez en place une stratégie de backup régulière**

---

**Note** : Ces scripts sont spécifiquement conçus pour PostgreSQL/Supabase. Ne les utilisez pas sur d'autres types de bases de données.
