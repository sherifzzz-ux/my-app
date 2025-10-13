# ✅ Checklist Avant Import Shopify

## 🎯 Vérification Rapide - Thème FlawlessBeauty

Utilisez cette checklist pour vous assurer que tout est prêt avant d'importer le thème sur Shopify.

---

## 📋 Checklist Pré-Import

### 1. Fichiers & Structure
- [x] Dossier `assets/` présent (CSS, images, JS)
- [x] Dossier `sections/` présent (composants de page)
- [x] Dossier `snippets/` présent (composants réutilisables)
- [x] Dossier `layout/` présent (theme.liquid, password.liquid)
- [x] Dossier `templates/` présent (pages, collections, produits)
- [x] Dossier `config/` présent (settings, locales)
- [x] Dossier `locales/` présent (traductions)

### 2. Design FlawlessBeauty
- [x] Couleur rose #F792CC intégrée dans `css-variables.liquid`
- [x] Typographies Playfair Display + Inter chargées
- [x] Gradients FlawlessBeauty configurés
- [x] Shadows adaptées (soft, medium, strong, glow)

### 3. Sections Principales
- [x] Bandeau USP "Livraison 24h Dakar" fonctionnel
- [x] Header avec logo/texte FlawlessBeauty
- [x] Carrousel hero (support 10 slides, 5s)
- [x] Grille catégories (2→3 colonnes)
- [x] Footer 4 colonnes
- [x] Navigation mobile sticky

### 4. Composants Produits
- [x] Badges dynamiques (promo, nouveau, stock)
- [x] Cartes produits avec hover effects
- [x] Prix en CFA
- [x] Boutons "Ajouter au panier" + "Voir détails"

### 5. CSS Créés
- [x] `section-header.css`
- [x] `section-footer.css`
- [x] `section-hero-carousel.css`
- [x] `section-category-grid.css`
- [x] `section-announcement-bar.css`

### 6. Documentation
- [x] `THEME_FLAWLESSBEAUTY_README.md` présent
- [x] `GUIDE_IMPORTATION_SHOPIFY.md` présent
- [x] `MODIFICATIONS_EFFECTUEES.md` présent
- [x] `CHECKLIST_AVANT_IMPORT.md` présent

---

## 🚀 Étapes d'Import

### Étape 1 : Créer le ZIP
```bash
cd theme_shopify
./build-theme.sh
```

**Attendu** : Fichier `flawlessbeauty-theme.zip` créé dans le dossier parent

### Étape 2 : Vérifier le ZIP
- [ ] Taille < 50 MB
- [ ] Structure correcte (dossiers assets/, sections/, etc. à la racine)
- [ ] Pas de dossier parent dans le ZIP

### Étape 3 : Backup Thème Actuel
- [ ] Dupliquer thème actuel dans Shopify
- [ ] Renommer backup : "Backup [Date]"

### Étape 4 : Import
- [ ] Shopify Admin > Boutique en ligne > Thèmes
- [ ] Ajouter un thème > Importer un fichier
- [ ] Uploader `flawlessbeauty-theme.zip`
- [ ] Attendre confirmation (1-3 minutes)

### Étape 5 : Configuration
- [ ] Personnaliser > En-tête > Logo (optionnel)
- [ ] Page d'accueil > Ajouter Carrousel Hero
- [ ] Page d'accueil > Ajouter Grille Catégories
- [ ] Footer > Configurer colonnes
- [ ] Navigation > Créer menu principal

### Étape 6 : Tests
- [ ] Tester page d'accueil
- [ ] Tester page collection
- [ ] Tester page produit
- [ ] Tester panier
- [ ] Tester mobile (< 768px)

### Étape 7 : Publication
- [ ] Aperçu final OK
- [ ] Publier le thème
- [ ] Vérifier site en ligne

---

## ⚠️ Points d'Attention

