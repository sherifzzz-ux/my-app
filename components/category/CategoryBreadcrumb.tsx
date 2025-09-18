'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface CategoryBreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function CategoryBreadcrumb({
  items,
  className
}: CategoryBreadcrumbProps) {
  return (
    <nav
      className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}
      aria-label="Breadcrumb"
    >
      {/* Accueil */}
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Accueil</span>
      </Link>

      {/* Séparateur */}
      <ChevronRight className="h-4 w-4" />

      {/* Items */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">
              {item.label}
            </span>
          )}
          
          {/* Séparateur (sauf pour le dernier item) */}
          {index < items.length - 1 && (
            <ChevronRight className="h-4 w-4 ml-1" />
          )}
        </div>
      ))}
    </nav>
  )
}
