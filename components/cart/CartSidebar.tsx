"use client";


import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { formatCFA } from '@/lib/utils';

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function CartSidebar({ open, onClose }: CartSidebarProps) {
  const { items, removeItem, updateQuantity, clear, totalItems, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Panier ({totalItems})
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Votre panier est vide</h3>
            <p className="text-muted-foreground mb-6">
              Découvrez nos produits et ajoutez-les à votre panier
            </p>
            <Link href="/" onClick={onClose} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white h-10 px-4 py-2">
              Découvrir nos produits
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Panier ({totalItems})
          </SheetTitle>
          <SheetDescription>
            Vos produits de beauté sélectionnés
          </SheetDescription>
        </SheetHeader>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-auto py-6">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                  {item.brand && (
                    <p className="text-xs text-muted-foreground">{item.brand}</p>
                  )}
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold text-sm text-primary">
                        {formatCFA(item.priceCents * item.quantity)}
                      </div>
                      {item.originalPriceCents && (
                        <div className="text-xs text-muted-foreground line-through">
                          {formatCFA(item.originalPriceCents * item.quantity)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeItem(item.productId)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* Cart Footer */}
        <div className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Sous-total</span>
            <span className="font-bold text-lg text-primary">
              {formatCFA(subtotal)}
            </span>
          </div>
          
          <div className="space-y-2">
            <Link href="/panier" onClick={onClose} className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white h-11 px-8">
              <ArrowRight className="w-4 h-4 mr-2" />
              Voir le panier
            </Link>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={clear}
            >
              Vider le panier
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            Livraison gratuite dès 25,000 CFA
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
