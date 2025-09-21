import { SubcategoryGuide } from '@/lib/data/subcategories'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface SubcategoryGuidesProps {
  guides: SubcategoryGuide[]
  category: string
  subcategory: string
}

export function SubcategoryGuides({ guides, category, subcategory }: SubcategoryGuidesProps) {
  const featuredGuides = guides.filter(guide => guide.featured)
  const otherGuides = guides.filter(guide => !guide.featured)

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          Guides & Conseils
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Découvrez nos guides experts pour bien choisir et utiliser vos produits {subcategory}.
        </p>
      </div>

      {/* Guides mis en avant */}
      {featuredGuides.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">Recommandés</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <Card key={guide.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/guides/placeholder-guide.jpg';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Guide
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="line-clamp-2">{guide.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {guide.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{guide.readTime} min</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/guides/${guide.id}`}>
                        Lire
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Autres guides */}
      {otherGuides.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-6">Autres guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherGuides.map((guide) => (
              <Card key={guide.id} className="group hover:shadow-md transition-shadow">
                <div className="flex">
                  <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-l-lg">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/guides/placeholder-guide.jpg';
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg line-clamp-2">{guide.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {guide.readTime} min
                      </Badge>
                    </div>
                    
                    <CardDescription className="line-clamp-2 mb-3">
                      {guide.description}
                    </CardDescription>
                    
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/guides/${guide.id}`}>
                        Lire le guide
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Lien vers tous les guides */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg" asChild>
          <Link href={`/${category}/guides`}>
            <BookOpen className="h-5 w-5 mr-2" />
            Voir tous les guides {category}
          </Link>
        </Button>
      </div>
    </section>
  )
}
