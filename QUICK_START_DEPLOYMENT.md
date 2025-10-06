# 🚀 Guide de Déploiement Rapide - Mami-Shop

## ⚡ Déploiement en 5 étapes

### ✅ Étape 1: Vérifier les prérequis (DÉJÀ FAIT)

- [x] Base de données Supabase opérationnelle
- [x] Repository GitHub connecté à Vercel
- [x] Auto-déploiement configuré sur Vercel
- [x] Clés API Resend configurées

### 🔑 Étape 2: Créer un compte PayTech (À FAIRE)

1. **Allez sur [PayTech.sn](https://paytech.sn)**
2. **Créez un compte marchand**
3. **Complétez la vérification KYC**
4. **Récupérez vos clés API** dans le dashboard :
   - API_KEY
   - API_SECRET

⏱️ Temps estimé: **30-60 minutes** (selon la validation KYC)

### ⚙️ Étape 3: Configurer les variables d'environnement sur Vercel

1. **Allez sur votre dashboard Vercel**
2. **Sélectionnez votre projet**
3. **Settings > Environment Variables**
4. **Ajoutez les variables PayTech** :

```bash
# Variables PayTech (MODE TEST pour commencer)
PAYTECH_API_KEY=votre_api_key_test
PAYTECH_SECRET_KEY=votre_secret_key_test
PAYTECH_ENV=test

# URLs de callback (remplacez YOUR_APP par votre URL Vercel)
NEXT_PUBLIC_PAYTECH_SUCCESS_URL=https://YOUR_APP.vercel.app/checkout/success
NEXT_PUBLIC_PAYTECH_CANCEL_URL=https://YOUR_APP.vercel.app/checkout/cancel
NEXT_PUBLIC_PAYTECH_IPN_URL=https://YOUR_APP.vercel.app/api/checkout/paytech-webhook
```

5. **Vérifiez que les autres variables sont bien présentes** :
   - ✅ DATABASE_URL
   - ✅ DIRECT_URL
   - ✅ NEXT_PUBLIC_SUPABASE_URL
   - ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
   - ✅ SUPABASE_SERVICE_ROLE_KEY
   - ✅ NEXTAUTH_SECRET
   - ✅ NEXTAUTH_URL (mettez votre URL Vercel ici)
   - ✅ RESEND_API_KEY

### 🌐 Étape 4: Configurer le webhook PayTech

1. **Dans le dashboard PayTech**, allez dans **Paramètres > API**
2. **Configurez l'URL IPN** :
   ```
   https://YOUR_APP.vercel.app/api/checkout/paytech-webhook
   ```
3. **Sauvegardez**

### 🧪 Étape 5: Tester le paiement

1. **Poussez sur GitHub** (déploiement automatique)
2. **Attendez la fin du build** (~2-3 minutes)
3. **Testez le flux complet** :
   - Ajoutez un produit au panier
   - Allez sur `/checkout`
   - Remplissez le formulaire
   - Cliquez sur "Payer"
   - Testez avec Wave ou Orange Money (mode test)
   - Vérifiez la redirection vers `/checkout/success`

---

## 📱 Optimisations Mobile (DÉJÀ FAIT)

Votre application est déjà optimisée pour mobile :

- ✅ **PWA Ready** avec manifest.json
- ✅ **Responsive Design** avec Tailwind CSS
- ✅ **Mobile-First** breakpoints (xs: 375px)
- ✅ **Touch-Friendly** UI components
- ✅ **Fast Loading** avec Next.js 15
- ✅ **Image Optimization** automatique
- ✅ **SEO Mobile** avec métadonnées adaptées

### Tests recommandés

Testez sur différents appareils :

- 📱 **iPhone SE** (petit écran)
- 📱 **iPhone 12 Pro** (écran moyen)
- 📱 **Pixel 5** (Android)
- 📱 **iPad** (tablette)

---

## 🎯 Checklist de validation

### Avant de passer en production

- [ ] Compte PayTech créé et vérifié
- [ ] Variables d'environnement configurées
- [ ] Webhook IPN configuré dans PayTech
- [ ] Test de paiement réussi (mode test)
- [ ] Email de confirmation reçu
- [ ] Commande visible dans `/admin/orders`
- [ ] Tests sur mobile réussis

### Pour passer en production

- [ ] Changer `PAYTECH_ENV` de `test` à `prod`
- [ ] Mettre à jour les URLs de callback si domaine custom
- [ ] Tester avec de vrais paiements (petits montants)
- [ ] Activer le monitoring Vercel
- [ ] Configurer les sauvegardes automatiques

---

## 🆘 Problèmes courants

### 1. Le webhook PayTech ne fonctionne pas

**Solution** :
- Vérifiez l'URL IPN dans le dashboard PayTech
- Testez avec curl :
  ```bash
  curl -X POST https://YOUR_APP.vercel.app/api/checkout/paytech-webhook \
    -H "Content-Type: application/json" \
    -d '{"type_event": "payment_complete", "ref_command": "TEST"}'
  ```
- Vérifiez les logs Vercel : `vercel logs --follow`

### 2. Erreur de connexion à la base de données

**Solution** :
- Vérifiez que `DATABASE_URL` et `DIRECT_URL` sont bien configurées
- Régénérez le client Prisma : `npx prisma generate`

### 3. Les images ne se chargent pas

**Solution** :
- Vérifiez que Supabase Storage est configuré en public
- Vérifiez `next.config.ts` pour les domaines autorisés

---

## 📞 Support rapide

**PayTech** :
- Email: support@paytech.sn
- Documentation: https://docs.intech.sn/doc_paytech.php

**Pour les urgences** :
- Vérifiez d'abord les logs Vercel
- Testez les APIs avec curl
- Consultez la documentation complète dans `DEPLOYMENT_GUIDE.md`

---

## ✨ Prochaines étapes (après déploiement)

1. **Ajouter des produits** via `/admin/products`
2. **Configurer les emails** de confirmation
3. **Personnaliser le design** selon votre marque
4. **Ajouter Google Analytics**
5. **Optimiser le SEO**

---

## 🎉 Votre application est prête !

Une fois ces 5 étapes complétées, votre e-commerce Mami-Shop sera opérationnel avec :

- ✅ Paiements mobiles (Wave, Orange Money)
- ✅ Livraison rapide au Sénégal
- ✅ Interface optimisée mobile
- ✅ Dashboard admin complet
- ✅ Système de commandes
- ✅ Gestion des stocks
- ✅ Notifications par email

**Bon commerce !** 🇸🇳 🚀
