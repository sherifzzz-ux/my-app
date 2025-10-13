# FlawlessBeauty - Thème Shopify

Un thème Shopify moderne et élégant conçu spécifiquement pour les boutiques de cosmétiques et produits de beauté, inspiré du design de FlawlessBeauty.

## 🎨 Caractéristiques

### Design & Branding
- **Palette de couleurs FlawlessBeauty** : Rose principal (#F792CC), Corail accent, Or premium
- **Typographie élégante** : Inter (corps) & Playfair Display (titres)
- **Design responsive** : Optimisé pour mobile, tablette et desktop
- **Animations fluides** : Transitions et micro-interactions soignées

### Fonctionnalités E-commerce
- ✅ Carrousel hero avec 10 slides personnalisables
- ✅ Grille de catégories avec images
- ✅ Cartes produits avec badges promo
- ✅ Ajout rapide au panier
- ✅ Tiroir de panier latéral (cart drawer)
- ✅ Système de recherche avec suggestions
- ✅ Navigation sticky mobile (5 icônes)
- ✅ Méga-menu avec sous-catégories
- ✅ Fil d'Ariane automatique
- ✅ Système de notation par étoiles
- ✅ Carrousel de logos de marques
- ✅ Produits similaires
- ✅ Filtres et tri de collection
- ✅ Pagination avancée

### Performance & SEO
- ⚡ Lazy loading des images
- ⚡ CSS et JS optimisés
- ⚡ Meta tags Open Graph et Twitter Cards
- ⚡ Schema.org markup
- ⚡ Sitemap automatique

### Accessibilité
- ♿ Navigation au clavier
- ♿ ARIA labels
- ♿ Contrastes WCAG AA
- ♿ Focus visible

## 📦 Installation

### Méthode 1 : Upload via l'admin Shopify

1. **Zipper le dossier theme_shopify** :
   ```bash
   cd theme_shopify
   zip -r flawlessbeauty-theme.zip *
   ```

2. **Se connecter à votre boutique Shopify** :
   - Allez dans `Boutique en ligne` > `Thèmes`
   - Cliquez sur `Ajouter un thème` > `Importer un fichier`
   - Sélectionnez le fichier `flawlessbeauty-theme.zip`

3. **Publier le thème** :
   - Une fois importé, cliquez sur `Publier` pour activer le thème

### Méthode 2 : Shopify CLI

```bash
# Installer Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Se connecter
shopify login --store votre-boutique.myshopify.com

# Pousser le thème
cd theme_shopify
shopify theme push

# Ou développer en temps réel
shopify theme dev
```

## ⚙️ Configuration

### 1. Paramètres généraux

Allez dans `Boutique en ligne` > `Personnaliser` pour accéder aux paramètres :

#### Couleurs
- Couleur principale (Rose) : `#F792CC`
- Couleur accent (Corail) : `#FF9675`
- Couleur urgence/promo : `#EE5A52`

#### Logo
- Taille recommandée : 300x80px
- Format : PNG avec fond transparent
- Largeur par défaut : 150px

#### Bannière d'annonce
- Texte : "🚀 Livraison en moins de 24h à Dakar"
- Activable/désactivable

### 2. Menu de navigation

Créez un menu principal dans `Navigation` :

```
Soin du visage
  └─ Nettoyants
  └─ Hydratants
  └─ Sérums
  └─ ...

Corps & Bain
  └─ Gels douche
  └─ Soins corps
  └─ ...

Maquillage
Cheveux
Parfumerie
Parapharmacie
```

### 3. Page d'accueil

Le template `index.json` contient :

1. **Hero Carousel** (3 slides par défaut)
2. **Grille de catégories** (6 catégories)
3. **Produits mis en avant** (8 produits)
4. **Logos de marques**

Personnalisez chaque section via l'éditeur de thème.

### 4. Collections

Créez vos collections avec les filtres suivants :
- Par catégorie (Soin du visage, Corps & Bain, etc.)
- Par marque
- Promotions
- Nouveautés

### 5. Métadonnées produits

Pour activer les notes par étoiles, installez une app de reviews comme :
- Yotpo
- Judge.me
- Loox

## 🎯 Utilisation des sections

### Hero Carousel

```liquid
{% section 'hero-carousel' %}
```

**Blocs** : Jusqu'à 10 slides
- Image (recommandé 1920x600px)
- Sous-titre
- Titre
- Description
- Bouton (texte + lien)

### Grille de catégories

```liquid
{% section 'category-grid' %}
```

**Blocs** : Jusqu'à 12 catégories
- Image (recommandé 600x600px)
- Titre
- Nombre de produits
- Lien

### Produits mis en avant

```liquid
{% section 'featured-products' %}
```

**Paramètres** :
- Collection source
- Nombre de produits (4-20)
- Bouton CTA

### Logos de marques

```liquid
{% section 'brand-logos' %}
```

**Blocs** : Jusqu'à 20 marques
- Logo (recommandé 200x80px, PNG transparent)
- Nom de la marque
- Lien (optionnel)

## 📱 Navigation mobile

La barre de navigation sticky mobile contient :
1. **Accueil** : Lien vers la page d'accueil
2. **Recherche** : Ouvre la recherche
3. **Boutique** : Accès aux collections
4. **Favoris** : Wishlist (nécessite une app)
5. **Compte** : Connexion/Mon compte

## 🛒 Panier

Le thème utilise un cart drawer (tiroir latéral) par défaut.

Pour utiliser une page de panier complète :
- Allez dans les paramètres du thème
- Section "Panier"
- Changez "Type de panier" en "Page complète"

## 🎨 Personnalisation avancée

### CSS personnalisé

Ajoutez votre CSS dans `assets/custom.css` :

```css
/* Exemple : Modifier la couleur des titres */
.section-title {
  color: #000;
}
```

### JavaScript personnalisé

Ajoutez votre JS dans le thème :

```javascript
// Écouter l'événement de chargement du thème
document.addEventListener('theme:loaded', function() {
  console.log('Theme is ready!');
  // Votre code ici
});
```

## 🔧 Dépannage

### Le panier ne s'ouvre pas

Vérifiez que Alpine.js est bien chargé :
```html
<!-- Dans theme.liquid -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### Les images ne se chargent pas

Vérifiez les filtres Liquid :
```liquid
{{ product.featured_image | img_url: '600x' }}
```

### Le méga-menu ne s'affiche pas

Vérifiez la structure de votre menu dans `Navigation` et assurez-vous d'avoir des sous-éléments.

## 📊 Métriques de performance

Le thème est optimisé pour :
- **Lighthouse Score** : 90+
- **First Contentful Paint** : < 1.5s
- **Time to Interactive** : < 3.5s
- **Cumulative Layout Shift** : < 0.1

## 🌍 Traductions

Le thème est disponible en français par défaut.

Pour ajouter d'autres langues :
1. Dupliquez `locales/fr.json`
2. Renommez en `en.json`, `es.json`, etc.
3. Traduisez les chaînes de caractères

## 🆘 Support

Pour toute question ou problème :
- Documentation Shopify : [shopify.dev/themes](https://shopify.dev/themes)
- Community Shopify : [community.shopify.com](https://community.shopify.com)

## 📝 Notes importantes

### Spécificités Sénégal

Le thème est optimisé pour le marché sénégalais :
- Devise : Franc CFA (XOF)
- Moyens de paiement : Orange Money, Wave, CB
- Livraison : Dakar < 24h, Régions 24-72h

### Apps recommandées

- **Reviews** : Judge.me, Yotpo
- **Wishlist** : Wishlist Plus, Smart Wishlist
- **Search** : Boost Product Filter & Search
- **Analytics** : Lucky Orange, Hotjar

## 🔄 Mises à jour

Pour mettre à jour le thème :
1. Créez une copie du thème actuel
2. Importez la nouvelle version
3. Testez sur un thème de prévisualisation
4. Publiez une fois validé

## 📄 Licence

Ce thème est fourni "tel quel" pour usage avec Shopify.

---

**Version** : 1.0.0  
**Dernière mise à jour** : 2024  
**Compatibilité** : Shopify 2.0+  
**Auteur** : FlawlessBeauty

## 🎉 Bon e-commerce !

Pour toute question, n'hésitez pas à consulter la documentation Shopify ou à contacter le support.
