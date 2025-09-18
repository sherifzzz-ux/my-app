import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Lightbulb, ArrowRight } from 'lucide-react'
import { KoreanRoutineStep as KoreanRoutineStepType } from '@/lib/data/korean-beauty'

interface KoreanRoutineStepProps {
  step: KoreanRoutineStepType
  isActive?: boolean
}

export function KoreanRoutineStep({ step, isActive = false }: KoreanRoutineStepProps) {
  return (
    <Card className={`hover:shadow-lg transition-shadow ${isActive ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-3xl">{step.icon}</div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                Étape {step.id}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {step.time}
              </div>
            </div>
            <CardTitle className="text-lg mt-2">{step.name}</CardTitle>
          </div>
        </div>
        <CardDescription className="text-sm">
          {step.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Products */}
          <div>
            <h4 className="text-sm font-medium mb-2">Produits recommandés</h4>
            <div className="flex flex-wrap gap-1">
              {step.products.map((product) => (
                <Badge key={product} variant="outline" className="text-xs">
                  {product}
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
              {step.tips.map((tip, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          
          {/* CTA */}
          <Button variant="outline" className="w-full" size="sm">
            Voir les produits
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
