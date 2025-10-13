# 📦 Guide d'Importation du Thème FlawlessBeauty sur Shopify

## 🎯 Objectif
Ce guide vous accompagne pas à pas pour importer et configurer le thème FlawlessBeauty adapté sur votre boutique Shopify.

---

## 📋 Prérequis

### 1. Accès Requis
- ✅ Accès admin à votre boutique Shopify
- ✅ Droits de modification des thèmes
- ✅ Fichier ZIP du thème FlawlessBeauty

### 2. Recommandations
- 🔄 Faire une sauvegarde de votre thème actuel
- 📸 Prendre des captures d'écran de vos paramètres actuels
- ⏰ Prévoir 30-60 minutes pour la configuration complète

---

## 🚀 Étape 1 : Préparation du Fichier ZIP

### Option A : Création Manuelle du ZIP

#### Sur macOS/Linux
```bash
cd /chemin/vers/theme_shopify
zip -r flawlessbeauty-theme.zip ./* -x "*.git*" -x "*.DS_Store"
```

#### Sur Windows (PowerShell)
```powershell
cd C:\chemin\vers\theme_shopify
Compress-Archive -Path .\* -DestinationPath flawlessbeauty-theme.zip
```

#### Via Interface Graphique
1. Ouvrir le dossier `theme_shopify`
2. Sélectionner TOUS les fichiers et dossiers (ne pas zipper le dossier parent)
3. Clic droit > "Compresser" ou "Envoyer vers" > "Dossier compressé"
4. Renommer en `flawlessbeauty-theme.zip`

### Option B : Utilisation du Script Automatique

```bash
cd theme_shopify
chmod +x build-theme.sh
./build-theme.sh
```

Le fichier ZIP sera créé dans le dossier parent.

### ⚠️ Points de Vigilance
- Le ZIP doit contenir directement les dossiers `assets/`, `sections/`, `snippets/`, etc.
- PAS de dossier parent dans le ZIP
- Taille recommandée : < 50 MB

---

## 📥 Étape 2 : Importation sur Shopify

### 1. Connexion Admin
1. Aller sur `votre-boutique.myshopify.com/admin`
2. Se connecter avec vos identifiants admin

### 2. Accès Thèmes
1. Menu latéral : **Boutique en ligne** (Online Store)
2. Cliquer sur **Thèmes** (Themes)

### 3. Sauvegarde du Thème Actuel (IMPORTANT)
1. Repérer votre thème actuel (marqué "Publié")
2. Cliquer sur **Actions** (⋯)
3. Sélectionner **Dupliquer** (Duplicate)
4. Renommer la copie : "Sauvegarde [Date]"

### 4. Upload du Nouveau Thème
1. Dans la section "Bibliothèque de thèmes" :
2. Cliquer sur **Ajouter un thème** (Add theme)
3. Sélectionner **Importer un fichier** (Upload zip file)
4. Choisir `flawlessbeauty-theme.zip`
5. Cliquer sur **Importer** (Upload)

### 5. Attendre l'Installation
- ⏳ Durée : 1-3 minutes
- ✅ Message de confirmation : "Thème importé avec succès"

---

## 🎨 Étape 3 : Configuration Initiale

### 1. Aperçu du Thème
1. Une fois importé, cliquer sur **Personnaliser** (Customize)
2. Vous êtes redirigé vers l'éditeur de thème

### 2. Configuration du Logo

#### Upload Logo
1. Dans la barre latérale gauche : **En-tête** (Header)
2. Section "Logo"
3. Cliquer sur **Sélectionner une image** (Select image)
4. Importer votre logo FlawlessBeauty
5. **Dimensions recommandées** :
   - Largeur : 200-300px
   - Format : PNG transparent ou SVG
   - Ratio : Paysage ou carré

#### Alternative : Logo Texte
Si pas d'image, le thème affichera automatiquement :
```
FlawlessBeauty
Parapharmacie en ligne & Cosmétiques
```

### 3. Bandeau USP (Announcement Bar)

