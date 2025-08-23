import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist, WishlistItem } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  product: WishlistItem;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "icon";
  className?: string;
}

export function WishlistButton({ 
  product, 
  size = "md", 
  variant = "icon",
  className 
}: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-12 w-12"
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className={cn(
          sizeClasses[size],
          "rounded-full",
          inWishlist 
            ? "text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100" 
            : "text-muted-foreground hover:text-red-500 hover:bg-red-50",
          className
        )}
      >
        <Heart 
          className={cn(
            iconSizes[size],
            inWishlist && "fill-current"
          )} 
        />
      </Button>
    );
  }

  return (
    <Button
      variant={inWishlist ? "default" : "outline"}
      onClick={handleToggle}
      className={cn(
        "flex items-center gap-2",
        inWishlist && "bg-red-500 hover:bg-red-600 text-white",
        className
      )}
    >
      <Heart 
        className={cn(
          iconSizes[size],
          inWishlist && "fill-current"
        )} 
      />
      {inWishlist ? "Dans les favoris" : "Ajouter aux favoris"}
    </Button>
  );
}