import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import { SkincareConcern } from '@/lib/data/korean-skincare'

interface SkincareConcernCardProps {
  concern: SkincareConcern
}

export function SkincareConcernCard({ concern }: SkincareConcernCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Léger':
        return 'bg-green-500'
      case 'Modéré':
        return 'bg-orange-500'
      case 'Sévère':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="text-center pb-4">
        <div className="text-4xl mb-3">{concern.icon}</div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <CardTitle className="text-lg">{concern.name}</CardTitle>
          <Badge className={`text-white ${getSeverityColor(concern.severity)}`}>
            <Star className="h-3 w-3 mr-1" />
            {concern.severity}
          </Badge>
        </div>
        <CardDescription className="text-sm">
          {concern.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Symptoms */}
          <div>
            <h4 className="text-sm font-medium mb-2">Symptômes</h4>
            <div className="flex flex-wrap gap-1">
              {concern.symptoms.map((symptom) => (
                <Badge key={symptom} variant="outline" className="text-xs">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Recommended Ingredients */}
          <div>
            <h4 className="text-sm font-medium mb-2">Ingrédients recommandés</h4>
            <div className="flex flex-wrap gap-1">
              {concern.recommendedIngredients.map((ingredient) => (
                <Badge key={ingredient} variant="secondary" className="text-xs">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
            <Link href={`/korean-skincare?concern=${concern.id}`}>
              Voir les solutions
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