1. Section **Bandeau d'annonce** (Announcement bar)
2. Vérifier le texte par défaut :
   ```
   LIVRAISON EN MOINS DE 24H À DAKAR (HORS DIMANCHES/JOURS FÉRIÉS)
   ```
3. Modifier si nécessaire
4. **Enregistrer**

### 4. Carrousel Hero (Page d'Accueil)

#### Ajouter la Section
1. Page d'accueil (Home page)
2. Cliquer sur **Ajouter une section** (Add section)
3. Sélectionner **Carrousel Hero**

#### Configurer les Slides (minimum 3, maximum 10)

**Pour chaque slide** :
1. Cliquer sur **Ajouter un bloc** > **Slide**
2. Remplir :
   - **Image** : 1920×1080px (desktop) ou 800×600px (mobile)
   - **Sous-titre** : Ex: "Nouveau"
   - **Titre** : Ex: "Collection Automne 2025"
   - **Description** : Texte court (2-3 lignes)
   - **Texte du bouton** : Ex: "Découvrir"
   - **Lien du bouton** : URL de collection ou page

3. Répéter pour 3-10 slides

#### Paramètres Carrousel
- Auto-rotation : **5 secondes** (fixé dans le code)
- Transition : **Crossfade**
- Navigation : **Flèches + Dots** (automatique)

### 5. Grille de Catégories

#### Ajouter la Section
1. Après le carrousel, cliquer **Ajouter une section**
2. Sélectionner **Grille de catégories**

#### Configuration
1. **Titre** : "Nos Catégories" ou "Découvrez nos univers beauté"
2. **Sous-titre** : "Parapharmacie en ligne & Cosmétiques"

#### Ajouter les Catégories (recommandé : 6)

**Pour chaque catégorie** :
1. Cliquer **Ajouter un bloc** > **Catégorie**
2. Remplir :
   - **Image** : 600×600px (format carré)
   - **Titre** : Ex: "Soin du visage"
   - **Nombre de produits** : Ex: "125 produits" (optionnel)
   - **Lien** : URL de la collection

**Catégories recommandées** :
1. Soin du visage → `/collections/soin-visage`
2. Corps & Bain → `/collections/corps-bain`
3. Maquillage → `/collections/maquillage`
4. Cheveux → `/collections/cheveux`
5. Parfumerie → `/collections/parfumerie`
6. Parapharmacie → `/collections/parapharmacie`

### 6. Section Produits Mis en Avant

1. **Ajouter une section** > **Produits mis en avant** (Featured products)
2. Sélectionner une collection (ex: "Nouveautés" ou "Promotions")
3. Nombre de produits : 8-12
4. **Enregistrer**

---

## 🧭 Étape 4 : Configuration de la Navigation

### Menu Principal (Header)

1. Admin > **Navigation** (Navigation)
2. Sélectionner le menu **Menu principal** (Main menu)
3. Cliquer sur **Ajouter un élément de menu** (Add menu item)

#### Structure Recommandée

```
Menu Principal
├── Nouveautés → /collections/nouveautes
├── Promotion → /collections/promotion
├── Soin du visage
│   ├── Hydratants → /collections/hydratants
│   ├── Anti-âge → /collections/anti-age
│   └── Nettoyants → /collections/nettoyants
├── Corps & Bain
│   ├── Gels douche → /collections/gels-douche
│   ├── Crèmes corps → /collections/cremes-corps
│   └── Soins mains → /collections/soins-mains
├── Maquillage
├── Parapharmacie
├── Cheveux
├── Parfumerie
├── Grossesse et Post-Partum → /collections/grossesse
└── Marques → /pages/marques
```

#### Créer un Sous-Menu
1. Cliquer sur un item parent (ex: "Soin du visage")
2. Cliquer **Ajouter un sous-élément de menu**
3. Remplir Nom + Lien
4. **Enregistrer**

### Menu Footer

1. Créer un nouveau menu : **Menu Footer - Catégories**
2. Ajouter :
   - Cadeau & Promo
   - Cheveux
   - Corps & Bain
   - Maquillage
   - Parapharmacie

