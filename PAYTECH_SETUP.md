# Configuration PayTech pour FlawlessBeauty

Ce document explique comment configurer PayTech pour accepter les paiements locaux au Sénégal (Orange Money, Wave, Carte Bancaire).

## Prérequis

1. Créer un compte PayTech sur [https://paytech.sn](https://paytech.sn)
2. Obtenir vos clés API depuis votre tableau de bord PayTech

## Configuration

### 1. Variables d'environnement

Ajoutez les variables suivantes dans votre fichier `.env.local` :

```env
# PayTech Configuration
PAYTECH_API_KEY="votre_api_key_paytech"
PAYTECH_API_SECRET="votre_api_secret_paytech"
PAYTECH_ENV="test"  # ou "production" en production

# URLs de callback (adaptez selon votre domaine)
PAYTECH_SUCCESS_URL="https://votredomaine.com/checkout/success"
PAYTECH_CANCEL_URL="https://votredomaine.com/checkout"
PAYTECH_IPN_URL="https://votredomaine.com/api/paytech/webhook"
```

### 2. Obtention des clés API

1. Connectez-vous à votre compte PayTech : https://paytech.sn/connexion
2. Allez dans **Paramètres** → **Clés API**
3. Copiez votre `API Key` et `API Secret`
4. Collez-les dans votre fichier `.env.local`

### 3. Configuration des URLs de callback

Dans votre tableau de bord PayTech, configurez les URLs de callback :

- **URL de succès** : `https://votredomaine.com/checkout/success`
- **URL d'annulation** : `https://votredomaine.com/checkout`
- **IPN URL** : `https://votredomaine.com/api/paytech/webhook`

⚠️ **Important** : L'IPN URL doit être accessible publiquement pour que PayTech puisse envoyer les notifications de paiement.

## Environnement de test

PayTech fournit un environnement de test pour tester les paiements sans utiliser de vrais fonds.

1. Utilisez `PAYTECH_ENV="test"` dans votre fichier `.env.local`
2. Utilisez les numéros de téléphone de test fournis par PayTech
3. Les paiements en mode test ne seront jamais débités

### Numéros de test PayTech

Consultez la documentation PayTech pour obtenir les numéros de téléphone de test pour :
- Orange Money
- Wave
- Autres opérateurs

## Passage en production

Avant de passer en production :

1. Changez `PAYTECH_ENV="production"`
2. Mettez à jour les URLs de callback avec votre domaine de production
3. Vérifiez que votre webhook IPN est bien accessible publiquement
4. Testez un paiement réel avec un petit montant

## Dépannage

### Erreur : "Payment system not configured"

Cette erreur signifie que les variables d'environnement PayTech ne sont pas configurées correctement.

**Solution** :
1. Vérifiez que `PAYTECH_API_KEY` et `PAYTECH_API_SECRET` sont bien définis dans `.env.local`
2. Redémarrez votre serveur Next.js après avoir modifié les variables d'environnement
3. Vérifiez que les clés sont correctes (pas d'espaces avant/après)

### Erreur : "Failed to create payment session"

Cette erreur peut avoir plusieurs causes :

**Solutions** :
1. Vérifiez que vos clés API sont valides
2. Vérifiez que vous êtes en mode "test" si vous testez
3. Consultez les logs du serveur pour plus de détails
4. Vérifiez que l'API PayTech est accessible depuis votre serveur

### Le webhook ne fonctionne pas

Le webhook (IPN) nécessite une URL publique accessible.

**En développement local** :
- Utilisez un tunnel comme [ngrok](https://ngrok.com/) pour exposer votre localhost
- Configurez l'IPN URL avec votre URL ngrok : `https://votre-id.ngrok.io/api/paytech/webhook`

**En production** :
- Vérifiez que votre serveur est bien accessible depuis Internet
- Vérifiez qu'aucun firewall ne bloque les requêtes de PayTech
- Consultez les logs de votre serveur pour voir si les requêtes arrivent

## Méthodes de paiement supportées

PayTech supporte les méthodes de paiement suivantes au Sénégal :

- 🟠 **Orange Money** - Paiement mobile Orange
- 🔵 **Wave** - Paiement mobile Wave
- 💳 **Carte Bancaire** - Visa, Mastercard
- 📱 **Free Money** - Paiement mobile Free (si disponible)

## Frais de livraison

Les frais de livraison sont configurés dans `lib/paytech/config.ts` :

```typescript
shippingZones: {
  DAKAR: {
    name: 'Dakar',
    delay: 'Livraison en moins de 24h',
    feeCents: 200000, // 2000 CFA
  },
  THIES: {
    name: 'Thiès',
    delay: 'Livraison en 24-48h',
    feeCents: 300000, // 3000 CFA
  },
  AUTRE: {
    name: 'Autres régions',
    delay: 'Livraison en 48-72h',
    feeCents: 500000, // 5000 CFA
  },
}
```

## Support

- **Documentation PayTech** : https://paytech.sn/documentation
- **Support PayTech** : contact@paytech.sn
- **Tableau de bord PayTech** : https://paytech.sn/connexion

## Sécurité

⚠️ **Ne commitez JAMAIS vos clés API dans Git !**

- Ajoutez `.env.local` à votre `.gitignore`
- Utilisez des variables d'environnement sécurisées en production
- Changez vos clés régulièrement
- Utilisez des clés différentes pour test et production

## Ressources

- [Documentation officielle PayTech](https://paytech.sn/documentation)
- [Guide d'intégration PayTech](https://paytech.sn/integration)
- [API Reference PayTech](https://paytech.sn/api-reference)
