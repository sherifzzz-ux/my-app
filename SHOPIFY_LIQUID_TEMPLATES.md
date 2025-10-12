# 🎨 Templates Liquid pour Shopify - FlawlessBeauty

Ce fichier contient des templates Liquid prêts à l'emploi pour reproduire exactement le design de FlawlessBeauty sur Shopify.

---

## 📁 Structure des Fichiers Shopify

```
theme/
├── assets/
│   ├── custom.css
│   ├── custom.js
│   └── logo.png
├── config/
│   └── settings_schema.json
├── layout/
│   └── theme.liquid
├── sections/
│   ├── header.liquid
│   ├── footer.liquid
│   ├── product-grid.liquid
│   └── mega-menu.liquid
├── snippets/
│   ├── product-card.liquid
│   ├── breadcrumbs.liquid
│   └── price-cfa.liquid
└── templates/
    ├── index.liquid
    ├── collection.liquid
    ├── product.liquid
    └── cart.liquid
```

---

## 🔧 1. Header avec Bandeau USP et Méga-menu

### `sections/header.liquid`

```liquid
{% comment %}
  Header FlawlessBeauty avec :
  - Bandeau USP livraison
  - Logo + Recherche + Compte/Panier
  - Méga-menu multi-niveaux
{% endcomment %}

<!-- Bandeau USP -->
<div class="announcement-bar">
  <div class="container">
    <p>🚚 Livraison en moins de 24h à Dakar (hors dimanches/jours fériés)</p>
  </div>
</div>

<!-- Header principal -->
<header class="site-header" role="banner">
  <div class="header-wrapper container">
    
    <!-- Logo -->
    <div class="header-logo">
      <a href="/" title="{{ shop.name }}">
        {% if section.settings.logo != blank %}
          {{ section.settings.logo | img_url: '200x' | img_tag: shop.name }}
        {% else %}
          <h1 class="logo-text">{{ shop.name }}</h1>
        {% endif %}
      </a>
    </div>

    <!-- Barre de recherche -->
    <div class="header-search">
      <form action="/search" method="get" role="search">
        <input 
          type="search" 
          name="q" 
          placeholder="Rechercher un produit, une marque..."
          value="{{ search.terms | escape }}"
          aria-label="Rechercher dans la boutique"
        >
        <button type="submit" aria-label="Rechercher">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </form>
    </div>

    <!-- Compte & Panier -->
    <div class="header-icons">
      <!-- Mon compte -->
      <a href="/account" class="header-icon" title="Mon compte">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span class="icon-label">Mon compte</span>
      </a>

      <!-- Panier -->
      <a href="/cart" class="header-icon cart-icon" title="Panier">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span class="cart-count">{{ cart.item_count }}</span>
        <span class="icon-label">Panier</span>
      </a>
    </div>
  </div>

  <!-- Navigation / Méga-menu -->
  <nav class="main-navigation" role="navigation">
    <div class="container">
      <ul class="nav-menu">
        
        <!-- Promotion -->
        <li class="nav-item">
          <a href="/collections/promotion" class="nav-link">
            Promotion
          </a>
        </li>

        <!-- Soin du visage -->
        <li class="nav-item has-dropdown">
          <a href="/collections/soin-du-visage" class="nav-link">
            Soin du visage
          </a>
          <div class="mega-menu">
            <div class="mega-menu-content">
              <div class="mega-menu-column">
                <h3>Par Type de Peau</h3>
                <ul>
                  <li><a href="/collections/soin-visage-peau-seche">Peau sèche</a></li>
                  <li><a href="/collections/soin-visage-peau-grasse">Peau grasse</a></li>
                  <li><a href="/collections/soin-visage-peau-mixte">Peau mixte</a></li>
                  <li><a href="/collections/soin-visage-peau-sensible">Peau sensible</a></li>
                </ul>
              </div>
              <div class="mega-menu-column">
                <h3>Par Besoin</h3>
                <ul>
                  <li><a href="/collections/anti-age">Anti-âge</a></li>
                  <li><a href="/collections/hydratation">Hydratation</a></li>
                  <li><a href="/collections/eclat">Éclat</a></li>
                  <li><a href="/collections/anti-imperfections">Anti-imperfections</a></li>
                </ul>
              </div>
              <div class="mega-menu-column">
                <h3>Produits</h3>
                <ul>
                  <li><a href="/collections/nettoyants">Nettoyants</a></li>
                  <li><a href="/collections/serums">Sérums</a></li>
                  <li><a href="/collections/cremes">Crèmes</a></li>
                  <li><a href="/collections/masques">Masques</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>

        <!-- Corps & Bain -->
        <li class="nav-item has-dropdown">
          <a href="/collections/corps-bain" class="nav-link">
            Corps & Bain
          </a>
          <div class="mega-menu">
            <div class="mega-menu-content">
              <div class="mega-menu-column">
                <h3>Soins du Corps</h3>
                <ul>
                  <li><a href="/collections/gels-douche">Gels douche</a></li>
                  <li><a href="/collections/laits-corps">Laits corps</a></li>
                  <li><a href="/collections/gommages">Gommages</a></li>
                  <li><a href="/collections/huiles-corps">Huiles</a></li>
                </ul>
              </div>
              <div class="mega-menu-column">
                <h3>Hygiène</h3>
                <ul>
                  <li><a href="/collections/savons">Savons</a></li>
                  <li><a href="/collections/deodorants">Déodorants</a></li>
                  <li><a href="/collections/hygiene-intime">Hygiène intime</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>

        <!-- Maquillage -->
        <li class="nav-item has-dropdown">
          <a href="/collections/maquillage" class="nav-link">
            Maquillage
          </a>
          <div class="mega-menu">
            <div class="mega-menu-content">
              <div class="mega-menu-column">
                <h3>Teint</h3>
                <ul>
                  <li><a href="/collections/fonds-de-teint">Fonds de teint</a></li>
                  <li><a href="/collections/correcteurs">Correcteurs</a></li>
                  <li><a href="/collections/poudres">Poudres</a></li>
                  <li><a href="/collections/primers">Primers</a></li>
                </ul>
              </div>
              <div class="mega-menu-column">
                <h3>Yeux</h3>
                <ul>
                  <li><a href="/collections/mascaras">Mascaras</a></li>
                  <li><a href="/collections/eyeliners">Eyeliners</a></li>
                  <li><a href="/collections/ombres-paupieres">Ombres à paupières</a></li>
                  <li><a href="/collections/sourcils">Sourcils</a></li>
                </ul>
              </div>
              <div class="mega-menu-column">
                <h3>Lèvres</h3>
                <ul>
                  <li><a href="/collections/rouges-levres">Rouges à lèvres</a></li>
                  <li><a href="/collections/gloss">Gloss</a></li>
                  <li><a href="/collections/baumes-levres">Baumes à lèvres</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>

        <!-- Autres catégories -->
        <li class="nav-item"><a href="/collections/parapharmacie" class="nav-link">Parapharmacie</a></li>
        <li class="nav-item"><a href="/collections/cheveux" class="nav-link">Cheveux</a></li>
        <li class="nav-item"><a href="/collections/parfumerie" class="nav-link">Parfumerie</a></li>
        <li class="nav-item"><a href="/collections/bebe-enfant" class="nav-link">Bébé & Enfant</a></li>
        <li class="nav-item"><a href="/pages/marques" class="nav-link">Marques</a></li>
        <li class="nav-item"><a href="/collections/korean-beauty" class="nav-link">Korean Beauty</a></li>
        <li class="nav-item"><a href="/collections/idees-cadeaux" class="nav-link">Idées Cadeaux</a></li>
      </ul>

      <!-- Menu mobile (hamburger) -->
      <button class="mobile-menu-toggle" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</header>

{% schema %}
{
  "name": "Header",
  "settings": [
    {
      "type": "image_picker",
      "id": "logo",
      "label": "Logo"
    },
    {
      "type": "text",
      "id": "announcement_text",
      "label": "Texte bandeau USP",
      "default": "🚚 Livraison en moins de 24h à Dakar"
    }
  ]
}
{% endschema %}
```

