import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, ShoppingCart } from "lucide-react";

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analyses et Statistiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16">
            <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Analyses Avancées</h3>
            <p className="text-muted-foreground mb-6">
              Cette section proposera des analyses détaillées de votre boutique.
              <br />
              Tableaux de bord et rapports personnalisés en cours de développement.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="p-4 bg-primary/5 rounded-lg">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Ventes</p>
              </div>
              <div className="p-4 bg-secondary/5 rounded-lg">
                <Users className="h-8 w-8 mx-auto mb-2 text-secondary-foreground" />
                <p className="text-sm font-medium">Clients</p>
              </div>
              <div className="p-4 bg-accent/5 rounded-lg">
                <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-accent-foreground" />
                <p className="text-sm font-medium">Commandes</p>
              </div>
              <div className="p-4 bg-success/5 rounded-lg">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-success" />
                <p className="text-sm font-medium">Rapports</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}