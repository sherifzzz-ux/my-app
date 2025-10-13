# 🚀 Guide d'installation rapide - FlawlessBeauty Theme

## ⏱️ Installation en 5 minutes

### Étape 1 : Préparer le thème

```bash
# Depuis le dossier racine du projet
cd theme_shopify
zip -r ../flawlessbeauty-theme.zip *
```

Ou sur Windows :
- Sélectionnez tous les fichiers dans `theme_shopify`
- Clic droit > Envoyer vers > Dossier compressé

### Étape 2 : Importer dans Shopify

1. Connectez-vous à votre admin Shopify
2. Allez dans **Boutique en ligne** > **Thèmes**
3. Cliquez sur **Ajouter un thème**
4. Sélectionnez **Importer un fichier**
5. Choisissez `flawlessbeauty-theme.zip`
6. Attendez la fin de l'upload

### Étape 3 : Configuration initiale

Une fois le thème importé :

1. **Cliquez sur "Personnaliser"**
2. **Paramètres du thème** (en bas à gauche)
   
   #### Couleurs
   - ✅ Vérifiez que les couleurs sont correctes :
     - Principale : `#F792CC` (Rose)
     - Accent : `#FF9675` (Corail)
     - Urgence : `#EE5A52` (Rouge)

   #### Logo
   - 📤 Uploadez votre logo (300x80px recommandé)
   - 📏 Ajustez la largeur (150px par défaut)

   #### En-tête
   - ✏️ Modifiez le texte de bannière si nécessaire
   - ✅ Activez/désactivez la bannière d'annonce

### Étape 4 : Créer le menu principal

1. Allez dans **Boutique en ligne** > **Navigation**
2. Cliquez sur **Menu principal**
3. Créez cette structure :

```
🏠 Accueil          → /
🛍️ Boutique         → /collections/all
📦 Catégories       → (avec sous-menus)
   ├─ Soin du visage     → /collections/soin-visage
   ├─ Corps & Bain       → /collections/corps-bain
   ├─ Maquillage         → /collections/maquillage
   ├─ Cheveux            → /collections/cheveux
   ├─ Parfumerie         → /collections/parfumerie
   └─ Parapharmacie      → /collections/parapharmacie
🏷️ Marques          → /pages/marques
🔥 Promotions       → /collections/promotions
```

### Étape 5 : Configurer la page d'accueil

Dans l'éditeur de thème :

#### Section 1 : Hero Carousel
- Ajoutez 3-5 slides
- Pour chaque slide :
  - 🖼️ Image (1920x600px)
  - ✏️ Sous-titre (ex: "✨ Nouvelle Collection")
  - 📝 Titre (ex: "Révélez votre beauté")
  - 📄 Description
  - 🔗 Bouton avec lien

#### Section 2 : Grille de catégories
- Ajoutez vos 6 catégories principales
- Pour chaque catégorie :
  - 🖼️ Image (600x600px)
  - ✏️ Titre
  - 🔢 Nombre de produits
  - 🔗 Lien vers la collection

#### Section 3 : Produits mis en avant
- Sélectionnez une collection
- Nombre de produits : 8
- Texte du bouton : "Voir tous les produits"

#### Section 4 : Logos de marques
- Ajoutez vos marques partenaires
- Images : 200x80px (PNG transparent)

### Étape 6 : Publier le thème

1. Cliquez sur **Enregistrer**
2. Cliquez sur **Publier** en haut à droite
3. Confirmez la publication

## ✅ Checklist post-installation

### Paramètres essentiels

- [ ] Logo uploadé
- [ ] Couleurs vérifiées
- [ ] Menu principal créé
- [ ] Page d'accueil configurée
- [ ] Collections créées
- [ ] Produits ajoutés
- [ ] Moyens de paiement configurés
- [ ] Zones de livraison définies

### Pages à créer

Créez ces pages dans **Boutique en ligne** > **Pages** :

- [ ] **À propos** (`/pages/about`)
- [ ] **Contact** (`/pages/contact`)
- [ ] **Livraison** (`/pages/livraison`)
  ```
  📦 Dakar : Livraison en moins de 24h
  🚚 Thiès : 24-48h
  🌍 Autres régions : 48-72h
  ```
- [ ] **Conditions d'utilisation** (`/pages/conditions`)
- [ ] **Politique de confidentialité** (`/pages/privacy`)
- [ ] **Cookies** (`/pages/cookies`)
- [ ] **Marques** (`/pages/marques`)

### Collections à créer

- [ ] Soin du visage
- [ ] Corps & Bain
- [ ] Maquillage
- [ ] Cheveux
- [ ] Parfumerie
- [ ] Parapharmacie
- [ ] Promotions
- [ ] Nouveautés