---

## 🛍️ 2. Carte Produit avec Badge Promo

### `snippets/product-card.liquid`

```liquid
{% comment %}
  Carte produit FlawlessBeauty
  Usage: {% render 'product-card', product: product %}
{% endcomment %}

<div class="product-card">
  <a href="{{ product.url }}" class="product-link">
    
    <!-- Image produit -->
    <div class="product-image">
      {% if product.featured_image %}
        {{ product.featured_image | img_url: '600x' | img_tag: product.title, loading: 'lazy' }}
      {% else %}
        {{ 'product-placeholder.svg' | asset_url | img_tag: 'Pas d\'image' }}
      {% endif %}

      <!-- Badge Promo -->
      {% if product.compare_at_price > product.price %}
        {% assign discount = product.compare_at_price | minus: product.price | times: 100 | divided_by: product.compare_at_price %}
        <span class="product-badge promo">-{{ discount }}%</span>
      {% endif %}

      <!-- Badge Nouveau -->
      {% assign days_since_creation = 'now' | date: '%s' | minus: product.created_at | date: '%s' | divided_by: 86400 %}
      {% if days_since_creation < 30 %}
        <span class="product-badge new">Nouveau</span>
      {% endif %}

      <!-- Badge Rupture -->
      {% unless product.available %}
        <span class="product-badge out-of-stock">Rupture</span>
      {% endunless %}
    </div>

    <!-- Infos produit -->
    <div class="product-info">
      <!-- Marque (Vendor) -->
      {% if product.vendor %}
        <p class="product-vendor">{{ product.vendor }}</p>
      {% endif %}

      <!-- Titre -->
      <h3 class="product-title">{{ product.title | truncate: 60 }}</h3>

      <!-- Note (si app avis installée) -->
      {% if product.metafields.reviews.rating %}
        <div class="product-rating">
          {% assign rating = product.metafields.reviews.rating %}
          <span class="stars">
            {% for i in (1..5) %}
              {% if i <= rating %}★{% else %}☆{% endif %}
            {% endfor %}
          </span>
          <span class="rating-count">({{ product.metafields.reviews.count }})</span>
        </div>
      {% endif %}

      <!-- Prix -->
      <div class="product-price">
        {% if product.compare_at_price > product.price %}
          <span class="price-compare">
            {{ product.compare_at_price | money_without_currency | append: ' CFA' }}
          </span>
        {% endif %}
        <span class="price-current">
          {{ product.price | money_without_currency | append: ' CFA' }}
        </span>
      </div>

      <!-- Boutons -->
      <div class="product-actions">
        {% if product.available %}
          <button 
            type="button" 
            class="btn btn-primary add-to-cart-btn"
            data-product-id="{{ product.id }}"
            data-variant-id="{{ product.selected_or_first_available_variant.id }}"
          >
            🛒 Ajouter au panier
          </button>
        {% else %}
          <button class="btn btn-disabled" disabled>
            Rupture de stock
          </button>
        {% endif %}
        
        <a href="{{ product.url }}" class="btn btn-secondary">
          Voir les détails
        </a>
      </div>
    </div>
  </a>
</div>
```

