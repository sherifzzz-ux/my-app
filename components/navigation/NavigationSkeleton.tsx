/**
 * Composant NavigationSkeleton - Skeleton de chargement pour la navigation
 * Fournit un feedback visuel pendant le chargement des données
 */

'use client'

import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface NavigationSkeletonProps {
  className?: string
  variant?: 'desktop' | 'mobile' | 'dropdown'
  itemCount?: number
}

export function NavigationSkeleton({ 
  className,
  variant = 'desktop',
  itemCount = 5
}: NavigationSkeletonProps) {
  if (variant === 'desktop') {
    return <DesktopNavigationSkeleton className={className} itemCount={itemCount} />
  }
  
  if (variant === 'mobile') {
    return <MobileNavigationSkeleton className={className} itemCount={itemCount} />
  }
  
  if (variant === 'dropdown') {
    return <DropdownNavigationSkeleton className={className} itemCount={itemCount} />
  }
  
  return null
}

/**
 * Skeleton pour la navigation desktop
 */
function DesktopNavigationSkeleton({ 
  className,
  itemCount = 5
}: { className?: string; itemCount?: number }) {
  return (
    <nav className={cn('flex items-center space-x-6', className)}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
      ))}
    </nav>
  )
}

/**
 * Skeleton pour la navigation mobile
 */
function MobileNavigationSkeleton({ 
  className,
  itemCount = 6
}: { className?: string; itemCount?: number }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} className="flex items-center space-x-3 p-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
          {index % 3 === 0 && (
            <Skeleton className="h-4 w-8 rounded-full ml-auto" />
          )}
        </div>
      ))}
    </div>
  )
}

/**
 * Skeleton pour les dropdowns
 */
function DropdownNavigationSkeleton({ 
  className,
  itemCount = 4
}: { className?: string; itemCount?: number }) {
  return (
    <div className={cn('p-6 w-[400px] space-y-4', className)}>
      {/* En-tête */}
      <div className="flex items-center space-x-3 pb-3 border-b">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-3 w-32 rounded" />
        </div>
      </div>
      
      {/* Lien principal */}
      <div className="flex items-center space-x-2 p-3">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="h-3 w-3 rounded ml-auto" />
      </div>
      
      {/* Sous-catégories */}
      <div className="space-y-1">
        <Skeleton className="h-3 w-20 rounded" />
        {Array.from({ length: itemCount }).map((_, index) => (
          <div key={index} className="flex items-center justify-between p-2">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-4 w-6 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Skeleton pour les éléments de menu individuels
 */
export function NavigationItemSkeleton({ 
  className,
  showIcon = true,
  showCount = false
}: { 
  className?: string
  showIcon?: boolean
  showCount?: boolean
}) {
  return (
    <div className={cn('flex items-center space-x-2 px-3 py-2', className)}>
      {showIcon && <Skeleton className="h-4 w-4 rounded" />}
      <Skeleton className="h-4 w-16 rounded" />
      {showCount && <Skeleton className="h-4 w-6 rounded-full ml-auto" />}
    </div>
  )
}

/**
 * Skeleton pour les catégories avec images
 */
export function CategorySkeleton({ 
  className,
  showImage = true
}: { 
  className?: string
  showImage?: boolean
}) {
  return (
    <div className={cn('flex items-center space-x-3 p-3', className)}>
      {showImage && <Skeleton className="h-10 w-10 rounded-lg" />}
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-3 w-16 rounded" />
      </div>
      <Skeleton className="h-4 w-6 rounded-full" />
    </div>
  )
}

/**
 * Skeleton pour les listes de navigation
 */
export function NavigationListSkeleton({ 
  className,
  itemCount = 5,
  showIcons = true
}: { 
  className?: string
  itemCount?: number
  showIcons?: boolean
}) {
  return (
    <div className={cn('space-y-1', className)}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <NavigationItemSkeleton 
          key={index}
          showIcon={showIcons}
          showCount={index % 2 === 0}
        />
      ))}
    </div>
  )
}

/**
 * Skeleton pour les accordéons
 */
export function AccordionSkeleton({ 
  className,
  itemCount = 3
}: { 
  className?: string
  itemCount?: number
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center justify-between p-2">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-4 w-4 rounded" />
          </div>
          {index === 0 && (
            <div className="ml-4 space-y-1">
              <Skeleton className="h-3 w-16 rounded" />
              <Skeleton className="h-3 w-18 rounded" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
