import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plus, Edit, Trash2 } from "lucide-react";

export function AdminProducts() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gestion des Produits</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un produit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Gestion des Produits</h3>
            <p className="text-muted-foreground mb-6">
              Cette section permettra de gérer votre catalogue de produits.
              <br />
              Fonctionnalités à venir : ajout, modification, suppression et gestion des stocks.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                • Ajout de nouveaux produits avec images
              </p>
              <p className="text-sm text-muted-foreground">
                • Gestion des prix et promotions
              </p>
              <p className="text-sm text-muted-foreground">
                • Suivi des stocks en temps réel
              </p>
              <p className="text-sm text-muted-foreground">
                • Organisation par catégories et marques
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}