---

## 💰 3. Snippet Prix en CFA

### `snippets/price-cfa.liquid`

```liquid
{% comment %}
  Affiche un prix formaté en CFA
  Usage: {% render 'price-cfa', price: product.price %}
{% endcomment %}

{% assign price_number = price | money_without_currency %}
<span class="price-cfa">{{ price_number }} CFA</span>
```

---

## 🧭 4. Fil d'Ariane (Breadcrumbs)

### `snippets/breadcrumbs.liquid`

```liquid
{% comment %}
  Fil d'Ariane FlawlessBeauty
  Usage: {% render 'breadcrumbs' %}
{% endcomment %}

<nav class="breadcrumbs" aria-label="Fil d'Ariane">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    
    <!-- Accueil -->
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a href="/" itemprop="item">
        <span itemprop="name">Accueil</span>
      </a>
      <meta itemprop="position" content="1" />
    </li>

    <!-- Collection -->
    {% if collection %}
      <li class="breadcrumb-separator">/</li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="/collections" itemprop="item">
          <span itemprop="name">Boutique</span>
        </a>
        <meta itemprop="position" content="2" />
      </li>
      
      <li class="breadcrumb-separator">/</li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="active">
        <span itemprop="name">{{ collection.title }}</span>
        <meta itemprop="position" content="3" />
      </li>
    {% endif %}

    <!-- Produit -->
    {% if product %}
      <li class="breadcrumb-separator">/</li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="/collections" itemprop="item">
          <span itemprop="name">Boutique</span>
        </a>
        <meta itemprop="position" content="2" />
      </li>
      
      {% if product.collections.first %}
        <li class="breadcrumb-separator">/</li>
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <a href="{{ product.collections.first.url }}" itemprop="item">
            <span itemprop="name">{{ product.collections.first.title }}</span>
          </a>
          <meta itemprop="position" content="3" />
        </li>
      {% endif %}
      
      <li class="breadcrumb-separator">/</li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="active">
        <span itemprop="name">{{ product.title | truncate: 40 }}</span>
        <meta itemprop="position" content="4" />
      </li>
    {% endif %}

    <!-- Page -->
    {% if page %}
      <li class="breadcrumb-separator">/</li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="active">
        <span itemprop="name">{{ page.title }}</span>
        <meta itemprop="position" content="2" />
      </li>
    {% endif %}

  </ol>
</nav>
```

