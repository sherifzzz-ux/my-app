import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Search,
  Filter,
  Calendar,
  MapPin,
  CreditCard,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Données mockées pour la démonstration
const mockOrders = [
  {
    id: '12345',
    date: '2025-01-15',
    status: 'delivered',
    statusText: 'Livrée',
    total: 89.99,
    items: 3,
    tracking: 'TRK123456789',
    address: '123 Rue de la Paix, 75001 Paris',
    paymentMethod: 'Carte bancaire',
    estimatedDelivery: 'Livrée le 15/01/2025'
  },
  {
    id: '12346',
    date: '2025-01-20',
    status: 'shipped',
    statusText: 'En cours de livraison',
    total: 124.50,
    items: 2,
    tracking: 'TRK987654321',
    address: '123 Rue de la Paix, 75001 Paris',
    paymentMethod: 'PayPal',
    estimatedDelivery: 'Livraison estimée le 22/01/2025'
  },
  {
    id: '12347',
    date: '2025-01-25',
    status: 'processing',
    statusText: 'En cours de traitement',
    total: 67.80,
    items: 1,
    tracking: null,
    address: '123 Rue de la Paix, 75001 Paris',
    paymentMethod: 'Carte bancaire',
    estimatedDelivery: 'Livraison estimée le 28/01/2025'
  },
  {
    id: '12348',
    date: '2025-01-10',
    status: 'cancelled',
    statusText: 'Annulée',
    total: 45.99,
    items: 1,
    tracking: null,
    address: '123 Rue de la Paix, 75001 Paris',
    paymentMethod: 'Carte bancaire',
    estimatedDelivery: 'Commande annulée'
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case 'shipped':
      return <Truck className="w-5 h-5 text-blue-600" />
    case 'processing':
      return <Clock className="w-5 h-5 text-orange-600" />
    case 'cancelled':
      return <AlertCircle className="w-5 h-5 text-red-600" />
    default:
      return <Package className="w-5 h-5 text-gray-600" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'delivered':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Livrée</Badge>
    case 'shipped':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En cours</Badge>
    case 'processing':
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">En traitement</Badge>
    case 'cancelled':
      return <Badge variant="destructive">Annulée</Badge>
    default:
      return <Badge variant="secondary">Inconnu</Badge>
  }
}

export default async function OrdersPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/account')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mes commandes
          </h1>
          <p className="text-muted-foreground text-lg">
            Suivez et gérez toutes vos commandes
          </p>
        </div>

        {/* Filtres et recherche */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Rechercher une commande..."
                    className="pl-10"
                  />
                </div>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="processing">En traitement</SelectItem>
                  <SelectItem value="shipped">En cours de livraison</SelectItem>
                  <SelectItem value="delivered">Livrées</SelectItem>
                  <SelectItem value="cancelled">Annulées</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="recent">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Tri" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Plus récentes</SelectItem>
                  <SelectItem value="oldest">Plus anciennes</SelectItem>
                  <SelectItem value="amount">Montant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs des commandes */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-12 bg-background/50 backdrop-blur-sm border">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Toutes
            </TabsTrigger>
            <TabsTrigger value="processing" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              En traitement
            </TabsTrigger>
            <TabsTrigger value="shipped" className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              En livraison
            </TabsTrigger>
            <TabsTrigger value="delivered" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Livrées
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Annulées
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="processing" className="mt-6">
            <div className="space-y-4">
              {mockOrders.filter(o => o.status === 'processing').map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shipped" className="mt-6">
            <div className="space-y-4">
              {mockOrders.filter(o => o.status === 'shipped').map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="delivered" className="mt-6">
            <div className="space-y-4">
              {mockOrders.filter(o => o.status === 'delivered').map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            <div className="space-y-4">
              {mockOrders.filter(o => o.status === 'cancelled').map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function OrderCard({ order }: { order: any }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Informations principales */}
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {getStatusIcon(order.status)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Commande #{order.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    Passée le {new Date(order.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">€{order.total.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{order.items} article(s)</p>
              </div>
            </div>

            {/* Détails de livraison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{order.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{order.paymentMethod}</span>
              </div>
            </div>

            {/* Statut et livraison */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusBadge(order.status)}
                <span className="text-sm text-muted-foreground">
                  {order.estimatedDelivery}
                </span>
              </div>
              {order.tracking && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="w-4 h-4" />
                  Suivi: {order.tracking}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Voir les détails
            </Button>
            {order.status === 'shipped' && (
              <Button size="sm">
                <Truck className="w-4 h-4 mr-2" />
                Suivre
              </Button>
            )}
            {order.status === 'delivered' && (
              <Button variant="outline" size="sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Évaluer
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
