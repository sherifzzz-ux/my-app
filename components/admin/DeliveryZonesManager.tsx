/**
 * Delivery Zones Manager Component
 * Allows admin to manage delivery zones (add, edit, delete, reorder)
 */

'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Plus, Edit, Trash2, MapPin } from 'lucide-react'
import { VILLES } from '@/lib/delivery-zones'

interface DeliveryZone {
  id: string
  name: string
  ville: string
  isActive: boolean
  order: number
  createdAt: string
}

export function DeliveryZonesManager() {
  const [zones, setZones] = useState<DeliveryZone[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingZone, setEditingZone] = useState<DeliveryZone | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    ville: '',
    isActive: true,
    order: 0,
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchZones()
  }, [])

  const fetchZones = async () => {
    try {
      const res = await fetch('/api/admin/delivery-zones')
      if (!res.ok) throw new Error('Failed to load zones')
      
      const data = await res.json()
      setZones(data)
    } catch (error) {
      console.error('Error fetching zones:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les zones de livraison',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const openCreateDialog = () => {
    setEditingZone(null)
    setFormData({
      name: '',
      ville: '',
      isActive: true,
      order: zones.length,
    })
    setDialogOpen(true)
  }

  const openEditDialog = (zone: DeliveryZone) => {
    setEditingZone(zone)
    setFormData({
      name: zone.name,
      ville: zone.ville,
      isActive: zone.isActive,
      order: zone.order,
    })
    setDialogOpen(true)
  }

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.ville) {
        toast({
          title: 'Erreur',
          description: 'Veuillez remplir tous les champs requis',
          variant: 'destructive',
        })
        return
      }

      const url = editingZone
        ? `/api/admin/delivery-zones/${editingZone.id}`
        : '/api/admin/delivery-zones'
      
      const method = editingZone ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to save zone')

      toast({
        title: 'Succès',
        description: editingZone
          ? 'Zone de livraison mise à jour'
          : 'Zone de livraison créée',
      })

      setDialogOpen(false)
      fetchZones()
    } catch (error) {
      console.error('Error saving zone:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de sauvegarder la zone',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette zone de livraison ?')) {
      return
    }

    try {
      const res = await fetch(`/api/admin/delivery-zones/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete zone')

      toast({
        title: 'Succès',
        description: 'Zone de livraison supprimée',
      })

      fetchZones()
    } catch (error) {
      console.error('Error deleting zone:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer la zone',
        variant: 'destructive',
      })
    }
  }

  const toggleActive = async (zone: DeliveryZone) => {
    try {
      const res = await fetch(`/api/admin/delivery-zones/${zone.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !zone.isActive }),
      })

      if (!res.ok) throw new Error('Failed to toggle zone')

      fetchZones()
    } catch (error) {
      console.error('Error toggling zone:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier le statut',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Zones de livraison</CardTitle>
              <CardDescription>
                Gérez les zones de livraison disponibles pour vos clients
              </CardDescription>
            </div>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une zone
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Ordre</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones.map((zone) => (
                <TableRow key={zone.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {zone.name}
                    </div>
                  </TableCell>
                  <TableCell>{zone.ville}</TableCell>
                  <TableCell>
                    <Badge variant={zone.isActive ? 'default' : 'secondary'}>
                      {zone.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>{zone.order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Switch
                        checked={zone.isActive}
                        onCheckedChange={() => toggleActive(zone)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(zone)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(zone.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {zones.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Aucune zone de livraison configurée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingZone ? 'Modifier la zone' : 'Nouvelle zone de livraison'}
            </DialogTitle>
            <DialogDescription>
              {editingZone
                ? 'Modifiez les informations de la zone de livraison'
                : 'Ajoutez une nouvelle zone de livraison'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nom de la zone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Plateau, Almadies, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ville">
                Ville <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.ville}
                onValueChange={(value) => setFormData({ ...formData, ville: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une ville" />
                </SelectTrigger>
                <SelectContent>
                  {VILLES.map((ville) => (
                    <SelectItem key={ville} value={ville}>
                      {ville}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Ordre d'affichage</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Zone active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>
              {editingZone ? 'Mettre à jour' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
