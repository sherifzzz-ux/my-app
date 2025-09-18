import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Linkedin, Instagram, Twitter, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { TeamMember } from '@/lib/data/a-propos'

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{member.name}</CardTitle>
        <CardDescription className="text-sm font-medium text-primary">
          {member.position}
        </CardDescription>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {member.bio}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Expertise */}
          <div>
            <h4 className="text-sm font-medium mb-2">Expertise</h4>
            <div className="flex flex-wrap gap-1">
              {member.expertise.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Réseaux sociaux */}
          {member.socialMedia && (
            <div className="flex items-center gap-2">
              {member.socialMedia.linkedin && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href={member.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              {member.socialMedia.instagram && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`https://instagram.com/${member.socialMedia.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              {member.socialMedia.twitter && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href={member.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
