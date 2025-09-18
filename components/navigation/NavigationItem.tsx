/**
 * Composant NavigationItem - Élément de menu réutilisable
 * Utilise les composants shadcn/ui pour une cohérence visuelle
 */

'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { 
  NavigationMenuLink,
  navigationMenuTriggerStyle 
} from '@/components/ui/navigation-menu'
import { Badge } from '@/components/ui/badge'
import { LucideIcon } from 'lucide-react'
import type { NavigationItemProps } from '@/lib/supabase/navigation-types'

// Import des icônes Lucide
import {
  Home,
  Tag,
  Percent,
  Mail,
  ShoppingBag,
  User,
  Heart,
  Search,
  Menu,
  ChevronDown
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Home,
  Tag,
  Percent,
  Mail,
  ShoppingBag,
  User,
  Heart,
  Search,
  Menu,
  ChevronDown
}

export function NavigationItem({ 
  item, 
  className,
  showIcon = true,
  showCount = false,
  level = 0
}: NavigationItemProps) {
  const IconComponent = item.icon ? iconMap[item.icon] : null
  
  // Styles selon le niveau
  const levelStyles = {
    0: 'text-sm font-medium', // Niveau principal
    1: 'text-sm', // Sous-niveau
    2: 'text-xs text-muted-foreground' // Sous-sous-niveau
  }

  // Styles pour les états
  const baseStyles = cn(
    'flex items-center space-x-2 px-3 py-2 rounded-md transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    levelStyles[level as keyof typeof levelStyles] || levelStyles[0],
    item.isActive && 'bg-accent text-accent-foreground',
    className
  )

  // Contenu du lien
  const linkContent = (
    <>
      {showIcon && IconComponent && (
        <IconComponent className="h-4 w-4 flex-shrink-0" />
      )}
      <span className="truncate">{item.label}</span>
      {showCount && item.productCount !== undefined && item.productCount > 0 && (
        <Badge variant="secondary" className="ml-auto text-xs">
          {item.productCount}
        </Badge>
      )}
    </>
  )

  // Si c'est un lien externe
  if (item.isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseStyles}
        aria-label={`${item.label} (ouvre dans un nouvel onglet)`}
      >
        {linkContent}
      </a>
    )
  }

  // Lien interne avec Next.js
  return (
    <Link href={item.href} className={baseStyles}>
      {linkContent}
    </Link>
  )
}

/**
 * Variante pour NavigationMenu (shadcn/ui)
 */
export function NavigationItemMenu({ 
  item, 
  className,
  showIcon = true,
  showCount = false
}: NavigationItemProps) {
  const IconComponent = item.icon ? iconMap[item.icon] : null

  return (
    <NavigationMenuLink asChild>
      <Link
        href={item.href}
        className={cn(navigationMenuTriggerStyle(), className)}
      >
        {showIcon && IconComponent && (
          <IconComponent className="h-4 w-4 mr-2" />
        )}
        <span>{item.label}</span>
        {showCount && item.productCount !== undefined && item.productCount > 0 && (
          <Badge variant="secondary" className="ml-2 text-xs">
            {item.productCount}
          </Badge>
        )}
      </Link>
    </NavigationMenuLink>
  )
}

/**
 * Variante pour les dropdowns
 */
export function NavigationItemDropdown({ 
  item, 
  className,
  showIcon = true,
  showCount = false
}: NavigationItemProps) {
  const IconComponent = item.icon ? iconMap[item.icon] : null

  return (
    <Link
      href={item.href}
      className={cn(
        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus:bg-accent focus:text-accent-foreground',
        className
      )}
    >
      <div className="flex items-center space-x-2">
        {showIcon && IconComponent && (
          <IconComponent className="h-4 w-4" />
        )}
        <div className="text-sm font-medium leading-none">
          {item.label}
        </div>
        {showCount && item.productCount !== undefined && item.productCount > 0 && (
          <Badge variant="secondary" className="ml-auto text-xs">
            {item.productCount}
          </Badge>
        )}
      </div>
      {item.description && (
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {item.description}
        </p>
      )}
    </Link>
  )
}

/**
 * Variante pour les listes simples
 */
export function NavigationItemList({ 
  item, 
  className,
  showIcon = false,
  showCount = false
}: NavigationItemProps) {
  const IconComponent = item.icon ? iconMap[item.icon] : null

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center justify-between px-2 py-1.5 text-sm rounded-sm transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus:bg-accent focus:text-accent-foreground',
        className
      )}
    >
      <div className="flex items-center space-x-2">
        {showIcon && IconComponent && (
          <IconComponent className="h-3 w-3" />
        )}
        <span>{item.label}</span>
      </div>
      {showCount && item.productCount !== undefined && item.productCount > 0 && (
        <Badge variant="outline" className="text-xs">
          {item.productCount}
        </Badge>
      )}
    </Link>
  )
}
