'use client';

import React from 'react';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { formatCFA } from '@/lib/utils';

export function CartDrawer() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    isOpen, 
    setIsOpen,
    totalItems,
    subtotal,
    total
  } = useCart();

  const formatPrice = (priceCents: number) => {
    return formatCFA(priceCents);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed top-4 right-4 z-50 bg-background shadow-lg border-2 hover:scale-105 transition-all duration-300"
        >
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="space-y-2.5 pb-6">
          <SheetTitle className="text-2xl font-bold">
            PANIER ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <div>
              <h3 className="font-semibold text-lg">Votre panier est vide</h3>
              <p className="text-muted-foreground">Ajoutez des produits pour commencer</p>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 p-4 border rounded-lg">
                  <img
                    src={item.image || item.imageUrl || ''}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div>
                      <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.brand}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item.productId, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleRemoveItem(item.productId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-x-2">
                        {item.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            {formatPrice(item.originalPrice * 100)}
                          </span>
                        )}
                        <span className="font-semibold text-sm">
                          {formatPrice(item.priceCents)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Sous-total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/cart">PANIER</Link>
                </Button>
                
                <Button 
                  className="w-full" 
                  size="lg" 
                  variant="default"
                  asChild
                  style={{ 
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    color: 'white'
                  }}
                >
                  <Link href="/checkout">VALIDER LA COMMANDE</Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={() => setIsOpen(false)}
                >
                  CONTINUER LES ACHATS
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
