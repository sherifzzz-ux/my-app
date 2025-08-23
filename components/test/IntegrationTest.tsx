"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { usePromoCode } from '@/hooks/use-promo';
import { useIsMobile } from '@/hooks/use-mobile';
import AddToCartButton from '@/components/product/AddToCartButton';

import { WishlistButton } from '@/components/wishlist/WishlistButton';
import { PromoCodeInput } from '@/components/promo/PromoCodeInput';
import CartButton from '@/components/CartButton';
import { toast } from '@/hooks/use-toast';
import { formatCFA } from '@/lib/utils';
import { ShoppingCart, Heart, Smartphone, Monitor } from 'lucide-react';

export function IntegrationTest() {
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const isMobile = useIsMobile();
  
  // Mock product data
  const testProduct = {
    productId: 'test-product-1',
    name: 'Sérum Test Integration',
    brand: 'Test Brand',
    priceCents: 15000,
    originalPriceCents: 20000,
    imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=200&fit=crop',
    rating: 4.5,
    inStock: true,
    category: 'Test Category'
  };

  const runTest = (testName: string, testFn: () => boolean) => {
    try {
      const result = testFn();
      setTestResults(prev => ({ ...prev, [testName]: result }));
      return result;
    } catch (error) {
      console.error(`Test ${testName} failed:`, error);
      setTestResults(prev => ({ ...prev, [testName]: false }));
      return false;
    }
  };

  const runAllTests = () => {
    const { items: cartItems, totalItems, subtotal } = useCart.getState();
    const { items: wishlistItems, wishlistCount } = useWishlist.getState();
    const { appliedPromo } = usePromoCode.getState();

    // Test 1: Cart functionality
    runTest('Cart State', () => {
      return Array.isArray(cartItems) && typeof totalItems === 'number' && typeof subtotal === 'number';
    });

    // Test 2: Wishlist functionality
    runTest('Wishlist State', () => {
      return Array.isArray(wishlistItems) && typeof wishlistCount === 'number';
    });

    // Test 3: PromoCode state
    runTest('PromoCode State', () => {
      return appliedPromo === null || (appliedPromo && typeof appliedPromo.code === 'string');
    });

    // Test 4: Mobile detection
    runTest('Mobile Detection', () => {
      return typeof isMobile === 'boolean';
    });

    // Test 5: Format CFA
    runTest('Format CFA', () => {
      const formatted = formatCFA(15000);
      return typeof formatted === 'string' && formatted.includes('CFA');
    });

    toast({
      title: "Tests d'intégration terminés",
      description: "Vérifiez les résultats ci-dessous",
    });
  };

  const { totalItems, subtotal } = useCart();
  const { items: wishlistItems, wishlistCount } = useWishlist();
  const { appliedPromo, calculateDiscount } = usePromoCode();

  const discount = calculateDiscount(subtotal);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🧪 Test d&apos;Intégration - Migration Frontend
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Device Detection */}
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            {isMobile ? <Smartphone className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
            <span>Détection appareil: {isMobile ? 'Mobile' : 'Desktop'}</span>
          </div>

          {/* Product Test */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Produit Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                  <Image 
                    src={testProduct.imageUrl} 
                    alt={testProduct.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{testProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">{testProduct.brand}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-primary">{formatCFA(testProduct.priceCents)}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatCFA(testProduct.originalPriceCents)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <AddToCartButton
                  productId={testProduct.productId}
                  name={testProduct.name}
                  brand={testProduct.brand}
                  priceCents={testProduct.priceCents}
                  originalPriceCents={testProduct.originalPriceCents}
                  imageUrl={testProduct.imageUrl}
                  size="sm"
                />
                <WishlistButton
                  product={testProduct}
                  variant="outline"
                  size="default"
                  showText={true}
                />
              </div>
            </CardContent>
          </Card>

          {/* State Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cart State */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShoppingCart className="w-5 h-5" />
                  État Panier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>Articles: {totalItems}</p>
                  <p>Sous-total: {formatCFA(subtotal)}</p>
                  {discount > 0 && (
                    <p className="text-green-600">Réduction: -{formatCFA(discount)}</p>
                  )}
                  <p>Total: {formatCFA(subtotal - discount)}</p>
                </div>
                <div className="mt-4">
                  <CartButton variant="outline" size="default" />
                </div>
              </CardContent>
            </Card>

            {/* Wishlist State */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5" />
                  État Favoris
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>Favoris: {wishlistCount}</p>
                  <div className="space-y-1">
                    {wishlistItems.slice(0, 3).map((item) => (
                      <div key={item.productId} className="text-sm text-muted-foreground">
                        • {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Promo Code Test */}
          <Card>
            <CardHeader>
              <CardTitle>Test Codes Promo</CardTitle>
            </CardHeader>
            <CardContent>
              <PromoCodeInput 
                orderTotal={subtotal}
                onDiscountChange={(discount) => {
                  console.log('Discount changed:', discount);
                }}
              />
              {appliedPromo && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-green-800">
                    ✅ Code &quot;{appliedPromo.code}&quot; appliqué - {appliedPromo.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test Results */}
          <Card>
            <CardHeader>
              <CardTitle>Résultats des Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(testResults).map(([test, result]) => (
                  <div key={test} className="flex items-center justify-between">
                    <span>{test}</span>
                    <Badge variant={result ? "default" : "destructive"}>
                      {result ? "✅ Pass" : "❌ Fail"}
                    </Badge>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <Button onClick={runAllTests} className="w-full">
                🧪 Lancer tous les tests
              </Button>
            </CardContent>
          </Card>

        </CardContent>
      </Card>
    </div>
  );
}
