import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CompanyStat } from '@/lib/data/a-propos'

interface StatCardProps {
  stat: CompanyStat
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="text-3xl mb-2">{stat.icon}</div>
        <CardTitle className="text-3xl font-bold text-primary">
          {stat.value}
        </CardTitle>
        <CardDescription className="text-lg font-semibold">
          {stat.label}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {stat.description}
        </p>
      </CardContent>
    </Card>
  )
}
