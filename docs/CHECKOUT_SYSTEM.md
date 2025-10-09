# Système de Checkout et Paiement - Univers Cosmetix

## 📋 Vue d'ensemble

Le système de checkout implémenté sur Univers Cosmetix reproduit fidèlement le fonctionnement du site universcosmetix.com avec une intégration PayTech.sn comme passerelle de paiement principale.

## ✨ Fonctionnalités principales

### 🛒 Panier

- **Ajout de produits** : Depuis la page produit ou le catalogue
- **Gestion des quantités** : Augmenter/diminuer directement dans le panier
- **Suppression d'articles** : En un clic
- **Persistance** : Le panier est sauvegardé dans le navigateur
- **Récapitulatif en temps réel** : Affichage du sous-total et total
- **Panier vide** : Message avec CTA "Continuer les achats"

### 🛍️ Checkout multi-étapes

Le processus de commande est divisé en 4 étapes claires :

#### Étape 1 : Récapitulatif du panier
- Liste des produits avec images et prix
- Quantités modifiables
- Calcul du sous-total
- Bouton "Passer à la livraison"

#### Étape 2 : Informations client
- **Email** (requis, validé)
- **Nom complet** (minimum 3 caractères)
- **Téléphone** (minimum 9 chiffres)
- **Support guest checkout** : Possibilité de commander sans créer un compte
- Pré-remplissage automatique si connecté

#### Étape 3 : Livraison
- **Choix de la zone** :
  - Dakar : 2000 CFA - Livraison en moins de 24h
  - Thiès : 3000 CFA - Livraison en 24-48h
  - Autres régions : 5000 CFA - Livraison en 48-72h
- **Adresse complète** (minimum 10 caractères)
- **Ville** (requis)
- Calcul automatique des frais de livraison

#### Étape 4 : Paiement
- **Sélection du mode de paiement** :
  - 🟠 Orange Money
  - 🔵 Wave
  - 💳 Carte Bancaire (Visa, Mastercard)
  - 💵 Paiement à la livraison
- **Acceptation des CGV** (obligatoire)
- **Politique de confidentialité** (liens vers les pages légales)
- **Indicateur de sécurité** : "Paiement sécurisé - Vos données sont cryptées"

### 💳 Modes de paiement

#### Paiement en ligne (PayTech)

**Flow complet** :
1. Client sélectionne Orange Money, Wave ou Carte Bancaire
2. Validation du formulaire et vérification du stock
3. Création de la commande (status: PENDING)
4. Création d'une session PayTech
5. Redirection vers l'interface PayTech
6. Client effectue le paiement
7. PayTech envoie une notification (webhook IPN)
8. Mise à jour de la commande (status: CONFIRMED, paymentStatus: PAID)
9. Décrémentation automatique du stock
10. Redirection vers la page de confirmation
11. Email de confirmation envoyé (TODO)

**Gestion des échecs** :
- Si le paiement échoue : Commande reste en PENDING
- Si le client annule : Webhook reçu, commande annulée
- Possibilité de réessayer le paiement depuis l'espace client

#### Paiement à la livraison

**Flow complet** :
1. Client sélectionne "Paiement à la livraison"
2. Validation du formulaire et vérification du stock
3. Création de la commande (status: PENDING)
4. Confirmation automatique de la commande (status: CONFIRMED)
5. Décrémentation automatique du stock
6. Redirection vers la page de confirmation
7. Message spécifique : "Vous paierez à la livraison"
8. Email de confirmation envoyé (TODO)

**Particularités** :
- Le statut de paiement reste PENDING jusqu'à la livraison
- Le montant exact doit être préparé par le client
- Affichage du montant à payer sur la page de confirmation

### ✅ Vérifications automatiques

#### Avant création de la commande
- ✅ Validation des données avec Zod
- ✅ Vérification de l'existence des produits
- ✅ Vérification du stock disponible
- ✅ Calcul des totaux (sous-total + livraison)

#### Après paiement
- ✅ Mise à jour automatique du stock
- ✅ Changement du statut de commande
- ✅ Enregistrement de la référence PayTech
- ✅ Notification au client (TODO)
- ✅ Notification à l'admin (TODO)

### 📦 Gestion du stock

Le stock est géré automatiquement à chaque étape :

**Décrémentation** :
- Paiement en ligne réussi → Stock décrémenté
- Paiement à la livraison confirmé → Stock décrémenté

**Restauration** :
- Commande annulée (si confirmée) → Stock restauré
- Remboursement → Stock restauré

**Vérification** :
- Avant chaque commande : vérification de la disponibilité
- Si stock insuffisant : message d'erreur explicite

### 📊 Statuts de commande

#### OrderStatus
- `PENDING` : En attente de paiement
- `CONFIRMED` : Confirmée (payée ou paiement à la livraison)
- `PROCESSING` : En préparation
- `SHIPPED` : Expédiée
- `DELIVERED` : Livrée
- `CANCELLED` : Annulée

#### PaymentStatus
- `PENDING` : En attente
- `PROCESSING` : En cours de traitement
- `PAID` : Payé
- `FAILED` : Échoué
- `CANCELLED` : Annulé
- `REFUNDED` : Remboursé

### 🔐 Sécurité

