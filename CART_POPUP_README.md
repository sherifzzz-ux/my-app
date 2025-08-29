# Popup d'Ajout au Panier - Guide d'Utilisation

Ce guide explique comment utiliser les différents composants de popup pour l'ajout au panier dans votre application Mami-shop.

## 🎯 Composants Disponibles

### 1. CartPopup (Popup Modal)
Un popup modal élégant qui s'affiche au centre de l'écran avec des animations fluides.

**Fichier:** `components/ui/cart-popup.tsx`

**Caractéristiques:**
- ✅ Popup modal centré avec backdrop
- ✅ Animation d'entrée/sortie fluide
- ✅ Auto-fermeture après 5 secondes
- ✅ Affichage des informations du produit (image, nom, marque, prix, quantité)
- ✅ Boutons d'action (Voir le panier, Continuer les achats)
- ✅ Design responsive et moderne

### 2. CartToast (Toast Personnalisé)
Un toast avec design personnalisé qui s'intègre dans le système de toast existant.

**Fichier:** `components/ui/cart-toast.tsx`

**Caractéristiques:**
- ✅ Intégration avec le système de toast existant
- ✅ Design compact et informatif
- ✅ Affichage des détails du produit
- ✅ Bouton d'action intégré

### 3. AddToCartButton (Avec Popup Modal)
Bouton d'ajout au panier qui affiche automatiquement le popup modal.

**Fichier:** `components/product/AddToCartButton.tsx`

**Caractéristiques:**
- ✅ Utilise le popup modal par défaut
- ✅ Gestion automatique de l'état du popup
- ✅ Intégration avec le hook useCart
- ✅ Boutons d'action fonctionnels

### 4. AddToCartButtonWithToast (Avec Toast Personnalisé)
Version alternative qui utilise le toast personnalisé au lieu du popup modal.

**Fichier:** `components/product/AddToCartButtonWithToast.tsx`

**Caractéristiques:**
- ✅ Utilise le toast personnalisé
- ✅ Intégration avec le système de toast existant
- ✅ Design plus compact

## 🚀 Comment Utiliser

### Utilisation Basique - Popup Modal

```tsx
import AddToCartButton from '@/components/product/AddToCartButton'

function ProductCard({ product }) {
  return (
    <AddToCartButton
      productId={product.id}
      name={product.name}
      brand={product.brand}
      priceCents={product.priceCents}
      imageUrl={product.imageUrl}
      quantity={1}
    />
  )
}
```

### Utilisation Basique - Toast Personnalisé

```tsx
import AddToCartButtonWithToast from '@/components/product/AddToCartButtonWithToast'

function ProductCard({ product }) {
  return (
    <AddToCartButtonWithToast
      productId={product.id}
      name={product.name}
      brand={product.brand}
      priceCents={product.priceCents}
      imageUrl={product.imageUrl}
      quantity={1}
    />
  )
}
```

### Utilisation Avancée - Popup Contrôlé

```tsx
import { useState } from 'react'
import { CartPopup } from '@/components/ui/cart-popup'

function CustomAddToCart() {
  const [showPopup, setShowPopup] = useState(false)
  
  const handleAddToCart = () => {
    // Votre logique d'ajout au panier
    addToCart(product)
    setShowPopup(true)
  }
  
  return (
    <>
      <button onClick={handleAddToCart}>
        Ajouter au panier
      </button>
      
      <CartPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        product={{
          name: product.name,
          brand: product.brand,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1
        }}
        onViewCart={() => {
          setShowPopup(false)
          openCart() // Votre fonction pour ouvrir le panier
        }}
        onContinueShopping={() => setShowPopup(false)}
      />
    </>
  )
}
```

## 🎨 Personnalisation

### Personnaliser le Style du Popup

Vous pouvez modifier les classes CSS dans `cart-popup.tsx` :

```tsx
// Changer la couleur de fond
className="bg-white" // → "bg-blue-50"

// Changer la taille
className="max-w-md" // → "max-w-lg"

// Changer les couleurs des boutons
className="bg-blue-600 hover:bg-blue-700" // → "bg-green-600 hover:bg-green-700"
```

### Personnaliser le Style du Toast

Modifiez les classes dans `cart-toast.tsx` :

```tsx
// Changer la couleur de bordure
className="border-gray-200" // → "border-blue-200"

// Changer la couleur de fond
className="bg-white" // → "bg-blue-50"
```

## 🔧 Configuration

### Durée d'Auto-fermeture

Dans `cart-popup.tsx`, modifiez la valeur du timeout :

```tsx
// Auto-close after 5 seconds
const timer = setTimeout(() => {
  setIsVisible(false)
  setTimeout(() => onClose(), 300)
}, 5000) // ← Changez cette valeur (en millisecondes)
```

### Position du Toast

Dans `components/ui/toast.tsx`, modifiez la position du ToastViewport :

```tsx
className={cn(
  "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
  className
)}
```

## 📱 Responsive Design

Les composants sont conçus pour être responsive :

- **Mobile:** Popup plein écran avec padding
- **Tablet:** Popup centré avec taille adaptée
- **Desktop:** Popup avec ombre et animations

## 🎭 Animations

### Popup Modal
- **Entrée:** Scale + Opacity avec transition de 300ms
- **Sortie:** Scale + Opacity inverse
- **Backdrop:** Fade in/out avec backdrop-blur

### Toast
- **Entrée:** Slide depuis le haut (mobile) ou droite (desktop)
- **Sortie:** Fade out + slide

## 🧪 Test et Démonstration

Utilisez le composant `CartPopupExample` pour tester tous les types de popups :

```tsx
import CartPopupExample from '@/components/examples/CartPopupExample'

// Dans votre page de test
<CartPopupExample />
```

## 🔍 Dépannage

### Le popup ne s'affiche pas
1. Vérifiez que `isOpen` est bien `true`
2. Vérifiez que le composant est bien rendu dans le DOM
3. Vérifiez les erreurs dans la console

### Le toast ne s'affiche pas
1. Vérifiez que le composant `Toaster` est bien dans votre layout
2. Vérifiez que le hook `useToast` fonctionne
3. Vérifiez les erreurs dans la console

### Problèmes de style
1. Vérifiez que Tailwind CSS est bien configuré
2. Vérifiez que les classes CSS sont bien appliquées
3. Inspectez le DOM pour voir les classes appliquées

## 📚 Dépendances

- **React** 18+
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **Radix UI** pour les composants de base (toast)

## 🤝 Contribution

Pour améliorer ces composants :

1. Modifiez le composant concerné
2. Testez avec différents produits et quantités
3. Vérifiez la responsivité sur différents écrans
4. Mettez à jour ce README si nécessaire
