# Guide de test - Système de Checkout et Paiement

## 🧪 Tests à effectuer

### Prérequis

1. Configurer les variables d'environnement (voir `.env.example`)
2. Appliquer la migration Prisma :
   ```bash
   npx prisma migrate dev
   ```
3. Démarrer le serveur :
   ```bash
   npm run dev
   ```

## 📋 Scénarios de test

### 1. Test du panier

#### ✅ Ajout de produits
1. Aller sur `/catalog`
2. Cliquer sur "Ajouter au panier" sur un produit
3. Vérifier que le compteur du panier s'incrémente
4. Ouvrir le panier (icône en haut à droite)
5. Vérifier que le produit est bien présent

#### ✅ Modification de quantité
1. Dans le panier, augmenter la quantité d'un produit
2. Vérifier que le sous-total se met à jour
3. Diminuer la quantité
4. Vérifier la mise à jour

#### ✅ Suppression de produit
1. Cliquer sur le bouton "Supprimer"
2. Vérifier que le produit disparaît
3. Si panier vide, vérifier l'affichage du message "Panier vide"

### 2. Test du checkout - Paiement en ligne

#### ✅ Étape 1 : Panier
1. Ajouter 2-3 produits au panier
2. Cliquer sur "Passer commande"
3. Vérifier l'affichage du récapitulatif
4. Cliquer sur "Continuer"

#### ✅ Étape 2 : Informations client
1. Remplir le formulaire :
   - Email : `test@example.com`
   - Nom : `Jean Dupont`
   - Téléphone : `771234567`
2. Vérifier la validation en temps réel
3. Cliquer sur "Continuer"

#### ✅ Étape 3 : Livraison
1. Sélectionner une zone (ex: Dakar)
2. Vérifier l'affichage des frais (2000 CFA)
3. Remplir l'adresse complète
4. Remplir la ville
5. Cliquer sur "Continuer"

#### ✅ Étape 4 : Paiement
1. Sélectionner "Orange Money"
2. Cocher "J'accepte les CGV"
3. Cliquer sur "Finaliser la commande"
4. Vérifier la redirection vers PayTech

#### ⚠️ Note pour le test PayTech
En mode test, vous serez redirigé vers l'interface PayTech. Pour simuler :
- Un **paiement réussi** : Utilisez les numéros de test PayTech
- Une **annulation** : Cliquez sur "Annuler" sur PayTech
- Un **échec** : Laissez expirer la session

### 3. Test du paiement à la livraison

#### ✅ Flow complet
1. Ajouter des produits au panier
2. Passer au checkout
3. Remplir les étapes 1-3
4. À l'étape 4, sélectionner "Paiement à la livraison"
5. Cocher les CGV
6. Cliquer sur "Finaliser la commande"
7. Vérifier la redirection vers `/checkout/success?orderId=xxx&method=cash`
8. Vérifier l'affichage :
   - Message "Vous paierez à la livraison"
   - Montant exact à préparer
   - Notice bleue

#### ✅ Vérification en base de données
1. Ouvrir Prisma Studio :
   ```bash
   npx prisma studio
   ```
2. Aller dans la table `Order`
3. Vérifier la commande créée :
   - `status` = `CONFIRMED`
   - `paymentStatus` = `PENDING`
   - `paymentMethod` = `CASH_ON_DELIVERY`

#### ✅ Vérification du stock
1. Aller dans la table `Product`
2. Vérifier que le stock a été décrémenté

### 4. Test du webhook PayTech

#### ✅ Configuration ngrok (pour test local)
1. Installer ngrok :
   ```bash
   npm install -g ngrok
   ```
2. Démarrer ngrok :
   ```bash
   ngrok http 3000
   ```
3. Copier l'URL HTTPS (ex: `https://abc123.ngrok.io`)
4. Mettre à jour `.env.local` :
   ```bash
   PAYTECH_IPN_URL="https://abc123.ngrok.io/api/paytech/webhook"
   ```
5. Redémarrer le serveur

#### ✅ Test du webhook
1. Créer une commande avec paiement en ligne
2. Effectuer le paiement sur PayTech
3. Vérifier dans les logs du serveur :
   ```
   PayTech IPN received: { ... }
   Order confirmed: Order-12345
   ```
4. Vérifier en base de données :
   - `paymentStatus` = `PAID`
   - `status` = `CONFIRMED`
   - Stock décrémenté

#### ✅ Test d'annulation
1. Créer une commande
2. Annuler sur l'interface PayTech
3. Vérifier le webhook `sale_canceled`
4. Vérifier :
   - `paymentStatus` = `CANCELLED`
   - `status` = `CANCELLED`

