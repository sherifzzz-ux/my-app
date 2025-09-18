import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { OlfactiveFamily } from '@/lib/data/parfums'

interface OlfactiveFamilyCardProps {
  family: OlfactiveFamily
  parfumCount?: number
}

export function OlfactiveFamilyCard({ family, parfumCount }: OlfactiveFamilyCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="text-center pb-4">
        <div className="text-4xl mb-3">{family.icon}</div>
        <CardTitle className="text-xl">{family.name}</CardTitle>
        <CardDescription className="text-sm">
          {family.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Characteristics */}
          <div>
            <h4 className="text-sm font-medium mb-2">Caractéristiques</h4>
            <div className="flex flex-wrap gap-1">
              {family.characteristics.map((characteristic) => (
                <Badge key={characteristic} variant="outline" className="text-xs">
                  {characteristic}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Parfum Count */}
          {parfumCount !== undefined && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {parfumCount} parfum{parfumCount > 1 ? 's' : ''} disponible{parfumCount > 1 ? 's' : ''}
              </p>
            </div>
          )}
          
          {/* CTA */}
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
            <Link href={`/parfums?family=${family.name.toLowerCase()}`}>
              Découvrir
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
