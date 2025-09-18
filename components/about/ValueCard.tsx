import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CompanyValue } from '@/lib/data/a-propos'

interface ValueCardProps {
  value: CompanyValue
}

export function ValueCard({ value }: ValueCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="text-center pb-4">
        <div className="text-4xl mb-3">{value.icon}</div>
        <CardTitle className="text-lg">{value.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center leading-relaxed">
          {value.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
