import { CategoryConfig, SubcategoryConfig } from '@/lib/data/subcategories'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

interface SubcategoryBreadcrumbProps {
  category: CategoryConfig
  subcategory: SubcategoryConfig
}

export function SubcategoryBreadcrumb({ category, subcategory }: SubcategoryBreadcrumbProps) {
  return (
    <nav className="bg-muted/30 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-2 text-sm">
          <Link 
            href="/" 
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4 mr-1" />
            Accueil
          </Link>
          
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          
          <Link 
            href={`/${category.id}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {category.name}
          </Link>
          
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          
          <span className="text-foreground font-medium">
            {subcategory.name}
          </span>
        </div>
      </div>
    </nav>
  )
}
