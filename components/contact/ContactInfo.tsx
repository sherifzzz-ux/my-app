import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Phone, Mail, MapPin, Clock, Instagram, MessageCircle, Users, Zap } from 'lucide-react'
import Link from 'next/link'
import { contactInfo, supportHours, responseTimes } from '@/lib/data/contact'

export function ContactInfo() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return <Phone className="h-5 w-5" />
      case 'email':
        return <Mail className="h-5 w-5" />
      case 'address':
        return <MapPin className="h-5 w-5" />
      case 'hours':
        return <Clock className="h-5 w-5" />
      case 'social':
        return <Instagram className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Informations de contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Nos Coordonnées
          </CardTitle>
          <CardDescription>
            Plusieurs façons de nous contacter selon vos besoins
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactInfo.map((info) => (
              <div key={info.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  {getIcon(info.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{info.title}</h3>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                  {info.link ? (
                    <Link href={info.link} className="text-primary hover:underline text-sm font-medium">
                      {info.value}
                    </Link>
                  ) : (
                    <p className="text-sm font-medium">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Horaires de support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Horaires de Support
          </CardTitle>
          <CardDescription>
            Nos équipes sont disponibles pour vous aider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {supportHours.map((schedule, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <span className="font-medium">{schedule.day}</span>
                <span className={schedule.hours === 'Fermé' ? 'text-muted-foreground' : 'text-green-600'}>
                  {schedule.hours}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Temps de réponse */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Temps de Réponse
          </CardTitle>
          <CardDescription>
            Délais moyens de réponse selon le type de demande
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {responseTimes.map((response, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-sm">{response.category}</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {response.time}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA pour support urgent */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <Users className="h-8 w-8 mx-auto mb-3 text-blue-600" />
            <h3 className="font-semibold text-blue-900 mb-2">Besoin d&apos;aide urgente ?</h3>
            <p className="text-sm text-blue-700 mb-4">
              Pour les problèmes urgents, appelez-nous directement ou utilisez notre chat en ligne.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="tel:+33123456789">
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler maintenant
                </Link>
              </Button>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat en ligne
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