---

## 📦 5. Collection (Catalog) avec Filtres et Tri

### `templates/collection.liquid`

```liquid
{% comment %}
  Page collection/catalogue avec filtres et tri
{% endcomment %}

<div class="page-collection">
  <div class="container">
    
    <!-- Breadcrumbs -->
    {% render 'breadcrumbs' %}

    <!-- En-tête collection -->
    <header class="collection-header">
      <h1>{{ collection.title }}</h1>
      {% if collection.description != blank %}
        <div class="collection-description">
          {{ collection.description }}
        </div>
      {% endif %}
    </header>

    <!-- Barre de filtres & tri -->
    <div class="collection-toolbar">
      
      <!-- Nombre de produits -->
      <div class="collection-count">
        <p>{{ collection.products_count }} produit{% if collection.products_count > 1 %}s{% endif %}</p>
      </div>

      <!-- Tri -->
      <div class="collection-sort">
        <label for="sort-by">Trier par :</label>
        <select id="sort-by" name="sort_by">
          <option value="manual">Mis en avant</option>
          <option value="best-selling">Meilleures ventes</option>
          <option value="title-ascending">Nom (A-Z)</option>
          <option value="title-descending">Nom (Z-A)</option>
          <option value="price-ascending">Prix croissant</option>
          <option value="price-descending">Prix décroissant</option>
          <option value="created-descending">Nouveautés</option>
          <option value="created-ascending">Plus anciens</option>
        </select>
      </div>

      <!-- Produits par page -->
      <div class="products-per-page">
        <label>Afficher :</label>
        <button class="btn-per-page" data-limit="16">16</button>
        <button class="btn-per-page" data-limit="32">32</button>
        <button class="btn-per-page active" data-limit="48">48</button>
      </div>
    </div>

    <!-- Filtres (avec app Product Filter) -->
    <div class="collection-content">
      <aside class="collection-filters">
        <!-- Filtres s'affichent ici via l'app -->
        <div id="product-filters">
          <!-- Prix, Marque, etc. -->
        </div>
      </aside>

      <!-- Grille produits -->
      <div class="collection-products">
        <div class="product-grid">
          {% for product in collection.products %}
            {% render 'product-card', product: product %}
          {% else %}
            <p class="no-products">Aucun produit dans cette collection.</p>
          {% endfor %}
        </div>

        <!-- Pagination -->
        {% if paginate.pages > 1 %}
          <nav class="pagination" aria-label="Pagination">
            
            <!-- Précédent -->
            {% if paginate.previous %}
              <a href="{{ paginate.previous.url }}" class="pagination-link">
                ← Précédent
              </a>
            {% endif %}

            <!-- Numéros de page -->
            <div class="pagination-numbers">
              {% for part in paginate.parts %}
                {% if part.is_link %}
                  <a href="{{ part.url }}" class="pagination-number">{{ part.title }}</a>
                {% else %}
                  {% if part.title == '&hellip;' %}
                    <span class="pagination-ellipsis">...</span>
                  {% else %}
                    <span class="pagination-number active">{{ part.title }}</span>
                  {% endif %}
                {% endif %}
              {% endfor %}
            </div>

            <!-- Suivant -->
            {% if paginate.next %}
              <a href="{{ paginate.next.url }}" class="pagination-link">
                Suivant →
              </a>
            {% endif %}

            <!-- Info page -->
            <p class="pagination-info">
              Page {{ paginate.current_page }} sur {{ paginate.pages }}
            </p>
          </nav>
        {% endif %}
      </div>
    </div>

  </div>
</div>

<script>
  // Tri dynamique
  document.getElementById('sort-by').addEventListener('change', function() {
    const url = new URL(window.location.href);
    url.searchParams.set('sort_by', this.value);
    window.location.href = url.toString();
  });

  // Produits par page
  document.querySelectorAll('.btn-per-page').forEach(btn => {
    btn.addEventListener('click', function() {
      const url = new URL(window.location.href);
      url.searchParams.set('limit', this.dataset.limit);
      window.location.href = url.toString();
    });
  });
</script>

{% paginate collection.products by 48 %}
  <!-- Le contenu paginé s'affiche ici -->
{% endpaginate %}
```

