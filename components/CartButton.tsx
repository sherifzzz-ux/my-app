'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { CartSidebar } from '@/components/cart/CartSidebar'
import { cn } from '@/lib/utils'

interface CartButtonProps {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

export default function CartButton({ 
  variant = 'ghost', 
  size = 'icon',
  className 
}: CartButtonProps) {
  const { totalItems } = useCart()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleClick = () => {
    setSidebarOpen(true)
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        className={cn('relative', className)}
        aria-label={`Panier - ${totalItems} article${totalItems > 1 ? 's' : ''}`}
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] leading-[18px] text-center px-1 font-medium">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </Button>

      <CartSidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
    </>
  )
}