#### ✅ Test de remboursement
1. Depuis le dashboard PayTech, initier un remboursement
2. Vérifier le webhook `sale_refund`
3. Vérifier :
   - `paymentStatus` = `REFUNDED`
   - Stock restauré

### 5. Test de la vérification du stock

#### ✅ Stock insuffisant
1. Créer un produit avec stock = 1
2. Ajouter 2 exemplaires au panier
3. Tenter de passer commande
4. Vérifier l'affichage du message d'erreur :
   ```
   Insufficient stock for [Nom du produit]
   ```

#### ✅ Produit indisponible
1. Supprimer un produit de la base de données
2. Tenter de commander un produit avec cet ID
3. Vérifier l'affichage de l'erreur :
   ```
   Some products are not available
   ```

### 6. Test du guest checkout

#### ✅ Sans connexion
1. Se déconnecter (ou navigation privée)
2. Ajouter des produits au panier
3. Passer commande
4. Vérifier que les champs email/nom/téléphone sont vides
5. Remplir et finaliser
6. Vérifier en base de données :
   - `userId` = `null`
   - `guestEmail` = email renseigné
   - `guestName` = nom renseigné
   - `guestPhone` = téléphone renseigné

#### ✅ Avec connexion
1. Se connecter avec un compte
2. Ajouter des produits au panier
3. Passer commande
4. Vérifier que les champs sont pré-remplis
5. Finaliser
6. Vérifier en base de données :
   - `userId` = ID de l'utilisateur
   - `guestEmail` = `null`

### 7. Test de la page de confirmation

#### ✅ Paiement en ligne
1. Compléter un paiement PayTech
2. Vérifier l'affichage :
   - Badge vert "Commande confirmée"
   - Numéro de commande
   - Détails des produits
   - Sous-total, livraison, total
   - Adresse de livraison
   - Délai de livraison
   - Notice "Email de confirmation envoyé"

#### ✅ Paiement à la livraison
1. Compléter une commande en cash
2. Vérifier l'affichage :
   - Message "Vous paierez à la livraison"
   - Notice bleue avec montant exact
   - Tous les autres détails

### 8. Test de sécurité

#### ✅ Rate limiting
1. Créer 6 sessions PayTech d'affilée
2. Vérifier l'erreur 429 "Too many requests"
3. Attendre 15 minutes
4. Réessayer (devrait fonctionner)

#### ✅ Validation des données
1. Envoyer une requête avec des données invalides :
   ```bash
   curl -X POST http://localhost:3000/api/paytech/session \
     -H "Content-Type: application/json" \
     -d '{"orderId": ""}'
   ```
2. Vérifier l'erreur 400 "Invalid request"

#### ✅ Vérification de signature
1. Envoyer un webhook avec une signature invalide
2. Vérifier l'erreur "Invalid signature"

### 9. Test des zones de livraison

#### ✅ Frais de livraison
1. Sélectionner "Dakar" → Vérifier 2000 CFA
2. Sélectionner "Thiès" → Vérifier 3000 CFA
3. Sélectionner "Autres régions" → Vérifier 5000 CFA

#### ✅ Délais de livraison
1. Dakar → "Livraison en moins de 24h"
2. Thiès → "Livraison en 24-48h"
3. Autres → "Livraison en 48-72h"

### 10. Test de navigation

#### ✅ Retour en arrière
1. Avancer jusqu'à l'étape 3
2. Cliquer sur "Retour" plusieurs fois
3. Vérifier que les données sont conservées

#### ✅ Panier vide en cours de checkout
1. Démarrer le checkout
2. Dans un autre onglet, vider le panier
3. Vérifier la redirection vers `/cart`

## 🐛 Bugs connus et limitations

- [ ] Les emails de confirmation ne sont pas envoyés (TODO)
- [ ] La migration Prisma nécessite DATABASE_URL configurée
- [ ] Aucun test automatisé pour l'instant

## ✅ Checklist de validation

Avant de passer en production, vérifier :

- [ ] Tous les scénarios ci-dessus testés et validés
- [ ] Variables d'environnement de production configurées
- [ ] Webhook PayTech accessible publiquement
- [ ] Migration Prisma appliquée
- [ ] Logs de paiement fonctionnels
- [ ] Monitoring en place
- [ ] Sauvegarde de la base de données configurée

## 📊 Métriques à surveiller

- **Taux de conversion** : Panier → Commande validée
- **Taux d'abandon** : Par étape du checkout
- **Taux de réussite des paiements** : PayTech vs Cash
- **Temps moyen de checkout** : De l'ajout au panier à la validation
- **Erreurs fréquentes** : Stock insuffisant, paiement échoué, etc.

---

**Dernière mise à jour** : 2025-10-09
