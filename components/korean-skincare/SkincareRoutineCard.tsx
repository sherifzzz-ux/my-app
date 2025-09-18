import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Calendar, CheckCircle, ArrowRight } from 'lucide-react'
import { SkincareRoutine } from '@/lib/data/korean-skincare'

interface SkincareRoutineCardProps {
  routine: SkincareRoutine
}

export function SkincareRoutineCard({ routine }: SkincareRoutineCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {routine.skinType}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {routine.duration}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {routine.frequency}
            </div>
          </div>
        </div>
        <CardTitle className="text-xl">{routine.name}</CardTitle>
        <CardDescription className="text-sm">
          {routine.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Steps */}
          <div>
            <h4 className="text-sm font-medium mb-3">Étapes de la routine</h4>
            <div className="space-y-2">
              {routine.steps.map((step) => (
                <div key={step.step} className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg">
                  <Badge variant="outline" className="text-xs mt-1">
                    {step.step}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{step.product}</p>
                    <p className="text-xs text-muted-foreground">{step.time}</p>
                    {step.tips.length > 0 && (
                      <div className="mt-1">
                        {step.tips.map((tip, index) => (
                          <p key={index} className="text-xs text-muted-foreground">
                            • {tip}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Results */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              Résultats attendus
            </h4>
            <div className="flex flex-wrap gap-1">
              {routine.results.map((result) => (
                <Badge key={result} variant="outline" className="text-xs">
                  {result}
                </Badge>
              ))}
            </div>
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
