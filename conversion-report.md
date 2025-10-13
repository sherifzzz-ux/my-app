# Rapport de conversion Next.js → Shopify Theme

Date: 2025-10-13

## Résumé
- Dossier thème détecté: `theme_shopify/` (déjà structuré pour Shopify)
- Zip généré: `shopify-theme.zip` (archive de `theme_shopify/`)

## Pages converties (templates)
- Templates Liquid trouvés: `collection.liquid`, `product.liquid`, `cart.liquid`, `page.liquid`, `customers/login.liquid`, `customers/account.liquid`, `customers/register.liquid`, `gift_card.liquid`
- Templates JSON pour l’éditeur: `index.json`, `collection.json`, `product.json`, `page.json`, `cart.json`, `search.json`, `404.json`, `blog.json`, `article.json`, `password.json`, `list-collections.json`, `page.contact.json`, et les variantes `customers/*.json`

## Layout et structure
- Layout principal: `layout/theme.liquid`
- Layout mot de passe: `layout/password.liquid`
- Sections principales disponibles: `header.liquid`, `footer.liquid`, `hero-carousel.liquid`, `featured-products.liquid`, `flawless-beauty-collection-grid.liquid`, `brand-logos.liquid`, `category-grid.liquid`, `related-products.liquid`, etc.
- Snippets: `flawless-beauty-*.liquid` (cartes produit, badge, nav footer, announcement bar), `meta-tags.liquid`, `pagination.liquid`, `facets.liquid`, etc.

## Assets copiés
- CSS clés: `theme.css`, `base.css`, `flawless-beauty-custom.css`, `flawless-beauty-fonts.css`, et multiples `section-*.css`, `component-*.css`
- JS clés: `theme.js`, `global.js`, `cart.js`, `cart-drawer.js`, `facets.js`, `predictive-search.js`, `product-form.js`, `media-gallery.js`, etc.
- Icônes et images: grand nombre de SVGs et quelques images (voir `assets/`)

## Configuration Shopify
- `config/settings_schema.json`: présent (couleurs, polices, logo)
- `config/settings_data.json`: présent (base)
- `locales/en.default.json` et multiples locales: présents

## Points à vérifier / adapter manuellement
- Scripts dynamiques hérités de Next/React: non détectés dans le thème; toutefois, toute logique de panier, recherches prédictives et facettes est implémentée côté Shopify (`assets/*.js`). Vérifier l’intégration avec vos besoins spécifiques.
- Appels API externes (Supabase, Next API routes): doivent être retirés/remplacés par la logique Shopify. Les routes Next `app/api/*` ne sont pas utilisées dans le thème.
- Formulaires (contact, newsletter): vérifier les actions par défaut Shopify et apps tierces.
- Routing client-side: remplacé par la navigation Shopify (liens classiques), pas de `next/link`.

## Remarques
- Un export `out/` Next.js n’a pas été nécessaire: un thème Shopify complet est déjà disponible dans `theme_shopify/` et a été compressé.
- Si vous souhaitez repartir d’un export statique `out/` différent, fournir le dossier `out/` et je lancerai la conversion automatique (cheerio/fs-extra/archiver) pour générer un nouveau thème.