3. Créer un menu : **Menu Footer - Informations**
4. Ajouter :
   - Nos Marques → `/pages/marques`
   - Mon compte → `/account`
   - Blog → `/blogs/news`
   - Conditions → `/pages/conditions`
   - Livraison → `/pages/livraison`
   - Politique cookies → `/pages/cookies`

---

## 🦶 Étape 5 : Configuration du Footer

### 1. Accès Footer
1. Éditeur de thème > Descendre en bas
2. Section **Footer** (Pied de page)

### 2. Configuration des Colonnes

#### Colonne 1 : À Propos
- **Titre** : "FlawlessBeauty"
- **Texte** : Description courte de la boutique (3-4 lignes)

#### Réseaux Sociaux
1. Ajouter vos liens :
   - **Facebook** : URL complète
   - **Instagram** : URL complète
   - **WhatsApp** : `https://wa.me/221XXXXXXXXX`
   - **TikTok** : URL complète (optionnel)

#### Colonne 2 : Catégories
- Sélectionner le menu **Menu Footer - Catégories**

#### Colonne 3 : Informations
- Sélectionner le menu **Menu Footer - Informations**

#### Colonne 4 : Contact
- **Téléphone** : +221 XX XXX XX XX
- **Email** : contact@flawlessbeauty.sn
- **Adresse** : Votre adresse complète à Dakar

### 3. Section Paiement
- Cocher **Afficher les icônes de paiement**
- Les icônes s'afficheront automatiquement :
  - Orange Money
  - Wave
  - Visa
  - Mastercard

### 4. Copyright
Texte généré automatiquement :
```
© 2025 FlawlessBeauty. Tous droits réservés.
Développé avec ❤️ par FlawlessBeauty
```

---

## 📱 Étape 6 : Navigation Mobile

### Configuration Automatique
La navigation mobile sticky est **activée automatiquement** sur les écrans < 768px.

### Items par Défaut
1. 🏠 **Accueil** → `/`
2. 🔍 **Recherche** → `/search`
3. 🛍️ **Boutique** → `/collections/all`
4. ❤️ **Favoris** → `/pages/wishlist`
5. 👤 **Compte** → `/account`

### Personnalisation (Avancé)
Pour modifier les items, éditer :
```
sections/mobile-nav-sticky.liquid
```

---

## 💰 Étape 7 : Configuration Devise & Paiement

### 1. Devise CFA
1. Admin > **Paramètres** (Settings) > **Général** (General)
2. Section **Normes et formats** (Standards and formats)
3. **Devise de la boutique** (Store currency) : `XOF` (Franc CFA)
4. **Format HTML avec devise** :
   ```
   {{amount}} CFA
   ```
   ou
   ```
   {{amount_with_comma_separator}} CFA
   ```
5. **Enregistrer**

### 2. Moyens de Paiement

#### Configurer les Paiements
1. Admin > **Paramètres** > **Paiements** (Payments)

#### Orange Money & Wave
1. Rechercher intégrations Orange Money / Wave pour Sénégal
2. Installer l'app correspondante
3. Configurer selon les instructions de l'app

#### Cartes Bancaires (Visa/Mastercard)
1. Activer **Shopify Payments** (si disponible au Sénégal)
2. Ou configurer un gateway compatible (Stripe, PayPal)

---

## ✅ Étape 8 : Vérification & Tests

### Checklist Avant Publication

