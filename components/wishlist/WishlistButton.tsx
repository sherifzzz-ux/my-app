"use client";

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist, WishlistItem } from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface WishlistButtonProps {
  product: Omit<WishlistItem, 'addedDate'>;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showText?: boolean;
}

export function WishlistButton({ 
  product, 
  variant = 'ghost', 
  size = 'icon',
  className,
  showText = false
}: WishlistButtonProps) {
  const { toggle, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.productId);

  const handleToggle = () => {
    toggle(product);
    
    toast({
      title: inWishlist ? "Retiré des favoris" : "Ajouté aux favoris",
      description: product.name,
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={cn(
        'transition-colors',
        inWishlist && 'text-red-500 hover:text-red-600',
        className
      )}
    >
      <Heart 
        className={cn(
          'w-4 h-4',
          showText && 'mr-2',
          inWishlist && 'fill-current'
        )} 
      />
      {showText && (inWishlist ? 'Dans les favoris' : 'Ajouter aux favoris')}
    </Button>
  );
}
