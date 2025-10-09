# Structure de la Base de Données - FlawlessBeauty

## Diagnostic de la Base de Données

### Tables Existantes

| Table | Type | Nombre de Colonnes | Contraintes |
|-------|------|-------------------|-------------|
| Address | BASE TABLE | 110 | 3 |
| Brand | BASE TABLE | 36 | 2 |
| Cart | BASE TABLE | 24 | 3 |
| CartItem | BASE TABLE | 28 | 3 |
| Category | BASE TABLE | 36 | 2 |
| Order | BASE TABLE | 48 | 3 |
| OrderItem | BASE TABLE | 40 | 3 |
| Product | BASE TABLE | 168 | 3 |
| Review | BASE TABLE | 48 | 3 |
| Subcategory | BASE TABLE | 24 | 3 |
| User | BASE TABLE | 30 | 2 |
| contact_messages | BASE TABLE | 48 | 2 |
| newsletter_subscribers | BASE TABLE | 20 | 3 |
| order_items | BASE TABLE | 100 | 3 |
| orders | BASE TABLE | 112 | 4 |
| profiles | BASE TABLE | 21 | 3 |
| shipping_methods | BASE TABLE | 32 | 2 |
| user_addresses | BASE TABLE | 80 | 3 |
| user_favorites | BASE TABLE | 28 | 4 |
| user_roles | BASE TABLE | 28 | 4 |
| user_suspensions | BASE TABLE | 56 | 4 |

### Données Actuelles

| Table | Nombre d'enregistrements |
|-------|-------------------------|
| Brand | 30 |
| Cart | 3 |
| CartItem | 0 |
| Category | 10 |
| Order | 0 |
| OrderItem | 0 |
| Product | 16 |
| Subcategory | 46 |
| User | 3 |

## Structure de la Table Order (ACTUELLE)

### Colonnes Existantes

| Colonne | Type | Longueur Max | Défaut | Nullable |
|---------|------|-------------|--------|----------|
| id | text | null | null | NO |
| status | OrderStatus (ENUM) | null | 'PENDING' | NO |
| totalCents | integer | null | 0 | NO |
| createdAt | timestamp | null | CURRENT_TIMESTAMP | NO |
| updatedAt | timestamp | null | null | NO |
| userId | text | null | null | NO |

### Contraintes

| Nom | Type | Colonne |
|-----|------|---------|
| Order_pkey | PRIMARY KEY | id |
| Order_userId_fkey | FOREIGN KEY | userId → User.id |

### Enum OrderStatus

- PENDING
- PAID
- SHIPPED
- CANCELLED

## 🚨 PROBLÈME IDENTIFIÉ : Colonnes Manquantes dans Order

### Colonnes Manquantes (24 colonnes)