#### Design & Branding
- [ ] Logo affiché correctement
- [ ] Couleurs FlawlessBeauty (rose #F792CC) visibles
- [ ] Typographies Playfair Display + Inter chargées
- [ ] Bandeau USP "Livraison 24h Dakar" affiché

#### Navigation
- [ ] Menu principal fonctionnel avec sous-menus
- [ ] Liens footer actifs
- [ ] Navigation mobile sticky visible (< 768px)
- [ ] Icônes panier, compte, recherche opérationnelles

#### Sections Page d'Accueil
- [ ] Carrousel hero avec 3-10 slides
- [ ] Auto-rotation 5s fonctionnelle
- [ ] Grille catégories 6 items minimum
- [ ] Produits mis en avant affichés

#### Produits
- [ ] Badges promo/nouveau/stock limité fonctionnels
- [ ] Prix en CFA correctement formatés
- [ ] Bouton "Ajouter au panier" opérationnel
- [ ] Images produits chargées (lazy loading)

#### Footer
- [ ] 4 colonnes affichées (desktop)
- [ ] Réseaux sociaux cliquables
- [ ] Icônes paiement visibles
- [ ] Bouton "Retour en haut" fonctionnel

#### Mobile (< 768px)
- [ ] Navigation bottom bar fixe
- [ ] Menu hamburger opérationnel
- [ ] Carrousel hero adapté (400px hauteur)
- [ ] Grille catégories 2 colonnes
- [ ] Touch targets min 44×44px

### Tests Recommandés

#### Desktop
1. Chrome, Firefox, Safari, Edge
2. Résolutions : 1920×1080, 1366×768, 1280×720

#### Mobile
1. iPhone (Safari iOS)
2. Android (Chrome)
3. Tablette

#### Performance
1. Tester avec Lighthouse (Chrome DevTools)
2. Objectifs :
   - Performance > 80
   - Accessibility > 90
   - SEO > 90

---

## 🚀 Étape 9 : Publication

### 1. Aperçu Final
1. Dans l'éditeur de thème, cliquer **Aperçu** (Preview)
2. Vérifier toutes les pages :
   - Page d'accueil
   - Page collection
   - Page produit
   - Page panier
   - Page compte

### 2. Publier le Thème
1. Si tout est OK, retourner dans **Thèmes** (Themes)
2. Repérer le thème "FlawlessBeauty"
3. Cliquer **Actions** (⋯) > **Publier** (Publish)
4. Confirmer la publication

### 3. Désactiver l'Ancien Thème
- L'ancien thème reste dans la bibliothèque (non publié)
- Ne pas le supprimer immédiatement (garder comme backup)

---

## 🔧 Dépannage

### Problème : Thème ne s'importe pas

**Solutions** :
1. Vérifier la structure du ZIP (dossiers directement à la racine)
2. Réduire la taille du ZIP (supprimer fichiers inutiles)
3. Essayer avec un autre navigateur
4. Vider le cache navigateur

### Problème : Couleurs roses non visibles

**Solutions** :
1. Vérifier que `snippets/css-variables.liquid` est bien importé
2. Forcer le rechargement CSS : Ctrl+Shift+R (Cmd+Shift+R sur Mac)
3. Vérifier les paramètres de thème (couleurs personnalisées)

### Problème : Carrousel ne défile pas

**Solutions** :
1. Vérifier qu'Alpine.js est chargé (vérifier console navigateur)
2. Ajouter au moins 2 slides
3. Vérifier les erreurs JavaScript (console F12)

### Problème : Navigation mobile invisible

**Solutions** :
1. Tester sur un vrai appareil mobile (pas juste resize desktop)
2. Vérifier que la largeur d'écran < 768px
3. Vérifier CSS `mobile-nav-sticky.liquid`

### Problème : Images produits ne se chargent pas

**Solutions** :
1. Vérifier format images (JPEG, PNG, WebP)
2. Vérifier taille < 20MB par image
3. Uploader via Admin > Fichiers (Files)

---

## 📚 Ressources Complémentaires

### Documentation Shopify
- [Guide des thèmes Shopify 2.0](https://shopify.dev/themes)
- [Liquid Reference](https://shopify.dev/api/liquid)
- [Theme Architecture](https://shopify.dev/themes/architecture)

### Support FlawlessBeauty
- Documentation complète : `THEME_FLAWLESSBEAUTY_README.md`
- Guide implémentation : `FLAWLESS_BEAUTY_IMPLEMENTATION_GUIDE.md`

---

## 📞 Besoin d'Aide ?

En cas de problème technique :
1. Vérifier cette documentation
2. Consulter la console navigateur (F12) pour les erreurs
3. Tester avec le thème "Debut" par défaut pour isoler le problème
4. Contacter le support Shopify si nécessaire

---

**Bon import ! 🎉**

**© 2025 FlawlessBeauty - Parapharmacie en ligne & Cosmétiques**
