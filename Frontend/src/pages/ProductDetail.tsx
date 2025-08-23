import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw, 
  Share2,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Check,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { StarRating } from '@/components/StarRating';
import { ProductReviews } from '@/components/ProductReviews';
import { WishlistButton } from '@/components/WishlistButton';
import { mockPromoProducts } from '@/lib/mock-data';
import { formatCFA } from '@/lib/utils/price-utils';

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  // Find product (in real app, this would be an API call)
  const product = mockPromoProducts.find(p => p.id === id);

  // Mock additional product data
  const productImages: ProductImage[] = [
    { id: '1', url: product?.imageUrl || '/placeholder.svg', alt: product?.name || 'Product' },
    { id: '2', url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&w=400&h=400&fit=crop', alt: 'Product view 2' },
    { id: '3', url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&w=400&h=400&fit=crop', alt: 'Product view 3' },
    { id: '4', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&w=400&h=400&fit=crop', alt: 'Product view 4' }
  ];

  const variants = [
    { id: 'size-30ml', name: '30ml', inStock: true },
    { id: 'size-50ml', name: '50ml', inStock: true },
    { id: 'size-100ml', name: '100ml', inStock: false }
  ];

  const relatedProducts = mockPromoProducts
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  useEffect(() => {
    if (!product) {
      navigate('/not-found');
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    if (!selectedVariant && variants.length > 0) {
      toast({
        title: "Veuillez sélectionner une variante",
        description: "Choisissez une taille avant d'ajouter au panier",
        variant: "destructive"
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand || '',
      price: product.priceCents / 100,
      image: product.imageUrl
    });
    
    // Update quantity if different from 1
    if (quantity > 1) {
      // The addItem already adds 1, so we need to add (quantity - 1) more
      for (let i = 1; i < quantity; i++) {
        addItem({
          id: product.id,
          name: product.name,
          brand: product.brand || '',
          price: product.priceCents / 100,
          image: product.imageUrl
        });
      }
    }

    toast({
      title: "Produit ajouté au panier",
      description: `${quantity}x ${product.name}`,
    });
  };

  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.priceCents / 100,
      originalPrice: product.oldPriceCents ? product.oldPriceCents / 100 : undefined,
      image: product.imageUrl,
      brand: product.brand || '',
      rating: product.rating || 0,
      inStock: (product.stock || 0) > 0,
      category: product.category
    };

    if (isInWishlist(product.id)) {
      toast({
        title: "Retiré des favoris",
        description: product.name,
      });
    } else {
      addToWishlist(wishlistItem);
      toast({
        title: "Ajouté aux favoris",
        description: product.name,
      });
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <>
      <Helmet>
        <title>{product.name} - Flawless Beauty</title>
        <meta name="description" content={`${product.name} par ${product.brand}. Prix : ${formatCFA(product.priceCents)}. Livraison gratuite.`} />
        <meta property="og:title" content={`${product.name} - Flawless Beauty`} />
        <meta property="og:description" content={`${product.name} par ${product.brand}. Prix : ${formatCFA(product.priceCents)}`} />
        <meta property="og:image" content={product.imageUrl} />
        <meta property="product:price:amount" content={product.priceCents.toString()} />
        <meta property="product:price:currency" content="XOF" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Accueil</Link>
              <span>/</span>
              <Link to="/promotions" className="hover:text-primary">Promotions</Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <img
                  src={productImages[selectedImageIndex].url}
                  alt={productImages[selectedImageIndex].alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                
                {/* Navigation arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 shadow-md"
                  aria-label="Image précédente"
                  title="Image précédente"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 shadow-md"
                  aria-label="Image suivante"
                  title="Image suivante"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Discount badge */}
                {product.oldPriceCents && (
                  <Badge className="absolute top-4 left-4 bg-urgent text-urgent-foreground">
                    -{product.discountPercentage}%
                  </Badge>
                )}
              </div>

              {/* Thumbnail images */}
              <div className="flex space-x-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                      index === selectedImageIndex ? 'border-primary' : 'border-border'
                    }`}
                    aria-label={`Voir l'image ${index + 1}`}
                    title={`Voir l'image ${index + 1}`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold font-playfair mb-2">{product.name}</h1>
                <p className="text-lg text-muted-foreground">{product.brand}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <StarRating rating={product.rating || 0} showNumber={false} />
                <span className="text-sm text-muted-foreground">
                  {product.rating?.toFixed(1)} ({product.reviewCount} avis)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-primary">
                    {formatCFA(product.priceCents)}
                  </span>
                  {product.oldPriceCents && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatCFA(product.oldPriceCents)}
                    </span>
                  )}
                </div>
                {product.oldPriceCents && (
                  <p className="text-sm text-success">
                    Vous économisez {formatCFA(product.savings)}
                  </p>
                )}
              </div>

              {/* Stock status */}
              <div className="flex items-center space-x-2">
                {(product.stock || 0) > 0 ? (
                  <>
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm text-success">En stock ({product.stock} disponibles)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-urgent" />
                    <span className="text-sm text-urgent">Rupture de stock</span>
                  </>
                )}
              </div>

              {/* Variants */}
              {variants.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Taille</h3>
                  <div className="flex space-x-2">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        disabled={!variant.inStock}
                        className={`px-4 py-2 rounded-md border ${
                          selectedVariant === variant.id
                            ? 'border-primary bg-primary text-primary-foreground'
                            : variant.inStock
                            ? 'border-border hover:border-primary'
                            : 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                        }`}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="space-y-3">
                <h3 className="font-semibold">Quantité</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-md border border-border hover:bg-muted"
                    aria-label="Diminuer la quantité"
                    title="Diminuer la quantité"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border border-border rounded-md min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-md border border-border hover:bg-muted"
                    aria-label="Augmenter la quantité"
                    title="Augmenter la quantité"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full"
                  size="lg"
                  disabled={(product.stock || 0) === 0}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Ajouter au panier
                </Button>

                <div className="flex space-x-3">
                  <WishlistButton
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.priceCents / 100,
                      originalPrice: product.oldPriceCents ? product.oldPriceCents / 100 : undefined,
                      image: product.imageUrl,
                      brand: product.brand || '',
                      rating: product.rating || 0,
                      inStock: (product.stock || 0) > 0,
                      category: product.category
                    }}
                    variant="default"
                    className="flex-1"
                  />
                  <Button variant="outline" size="lg">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex items-center space-x-3 text-sm">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>Livraison gratuite dès 25,000 CFA</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Produits authentiques garantis</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <RotateCcw className="w-4 h-4 text-primary" />
                  <span>Retour gratuit sous 30 jours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingrédients</TabsTrigger>
              <TabsTrigger value="reviews">Avis ({product.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.name} est un produit premium de la marque {product.brand}. 
                      Formulé avec des ingrédients de haute qualité, ce produit offre des résultats 
                      exceptionnels pour votre routine beauté. Sa texture unique et sa formule 
                      avancée en font un choix idéal pour tous types de peau.
                    </p>
                    
                    <h3 className="font-semibold mt-6 mb-3">Avantages principaux :</h3>
                    <ul className="space-y-2">
                      {product.tags?.map((tag, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-success flex-shrink-0" />
                          <span>{tag}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="font-semibold mt-6 mb-3">Mode d'emploi :</h3>
                    <p className="text-muted-foreground">
                      Appliquer une petite quantité sur peau propre et sèche. 
                      Masser délicatement jusqu'à absorption complète. 
                      Utiliser matin et/ou soir selon vos besoins.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ingredients" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <h3 className="font-semibold mb-4">Liste des ingrédients :</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Aqua, Glycerin, Sodium Hyaluronate, Vitamin C (Ascorbic Acid), 
                      Niacinamide, Panthenol, Tocopherol, Allantoin, Carbomer, 
                      Phenoxyethanol, Ethylhexylglycerin, Parfum.
                    </p>
                    
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <p className="text-sm">
                        <strong>Note :</strong> Cette liste d'ingrédients peut être amenée à évoluer. 
                        Nous vous conseillons de vous référer à l'emballage du produit pour 
                        obtenir la liste exacte des ingrédients.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <ProductReviews
                productId={product.id}
                averageRating={product.rating}
                totalReviews={product.reviewCount}
              />
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold font-playfair mb-6">Produits similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <Link to={`/product/${relatedProduct.id}`}>
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={relatedProduct.imageUrl}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                          {relatedProduct.oldPriceCents && (
                            <Badge className="absolute top-2 right-2 bg-urgent text-urgent-foreground">
                              -{relatedProduct.discountPercentage}%
                            </Badge>
                          )}
                        </div>
                      </Link>
                      
                      <div className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">
                          {relatedProduct.brand}
                        </div>
                        <Link to={`/product/${relatedProduct.id}`}>
                          <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary">
                            {relatedProduct.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center space-x-1 mb-3">
                          <StarRating 
                            rating={relatedProduct.rating || 0} 
                            size="sm" 
                            showNumber={false}
                          />
                          <span className="text-xs text-muted-foreground">
                            ({relatedProduct.reviewCount})
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-primary">
                              {formatCFA(relatedProduct.priceCents)}
                            </span>
                            {relatedProduct.oldPriceCents && (
                              <span className="text-sm text-muted-foreground line-through">
                                {formatCFA(relatedProduct.oldPriceCents)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}