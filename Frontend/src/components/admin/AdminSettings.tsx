import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Settings, Save } from "lucide-react";

export function AdminSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Paramètres Généraux</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="site-name">Nom du site</Label>
              <Input id="site-name" defaultValue="Flawless Beauty" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="site-email">Email de contact</Label>
              <Input id="site-email" type="email" defaultValue="contact@flawlessbeauty.sn" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="site-phone">Téléphone</Label>
              <Input id="site-phone" defaultValue="+221 XX XXX XX XX" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Devise</Label>
              <Input id="currency" defaultValue="XOF" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="site-description">Description du site</Label>
            <Textarea 
              id="site-description" 
              defaultValue="Votre boutique de beauté en ligne au Sénégal"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres E-commerce</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="shipping-cost">Frais de livraison standard (FCFA)</Label>
              <Input id="shipping-cost" type="number" defaultValue="1500" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="free-shipping">Livraison gratuite à partir de (FCFA)</Label>
              <Input id="free-shipping" type="number" defaultValue="50000" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifications email</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des notifications pour les nouvelles commandes
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Mode maintenance</Label>
                <p className="text-sm text-muted-foreground">
                  Mettre le site en mode maintenance
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Nouveaux comptes</Label>
                <p className="text-sm text-muted-foreground">
                  Permettre la création de nouveaux comptes
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres de Sécurité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Paramètres de sécurité avancés à configurer
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg">
          <Save className="h-4 w-4 mr-2" />
          Sauvegarder les paramètres
        </Button>
      </div>
    </div>
  );
}