❌ **Informations de Base**
- `orderNumber` - **CRITIQUE** (cause l'erreur actuelle)
- `email`
- `firstName`
- `lastName`
- `phone`

❌ **Informations Guest Checkout**
- `guestEmail`
- `guestName`
- `guestPhone`

❌ **Informations d'Adresse**
- `shippingAddress`
- `shippingName`
- `shippingPhone`
- `shippingCity`
- `ville`
- `quartier`
- `adresseDetaillee`

❌ **Informations de Livraison**
- `shippingZone`
- `shippingCents`
- `shippingFees`

❌ **Informations de Paiement**
- `paymentMethod`
- `paymentStatus`
- `paytechRef`
- `paytechToken`

❌ **Autres**
- `subtotalCents`
- `orderNote`

## Impact de l'Erreur

L'erreur actuelle provient de la tentative de créer une commande avec la colonne `orderNumber` qui n'existe pas :

```
Invalid `prisma.order.create()` invocation:
The column `orderNumber` does not exist in the current database.
```

Cette erreur bloque complètement le processus de checkout et empêche les utilisateurs de passer des commandes.

## Solution Requise

Il faut exécuter un script SQL ALTER TABLE pour ajouter toutes les colonnes manquantes à la table Order avec les types et contraintes appropriés.

---

## Structure de la Table Order (APRÈS CORRECTION)

### Colonnes Complètes (30 colonnes)

#### Colonnes Existantes (6)
| Colonne | Type | Nullable | Défaut | Description |
|---------|------|----------|--------|-------------|
| id | text | NO | null | Identifiant unique |
| status | OrderStatus | NO | 'PENDING' | Statut de la commande |
| totalCents | integer | NO | 0 | Montant total en centimes |
| createdAt | timestamp | NO | CURRENT_TIMESTAMP | Date de création |
| updatedAt | timestamp | NO | null | Date de mise à jour |
| userId | text | NO | null | ID de l'utilisateur |

#### Colonnes à Ajouter (24)

**Informations de Base**
| Colonne | Type | Nullable | Défaut | Description |
|---------|------|----------|--------|-------------|
| orderNumber | text | NO | null | Numéro de commande unique (ORD-YYYYMMDD-XXXXXX) |
| email | text | YES | null | Email du client |
| firstName | text | YES | null | Prénom du client |
| lastName | text | YES | null | Nom du client |
| phone | text | YES | null | Téléphone du client |

**Guest Checkout**
| Colonne | Type | Nullable | Défaut | Description |
|---------|------|----------|--------|-------------|
| guestEmail | text | YES | null | Email du guest (commande sans compte) |
| guestName | text | YES | null | Nom complet du guest |
| guestPhone | text | YES | null | Téléphone du guest |

**Adresse de Livraison**
| Colonne | Type | Nullable | Défaut | Description |
|---------|------|----------|--------|-------------|
| shippingAddress | text | YES | null | Adresse de livraison complète |
| shippingName | text | YES | null | Nom du destinataire |
| shippingPhone | text | YES | null | Téléphone du destinataire |
| shippingCity | text | YES | null | Ville de livraison |
| ville | text | YES | null | Ville (champ alternatif) |
| quartier | text | YES | null | Quartier |
| adresseDetaillee | text | YES | null | Adresse détaillée |

**Livraison**
| Colonne | Type | Nullable | Défaut | Description |
|---------|------|----------|--------|-------------|
| shippingZone | text | YES | null | Zone de livraison (Dakar, Thiès, Autres) |
| shippingCents | integer | YES | 0 | Frais de livraison en centimes |
| shippingFees | decimal(10,2) | YES | 0 | Frais de livraison (format décimal) |

**Paiement**
| Colonne | Type | Nullable | Défaut | Description |
|---------|------|----------|--------|-------------|
| paymentMethod | text | YES | null | Méthode de paiement (Orange Money, Wave, CB) |
| paymentStatus | text | YES | null | Statut du paiement |
| paytechRef | text | YES | null | Référence PayTech |
| paytechToken | text | YES | null | Token PayTech |

**Autres**
| Colonne | Type | Nullable | Défaut | Description |
|---------|------|----------|--------|-------------|
| subtotalCents | integer | YES | 0 | Sous-total en centimes (avant frais de livraison) |
| orderNote | text | YES | null | Note de commande du client |

### Contraintes (Après Correction)

| Nom | Type | Colonne | Description |
|-----|------|---------|-------------|
| Order_pkey | PRIMARY KEY | id | Clé primaire |
| Order_userId_fkey | FOREIGN KEY | userId → User.id | Relation utilisateur |
| Order_orderNumber_key | UNIQUE | orderNumber | Unicité du numéro de commande |

### Index (Après Correction)

| Nom | Colonnes | Type | Description |
|-----|----------|------|-------------|
| Order_pkey | id | PRIMARY | Index de clé primaire |
| Order_orderNumber_idx | orderNumber | INDEX | Index pour recherches rapides |

---

## Scripts SQL de Correction

Les scripts SQL pour corriger la base de données sont disponibles dans :

1. **`scripts/sql/02-fix-order-table.sql`** : Script complet de correction avec commentaires détaillés
2. **`scripts/sql/03-verify-order-table.sql`** : Script de vérification après correction
3. **`COMMANDES_SQL_SUPABASE.md`** : Guide étape par étape pour Supabase SQL Editor

---

## Étapes de Correction

### 1. Exécuter les Commandes SQL
Suivre les instructions dans `COMMANDES_SQL_SUPABASE.md` :
- Étape 1 : Ajouter les colonnes
- Étape 2 : Générer les numéros de commande
- Étape 3 : Ajouter les contraintes
- Étape 4 : Vérifier la structure

### 2. Vérifier la Correction
Exécuter `scripts/sql/03-verify-order-table.sql` pour valider :
- ✅ 30 colonnes présentes
- ✅ Contrainte unique sur orderNumber
- ✅ Index créé
- ✅ Aucune commande orpheline

### 3. Tester l'Application
- Redémarrer l'application
- Tester le processus de checkout
- Vérifier la création de commandes
- Confirmer que l'erreur `orderNumber does not exist` est résolue

---

## Problèmes Additionnels Identifiés

### Images 404
```
/images/shampoing.jpg - 404
/images/fond-teint.jpg - 404
/images/vitamines.jpg - 404
```

**Solutions possibles :**
1. Vérifier que les fichiers existent dans `/public/images/`
2. Vérifier les noms de fichiers (sensible à la casse)
3. Utiliser des images de remplacement
4. Vérifier la configuration Next.js pour les images statiques
