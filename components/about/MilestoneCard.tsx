import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { CompanyMilestone } from '@/lib/data/a-propos'

interface MilestoneCardProps {
  milestone: CompanyMilestone
  isEven: boolean
}

export function MilestoneCard({ milestone, isEven }: MilestoneCardProps) {
  return (
    <div className={`flex flex-col md:flex-row gap-6 items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Image */}
      {milestone.image && (
        <div className="w-full md:w-1/2">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
            <Image
              src={milestone.image}
              alt={milestone.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="w-full md:w-1/2">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {milestone.year}
              </Badge>
            </div>
            <CardTitle className="text-xl">{milestone.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base leading-relaxed">
              {milestone.description}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
