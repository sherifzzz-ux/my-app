import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import { GiftOccasion } from '@/lib/data/idees-cadeaux'

interface GiftOccasionCardProps {
  occasion: GiftOccasion
}

export function GiftOccasionCard({ occasion }: GiftOccasionCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="text-center pb-4">
        <div className="text-4xl mb-3">{occasion.icon}</div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <CardTitle className="text-lg">{occasion.name}</CardTitle>
          {occasion.date && (
            <Badge variant="secondary" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {occasion.date}
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm">
          {occasion.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Product Count */}
          <div className="text-center">
            <Badge variant="outline" className="mb-3">
              {occasion.count} idées
            </Badge>
          </div>
          
          {/* Popular Gifts */}
          <div>
            <h4 className="text-sm font-medium mb-2">Cadeaux populaires</h4>
            <div className="flex flex-wrap gap-1">
              {occasion.popularGifts.map((gift) => (
                <Badge key={gift} variant="outline" className="text-xs">
                  {gift}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Tips */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <Lightbulb className="h-4 w-4" />
              Conseils
            </h4>
            <ul className="space-y-1">
              {occasion.tips.map((tip, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          
          {/* CTA */}
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
            <Link href={`/idees-cadeaux?occasion=${occasion.id}`}>
              Voir les idées
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
