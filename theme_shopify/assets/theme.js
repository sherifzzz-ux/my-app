/**
 * FlawlessBeauty Theme JavaScript
 * Main theme functionality
 */

(function() {
  'use strict';

  // ===== UTILITIES =====
  const debounce = (func, wait = 100) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // ===== CART MANAGEMENT =====
  class Cart {
    constructor() {
      this.init();
    }

    init() {
      this.updateCartCount();
      this.setupEventListeners();
    }

    setupEventListeners() {
      // Add to cart buttons
      document.querySelectorAll('[data-add-to-cart]').forEach(button => {
        button.addEventListener('click', (e) => this.addToCart(e));
      });

      // Cart drawer toggle
      const cartToggle = document.querySelector('[data-cart-toggle]');
      if (cartToggle) {
        cartToggle.addEventListener('click', () => this.openDrawer());
      }
    }

    async addToCart(event) {
      event.preventDefault();
      const button = event.currentTarget;
      const variantId = button.dataset.variantId;
      const quantity = button.dataset.quantity || 1;

      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [{
              id: variantId,
              quantity: parseInt(quantity)
            }]
          })
        });

        if (!response.ok) throw new Error('Failed to add to cart');

        const data = await response.json();
        this.updateCartCount();
        this.openDrawer();
        this.showNotification('Produit ajouté au panier !', 'success');
      } catch (error) {
        console.error('Error adding to cart:', error);
        this.showNotification('Erreur lors de l\'ajout au panier', 'error');
      }
    }

    async updateCartCount() {
      try {
        const response = await fetch('/cart.js');
        const cart = await response.json();
        const countElements = document.querySelectorAll('[data-cart-count]');
        
        countElements.forEach(element => {
          element.textContent = cart.item_count;
          element.style.display = cart.item_count > 0 ? 'flex' : 'none';
        });
      } catch (error) {
        console.error('Error updating cart count:', error);
      }
    }

    openDrawer() {
      window.dispatchEvent(new CustomEvent('cart-open'));
    }

    showNotification(message, type = 'info') {
      // Create notification element
      const notification = document.createElement('div');
      notification.className = `notification notification--${type}`;
      notification.textContent = message;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
      `;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }
  }

  // ===== SEARCH FUNCTIONALITY =====
  class Search {
    constructor() {
      this.searchInput = document.querySelector('[name="q"]');
      this.searchForm = document.querySelector('.search-form');
      this.init();
    }

    init() {
      if (!this.searchInput) return;

      // Add search suggestions (basic implementation)
      this.searchInput.addEventListener('input', debounce((e) => {
        this.handleSearch(e.target.value);
      }, 300));
    }

    async handleSearch(query) {
      if (query.length < 2) return;

      try {
        const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product`);
        const data = await response.json();
        this.showSuggestions(data.resources.results.products);
      } catch (error) {
        console.error('Search error:', error);
      }
    }

    showSuggestions(products) {
      // Basic suggestion display
      // You can enhance this with a dropdown component
      console.log('Search suggestions:', products);
    }
  }

  // ===== IMAGE LAZY LOADING =====
  class LazyLoad {
    constructor() {
      this.images = document.querySelectorAll('img[loading="lazy"]');
      this.init();
    }

    init() {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const image = entry.target;
              this.loadImage(image);
              imageObserver.unobserve(image);
            }
          });
        });

        this.images.forEach(img => imageObserver.observe(img));
      } else {
        // Fallback for older browsers
        this.images.forEach(img => this.loadImage(img));
      }
    }

    loadImage(image) {
      if (image.dataset.src) {
        image.src = image.dataset.src;
        image.classList.add('loaded');
      }
    }
  }

  // ===== PRODUCT VARIANTS =====
  class ProductVariants {
    constructor(form) {
      this.form = form;
      this.selects = form.querySelectorAll('.variant-select');
      this.init();
    }

    init() {
      this.selects.forEach(select => {
        select.addEventListener('change', () => this.handleVariantChange());
      });
    }

    handleVariantChange() {
      const selectedOptions = Array.from(this.selects).map(select => select.value);
      // Find matching variant
      // Update price, availability, etc.
      console.log('Selected options:', selectedOptions);
    }
  }

  // ===== QUANTITY SELECTOR =====
  class QuantitySelector {
    constructor() {
      this.setupQuantityButtons();
    }

    setupQuantityButtons() {
      // Increase quantity
      document.querySelectorAll('.qty-increase').forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const input = button.parentElement.querySelector('input[type="number"]');
          input.value = parseInt(input.value) + 1;
          input.dispatchEvent(new Event('change'));
        });
      });

      // Decrease quantity
      document.querySelectorAll('.qty-decrease').forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const input = button.parentElement.querySelector('input[type="number"]');
          const currentValue = parseInt(input.value);
          if (currentValue > 1) {
            input.value = currentValue - 1;
            input.dispatchEvent(new Event('change'));
          }
        });
      });
    }
  }

  // ===== SCROLL EFFECTS =====
  class ScrollEffects {
    constructor() {
      this.header = document.querySelector('.header');
      this.lastScroll = 0;
      this.init();
    }

    init() {
      window.addEventListener('scroll', debounce(() => {
        this.handleScroll();
      }, 10));
    }

    handleScroll() {
      const currentScroll = window.pageYOffset;

      // Add shadow to header on scroll
      if (currentScroll > 10) {
        this.header?.classList.add('scrolled');
      } else {
        this.header?.classList.remove('scrolled');
      }

      // Hide/show header on scroll (optional)
      if (currentScroll > this.lastScroll && currentScroll > 500) {
        this.header?.classList.add('header--hidden');
      } else {
        this.header?.classList.remove('header--hidden');
      }

      this.lastScroll = currentScroll;
    }
  }

  // ===== MOBILE MENU =====
  class MobileMenu {
    constructor() {
      this.menuToggle = document.querySelector('.mobile-menu-toggle');
      this.menu = document.querySelector('.mobile-menu');
      this.init();
    }

    init() {
      if (!this.menuToggle || !this.menu) return;

      this.menuToggle.addEventListener('click', () => {
        this.toggleMenu();
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.menu.classList.contains('open')) {
          this.closeMenu();
        }
      });
    }

    toggleMenu() {
      this.menu.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    }

    closeMenu() {
      this.menu.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  }

  // ===== FORM VALIDATION =====
  class FormValidation {
    constructor() {
      this.forms = document.querySelectorAll('form[data-validate]');
      this.init();
    }

    init() {
      this.forms.forEach(form => {
        form.addEventListener('submit', (e) => {
          if (!this.validateForm(form)) {
            e.preventDefault();
          }
        });
      });
    }

    validateForm(form) {
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required]');

      inputs.forEach(input => {
        if (!input.value.trim()) {
          this.showError(input, 'Ce champ est requis');
          isValid = false;
        } else {
          this.clearError(input);
        }

        // Email validation
        if (input.type === 'email' && input.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            this.showError(input, 'Email invalide');
            isValid = false;
          }
        }
      });

      return isValid;
    }

    showError(input, message) {
      input.classList.add('error');
      let errorMsg = input.parentElement.querySelector('.error-message');
      
      if (!errorMsg) {
        errorMsg = document.createElement('span');
        errorMsg.className = 'error-message';
        input.parentElement.appendChild(errorMsg);
      }
      
      errorMsg.textContent = message;
    }

    clearError(input) {
      input.classList.remove('error');
      const errorMsg = input.parentElement.querySelector('.error-message');
      if (errorMsg) errorMsg.remove();
    }
  }

  // ===== ACCESSIBILITY =====
  class Accessibility {
    constructor() {
      this.init();
    }

    init() {
      // Add keyboard navigation support
      this.setupKeyboardNav();
      
      // Add focus visible class
      this.setupFocusVisible();
    }

    setupKeyboardNav() {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-nav');
        }
      });

      document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
      });
    }

    setupFocusVisible() {
      const style = document.createElement('style');
      style.textContent = `
        .keyboard-nav *:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ===== PERFORMANCE MONITORING =====
  class Performance {
    constructor() {
      this.init();
    }

    init() {
      // Log page load time
      window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
      });
    }
  }

  // ===== INITIALIZE THEME =====
  function initTheme() {
    console.log('🎨 FlawlessBeauty Theme initialized');

    // Initialize all modules
    new Cart();
    new Search();
    new LazyLoad();
    new QuantitySelector();
    new ScrollEffects();
    new MobileMenu();
    new FormValidation();
    new Accessibility();
    new Performance();

    // Initialize product forms
    document.querySelectorAll('#product-form').forEach(form => {
      new ProductVariants(form);
    });

    // Announce that theme is ready
    document.dispatchEvent(new CustomEvent('theme:loaded'));
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    .header--hidden {
      transform: translateY(-100%);
      transition: transform 0.3s ease;
    }

    body.menu-open {
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);

})();