- **Rate limiting** : Protection contre les abus (5 tentatives / 15 min)
- **Validation Zod** : Toutes les données sont validées
- **Vérification de signature** : Les webhooks PayTech sont vérifiés (SHA256)
- **Données cryptées** : Communication HTTPS avec PayTech
- **Aucune donnée bancaire stockée** : Tout transite par PayTech

### 🎨 Expérience utilisateur

- **Design moderne** : Interface claire et professionnelle
- **Indicateurs de progression** : Barre d'étapes visible
- **Validation en temps réel** : Messages d'erreur clairs
- **Boutons désactivés** : Impossible de continuer si formulaire invalide
- **Messages de succès** : Confirmation visuelle à chaque étape
- **Panier toujours visible** : Résumé dans la sidebar
- **Navigation fluide** : Retour en arrière possible à chaque étape
- **Responsive** : Fonctionne sur mobile, tablette et desktop

### 📱 Guest checkout

Le système supporte les commandes sans création de compte :

**Données stockées** :
- `guestEmail` : Email du client
- `guestName` : Nom du client
- `guestPhone` : Téléphone du client

**Avantages** :
- Processus plus rapide
- Pas de friction
- Conversion améliorée

**Limitations** :
- Pas d'historique de commandes
- Pas de suivi en temps réel
- Pas de wishlist

### 🚚 Zones de livraison

Les frais de livraison sont calculés automatiquement selon la zone :

| Zone | Frais | Délai |
|------|-------|-------|
| Dakar | 2 000 CFA | Moins de 24h |
| Thiès | 3 000 CFA | 24-48h |
| Autres régions | 5 000 CFA | 48-72h |

Les frais sont ajoutés automatiquement au total de la commande.

### 📧 Notifications (TODO)

Les notifications suivantes seront envoyées :

**Client** :
- Email de confirmation de commande
- Email d'expédition
- Email de livraison

**Admin** :
- Notification de nouvelle commande
- Notification de paiement reçu
- Alerte de stock faible

### 🔄 Webhooks PayTech

Le système reçoit et traite automatiquement les webhooks :

**Endpoint** : `/api/paytech/webhook`

**Événements gérés** :
- `sale_complete` : Paiement réussi
- `sale_canceled` : Paiement annulé
- `sale_refund` : Paiement remboursé

**Actions automatiques** :
- Mise à jour du statut de commande
- Mise à jour du statut de paiement
- Gestion du stock
- Envoi d'emails (TODO)

### 🛠️ API Routes

#### POST /api/paytech/session
Crée une session de paiement PayTech

**Body** :
```json
{
  "orderId": "cm123456"
}
```

**Response** :
```json
{
  "success": true,
  "redirectUrl": "https://paytech.sn/payment/xyz",
  "token": "xyz123"
}
```

#### POST /api/paytech/webhook
Reçoit les notifications PayTech (IPN)

**Webhook PayTech** :
```json
{
  "type_event": "sale_complete",
  "custom_field": "orderId",
  "ref_command": "Order-12345",
  "item_name": "Commande #12345",
  "item_price": "1500000",
  "currency": "XOF",
  "payment_method": "orange_money",
  "payment_ref": "PM123456",
  "api_key_sha256": "hash",
  "api_secret_sha256": "hash"
}
```

#### GET /api/paytech/verify
Vérifie le statut d'un paiement

**Query** :
```
?token=xyz123
```

**Response** :
```json
{
  "success": true,
  "status": "success",
  "ref_command": "Order-12345",
  "transaction_id": "TXN123",
  "payment_method": "orange_money",
  "amount": 1500000
}
```

### 📝 Server Actions

#### createOrder
Crée une nouvelle commande

**Input** :
- Informations client
- Informations de livraison
- Informations de paiement
- Articles du panier

**Output** :
- `success`: boolean
- `orderId`: string
- `orderNumber`: string
- `error`: string (si échec)

#### updateProductStock
Met à jour le stock après paiement

**Input** :
- `orderId`: string

**Output** :
- `success`: boolean
- `error`: string (si échec)

#### restoreProductStock
Restaure le stock (annulation/remboursement)

**Input** :
- `orderId`: string

**Output** :
- `success`: boolean
- `error`: string (si échec)

#### confirmCashOnDeliveryOrder
Confirme une commande en paiement à la livraison

**Input** :
- `orderId`: string

**Output** :
- `success`: boolean
- `order`: Order
- `error`: string (si échec)

## 🚀 Prochaines étapes

- [ ] Implémenter l'envoi d'emails de confirmation
- [ ] Ajouter le suivi de commande en temps réel
- [ ] Créer un tableau de bord admin pour gérer les commandes
- [ ] Implémenter les remboursements depuis l'admin
- [ ] Ajouter des analytics de conversion
- [ ] Implémenter un système de coupons/promotions
- [ ] Ajouter la possibilité de sauvegarder plusieurs adresses
- [ ] Créer un système de points de fidélité

## 📚 Documentation

- [Configuration PayTech](./PAYTECH_SETUP.md)
- [Guide utilisateur](./USER_GUIDE.md) (TODO)
- [Guide administrateur](./ADMIN_GUIDE.md) (TODO)

---

**Dernière mise à jour** : 2025-10-09
