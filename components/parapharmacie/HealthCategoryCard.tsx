import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { HealthCategory } from '@/lib/data/parapharmacie'

interface HealthCategoryCardProps {
  category: HealthCategory
}

export function HealthCategoryCard({ category }: HealthCategoryCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="text-center pb-4">
        <div className="text-4xl mb-3">{category.icon}</div>
        <CardTitle className="text-xl">{category.name}</CardTitle>
        <CardDescription className="text-sm">
          {category.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Product Count */}
          <div className="text-center">
            <Badge variant="secondary" className="mb-3">
              {category.count} produits
            </Badge>
          </div>
          
          {/* Subcategories */}
          <div>
            <h4 className="text-sm font-medium mb-2">Sous-catégories</h4>
            <div className="flex flex-wrap gap-1">
              {category.subcategories.slice(0, 3).map((subcategory) => (
                <Badge key={subcategory} variant="outline" className="text-xs">
                  {subcategory}
                </Badge>
              ))}
              {category.subcategories.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{category.subcategories.length - 3} autres
                </Badge>
              )}
            </div>
          </div>
          
          {/* CTA */}
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
            <Link href={`/parapharmacie?category=${category.id}`}>
              Découvrir
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