## 🎨 Personnalisation avancée

### Modifier les couleurs

**Paramètres du thème** > **Couleurs**

| Élément | Couleur par défaut | Variable CSS |
|---------|-------------------|--------------|
| Principale | `#F792CC` | `--color-primary` |
| Accent | `#FF9675` | `--color-accent` |
| Urgence | `#EE5A52` | `--color-urgent` |
| Succès | `#34D399` | `--color-success` |
| Or | `#F59E0B` | `--color-gold` |

### Modifier les polices

**Paramètres du thème** > **Typographie**

- Corps : Inter (par défaut)
- Titres : Playfair Display (par défaut)

Vous pouvez changer pour d'autres polices Google Fonts.

### Ajouter CSS personnalisé

Créez un fichier `custom.css` dans `assets/` :

```css
/* Exemple : Changer la taille du logo mobile */
@media (max-width: 768px) {
  .header__logo img {
    height: 32px;
  }
}
```

## 📱 Configuration mobile

### Navigation sticky
La barre mobile sticky est activée par défaut avec 5 icônes :
1. Accueil
2. Recherche
3. Boutique
4. Favoris (nécessite une app)
5. Compte

Pour désactiver :
- Supprimez la section `mobile-nav-sticky` du fichier `theme.liquid`

### Performance mobile

Le thème est optimisé pour mobile :
- ✅ Images lazy-loaded
- ✅ CSS minifié
- ✅ JS optimisé
- ✅ Responsive design
- ✅ Touch-friendly (44px minimum)

## 🛒 Configuration du panier

### Type de panier

**Paramètres du thème** > **Panier**

- **Tiroir latéral** (recommandé) : Expérience moderne
- **Page complète** : Expérience classique

### Livraison gratuite

**Paramètres du thème** > **Panier**

- Seuil : `50000` (CFA)
- Une barre de progression s'affiche automatiquement

## 💳 Moyens de paiement (Sénégal)

Configurez dans **Paramètres** > **Paiements** :

1. **Orange Money**
2. **Wave**
3. **Carte bancaire** (Stripe, PayPal)

Le footer affiche automatiquement les icônes de paiement configurées.

## 🚚 Zones de livraison

**Paramètres** > **Expédition et livraison**

| Zone | Délai | Tarif |
|------|-------|-------|
| Dakar | < 24h | 2000 CFA |
| Thiès | 24-48h | 3000 CFA |
| Autres | 48-72h | 5000 CFA |

## 📧 Apps recommandées

### Obligatoires
- ☑️ **Judge.me** ou **Yotpo** : Avis clients
- ☑️ **Klaviyo** : Email marketing
- ☑️ **Google Analytics** : Statistiques

### Recommandées
- 💚 **Wishlist Plus** : Liste de souhaits
- 🔍 **Boost Product Filter** : Filtres avancés
- 📞 **Tidio** ou **Gorgias** : Chat en direct
- 📱 **PushOwl** : Notifications push

## 🎯 Optimisation SEO

### Meta descriptions

Pour chaque page :
1. Allez dans la page/produit/collection
2. Section **Référencement**
3. Ajoutez :
   - Titre (60 caractères max)
   - Description (160 caractères max)
   - URL optimisée

### Images

- Format : WebP ou JPG
- Taille : < 200KB par image
- Alt text : Toujours rempli
- Dimensions : Selon les recommandations

## 🐛 Dépannage rapide

### Le thème ne s'affiche pas correctement

1. Videz le cache : `Ctrl + Shift + R` ou `Cmd + Shift + R`
2. Vérifiez que le thème est bien publié
3. Testez dans un navigateur privé

### Le panier ne fonctionne pas

1. Vérifiez que Alpine.js est chargé
2. Ouvrez la console : `F12` > Console
3. Cherchez des erreurs JavaScript

### Les images ne se chargent pas

1. Vérifiez le format (JPG, PNG, WebP)
2. Vérifiez la taille (< 2MB)
3. Re-uploadez l'image

## 🆘 Besoin d'aide ?

- 📚 [Documentation Shopify](https://shopify.dev/themes)
- 💬 [Community Shopify](https://community.shopify.com)
- 📧 Support FlawlessBeauty : contact@flawlessbeauty.sn

## 🎉 C'est fini !

Votre boutique FlawlessBeauty est prête à vendre !

**Prochaines étapes** :
1. ✅ Ajoutez vos produits
2. ✅ Configurez les paiements
3. ✅ Testez le parcours d'achat
4. ✅ Lancez votre boutique ! 🚀