### Obligatoires
1. **Logo** : Préparer logo FlawlessBeauty (PNG 200×60px recommandé)
2. **Images carrousel** : 3-10 images 1920×1080px
3. **Images catégories** : 6 images 600×600px (carrées)
4. **Menus** : Créer menu principal avec sous-catégories

### Optionnels
1. Configurer devise CFA (XOF)
2. Ajouter réseaux sociaux
3. Configurer moyens de paiement
4. Personnaliser texte footer

---

## 🎨 Paramètres Recommandés

### Carrousel Hero
- **Slides** : 3-10
- **Auto-rotation** : 5s (fixé)
- **Hauteur** : 400px mobile / 500px desktop

### Grille Catégories
- **Nombre** : 6 catégories principales
- **Layout** : 2 colonnes (mobile) → 3 colonnes (desktop)
- **Images** : Carrées 600×600px min

### Footer
- **Colonnes** : 4 (À propos, Catégories, Infos, Contact)
- **Paiement** : Afficher icônes (Orange Money, Wave, Visa, MC)
- **Social** : Facebook, Instagram, WhatsApp

### Navigation Mobile
- **Items** : Accueil, Recherche, Boutique, Favoris, Compte
- **Affichage** : < 768px uniquement

---

## 🔍 Vérification Visuelle

### Desktop (1920×1080)
- [ ] Bandeau USP rose visible en haut
- [ ] Logo centré/gauche selon configuration
- [ ] Navigation horizontale avec dropdowns
- [ ] Carrousel pleine largeur 500px hauteur
- [ ] Grille catégories 3 colonnes centrées
- [ ] Footer 4 colonnes alignées

### Mobile (375×667)
- [ ] Bandeau USP lisible
- [ ] Logo centré
- [ ] Menu hamburger fonctionnel
- [ ] Carrousel 400px hauteur
- [ ] Grille catégories 2 colonnes
- [ ] Footer 1 colonne empilée
- [ ] Navigation bottom sticky visible (5 items)

### Produits
- [ ] Badges promo visibles (rouge pulsant)
- [ ] Prix en CFA formaté
- [ ] Bouton "Ajouter au panier" rose gradient
- [ ] Hover lift -4px fonctionnel

---

## 🐛 Dépannage Express

### Thème ne s'importe pas
→ Vérifier structure ZIP (pas de dossier parent)

### Couleurs roses absentes
→ Forcer refresh CSS : Ctrl+Shift+R

### Carrousel ne défile pas
→ Vérifier Alpine.js chargé (console F12)

### Navigation mobile invisible
→ Tester sur vrai mobile (pas juste resize)

### Images ne se chargent pas
→ Vérifier format JPEG/PNG/WebP < 20MB

---

## 📞 Ressources

### Documentation
- `THEME_FLAWLESSBEAUTY_README.md` - Guide complet
- `GUIDE_IMPORTATION_SHOPIFY.md` - Import détaillé
- `MODIFICATIONS_EFFECTUEES.md` - Changements techniques

### Shopify
- [Guide thèmes 2.0](https://shopify.dev/themes)
- [Liquid reference](https://shopify.dev/api/liquid)
- [Support Shopify](https://help.shopify.com)

---

## ✅ Validation Finale

**Avant de publier, vérifier** :
- [ ] Toutes les pages se chargent sans erreur
- [ ] Navigation complète fonctionnelle
- [ ] Panier ajoute/retire produits
- [ ] Checkout accessible
- [ ] Mobile responsive (< 768px)
- [ ] Lighthouse Score > 80

**Une fois validé** :
- [ ] Publier le thème
- [ ] Désactiver l'ancien thème (garder en backup)
- [ ] Monitorer les premiers retours utilisateurs

---

## 🎉 Prêt pour l'Import !

Tous les éléments FlawlessBeauty sont intégrés et prêts.

**Bonne réussite avec votre nouvelle boutique !** 🌸

---

**© 2025 FlawlessBeauty - Parapharmacie en ligne & Cosmétiques**