---

## 🦶 6. Footer

### `sections/footer.liquid`

```liquid
<footer class="site-footer">
  <div class="footer-top">
    <div class="container">
      <div class="footer-columns">
        
        <!-- Catégories -->
        <div class="footer-column">
          <h3>Catégories</h3>
          <ul>
            <li><a href="/collections/promotion">Cadeau & Promo</a></li>
            <li><a href="/collections/cheveux">Cheveux</a></li>
            <li><a href="/collections/corps-bain">Corps & Bain</a></li>
            <li><a href="/collections/maquillage">Maquillage</a></li>
            <li><a href="/collections/parapharmacie">Parapharmacie</a></li>
          </ul>
        </div>

        <!-- Infos pratiques -->
        <div class="footer-column">
          <h3>Infos pratiques</h3>
          <ul>
            <li><a href="/pages/marques">Nos Marques</a></li>
            <li><a href="/account">Mon compte</a></li>
            <li><a href="/blogs/news">Blog</a></li>
            <li><a href="/pages/conditions">Conditions d'utilisation</a></li>
            <li><a href="/pages/livraison">Livraison</a></li>
            <li><a href="/pages/cookies">Politique cookies</a></li>
          </ul>
        </div>

        <!-- Paiement sécurisé -->
        <div class="footer-column">
          <h3>Paiement sécurisé</h3>
          <div class="payment-icons">
            <img src="{{ 'orange-money.png' | asset_url }}" alt="Orange Money" loading="lazy">
            <img src="{{ 'wave.png' | asset_url }}" alt="Wave" loading="lazy">
            <img src="{{ 'visa.png' | asset_url }}" alt="Visa" loading="lazy">
            <img src="{{ 'mastercard.png' | asset_url }}" alt="Mastercard" loading="lazy">
          </div>
        </div>

        <!-- Newsletter -->
        <div class="footer-column">
          <h3>Newsletter</h3>
          <p>Recevez nos offres exclusives</p>
          <form action="/contact#newsletter" method="post" class="newsletter-form">
            <input type="hidden" name="contact[tags]" value="newsletter">
            <input 
              type="email" 
              name="contact[email]" 
              placeholder="Votre email"
              required
            >
            <button type="submit">S'inscrire</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container">
      <p class="copyright">
        © {{ 'now' | date: '%Y' }} {{ shop.name }}. Tous droits réservés.
      </p>
      <p class="credits">
        Site réalisé par <a href="https://votre-agence.com" target="_blank">Votre Agence</a>
      </p>
      <button class="back-to-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
        ↑ Retour en haut
      </button>
    </div>
  </div>
</footer>

{% schema %}
{
  "name": "Footer",
  "settings": []
}
{% endschema %}
```

---

## 🎨 7. CSS Personnalisé

### `assets/custom.css`

