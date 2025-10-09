/**
 * Admin Delivery Zones Page
 * Manage delivery zones and areas
 */

import { DeliveryZonesManager } from '@/components/admin/DeliveryZonesManager'

export default function DeliveryZonesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Zones de livraison</h1>
        <p className="text-muted-foreground mt-2">
          Gérez les zones de livraison disponibles pour vos clients
        </p>
      </div>
      <DeliveryZonesManager />
    </div>
  )
}