```css
/**
 * CSS FlawlessBeauty pour Shopify
 */

/* Variables */
:root {
  --primary: #D946EF;
  --secondary: #0EA5E9;
  --text: #1F2937;
  --text-light: #6B7280;
  --bg: #FFFFFF;
  --bg-light: #F9FAFB;
  --border: #E5E7EB;
  --success: #10B981;
  --error: #EF4444;
  --warning: #F59E0B;
  
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 40px;
  
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 9999px;
  
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 40px rgba(0,0,0,0.1);
}

/* Typographie */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: var(--text);
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
}

/* Container */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

/* Bandeau USP */
.announcement-bar {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  text-align: center;
  padding: var(--spacing-md);
  font-weight: 600;
  font-size: 14px;
}

/* Header */
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  box-shadow: var(--shadow-sm);
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  gap: var(--spacing-xl);
}

.header-logo img {
  max-height: 50px;
  width: auto;
}

/* Recherche */
.header-search {
  flex: 1;
  max-width: 600px;
}

.header-search form {
  position: relative;
  display: flex;
}

.header-search input {
  flex: 1;
  padding: 12px 50px 12px 20px;
  border: 2px solid var(--border);
  border-radius: var(--radius-full);
  font-size: 16px;
  transition: all 0.3s;
}

.header-search input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(217, 70, 239, 0.1);
}

.header-search button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: var(--spacing-sm);
}

/* Icônes header */
.header-icons {
  display: flex;
  gap: var(--spacing-lg);
}

.header-icon {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text);
  text-decoration: none;
  transition: color 0.3s;
  position: relative;
}

.header-icon:hover {
  color: var(--primary);
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--error);
  color: white;
  font-size: 12px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Navigation */
.main-navigation {
  background: var(--bg-light);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--spacing-sm);
}

.nav-link {
  display: block;
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--primary);
  background: rgba(217, 70, 239, 0.05);
}

/* Méga-menu */
.mega-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-xl);
  min-width: 600px;
  z-index: 100;
  border-radius: var(--radius-md);
  margin-top: var(--spacing-sm);
}

.has-dropdown:hover .mega-menu {
  display: block;
}

.mega-menu-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
}

.mega-menu-column h3 {
  font-size: 14px;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-md);
}

.mega-menu-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mega-menu-column ul li {
  margin-bottom: var(--spacing-sm);
}

.mega-menu-column a {
  color: var(--text);
  text-decoration: none;
  transition: color 0.3s;
}

.mega-menu-column a:hover {
  color: var(--primary);
}

/* Grille produits */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-xl);
  padding: var(--spacing-xl) 0;
}

/* Carte produit */
.product-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all 0.3s;
  background: white;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.product-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--bg-light);
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

/* Badges */
.product-badge {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  padding: 6px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  z-index: 10;
}

.product-badge.promo {
  background: var(--error);
  color: white;
}

.product-badge.new {
  background: var(--success);
  color: white;
}

.product-badge.out-of-stock {
  background: var(--text-light);
  color: white;
}

/* Infos produit */
.product-info {
  padding: var(--spacing-lg);
}

.product-vendor {
  font-size: 12px;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-xs);
}

.product-title {
  font-size: 16px;
  margin: var(--spacing-sm) 0;
  color: var(--text);
}

/* Prix */
.product-price {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin: var(--spacing-md) 0;
}

.price-compare {
  text-decoration: line-through;
  color: var(--text-light);
  font-size: 14px;
}

.price-current {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary);
}

/* Boutons */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: #C026D3;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: white;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-secondary:hover {
  background: var(--primary);
  color: white;
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  margin: var(--spacing-xl) 0;
}

.pagination-numbers {
  display: flex;
  gap: var(--spacing-xs);
}

.pagination-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  text-decoration: none;
  color: var(--text);
  transition: all 0.3s;
}

.pagination-number:hover,
.pagination-number.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

/* Footer */
.site-footer {
  background: var(--text);
  color: white;
  margin-top: var(--spacing-xl);
}

.footer-top {
  padding: var(--spacing-xl) 0;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.footer-column h3 {
  font-size: 16px;
  margin-bottom: var(--spacing-md);
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column ul li {
  margin-bottom: var(--spacing-sm);
}

.footer-column a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-column a:hover {
  color: white;
}

.payment-icons {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.payment-icons img {
  height: 30px;
  width: auto;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--spacing-lg) 0;
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

/* Responsive */
@media (max-width: 768px) {
  .header-wrapper {
    flex-wrap: wrap;
  }
  
  .header-search {
    order: 3;
    width: 100%;
    max-width: none;
  }
  
  .main-navigation .nav-menu {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--spacing-md);
  }
}
```

---

## 🎯 Instructions d'Installation

1. **Accédez à l'éditeur de thème** :
   ```
   Shopify Admin → Boutique en ligne → Thèmes → Actions → Modifier le code
   ```

2. **Créez les fichiers** :
   - Copiez chaque template dans le bon dossier
   - `sections/` pour les sections
   - `snippets/` pour les snippets
   - `assets/` pour CSS/JS

3. **Importez le CSS** :
   - Créez `assets/custom.css`
   - Ajoutez dans `layout/theme.liquid` :
     ```liquid
     {{ 'custom.css' | asset_url | stylesheet_tag }}
     ```

4. **Activez les sections** :
   ```
   Boutique en ligne → Thèmes → Personnaliser
   ```

---

## ✅ Checklist

- [ ] Header avec bandeau USP créé
- [ ] Méga-menu configuré
- [ ] Carte produit avec badges implémentée
- [ ] Fil d'Ariane ajouté
- [ ] Page collection avec filtres/tri
- [ ] Footer avec paiements
- [ ] CSS personnalisé importé
- [ ] Responsive testé

---

**Ces templates sont prêts à l'emploi ! 🚀**

*Dernière mise à jour : 12 octobre 2025*
