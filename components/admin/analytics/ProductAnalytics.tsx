import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Eye, ShoppingCart } from "lucide-react";
import type { ProductAnalyticItem } from "@/lib/analytics-data";

interface ProductAnalyticsProps { products: ProductAnalyticItem[]; loading?: boolean }

export function ProductAnalytics({ products, loading }: ProductAnalyticsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle>Top Produits</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                <div className="h-2 bg-muted animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

  return (
    <Card>
      <CardHeader><CardTitle>Top Produits</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-6">
          {products.map((product, index) => (
            <div key={product.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{product.name}</span>
                    <Badge variant="secondary" className="text-xs">#{index + 1}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium">{formatCurrency(product.revenue)}</p>
                  <p className="text-xs text-muted-foreground">{product.sales} ventes</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Taux de conversion</span>
                  <span className="font-medium">{product.conversion}%</span>
                </div>
                <Progress value={product.conversion} className="h-2" />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><Eye className="h-3 w-3" /><span>{product.views.toLocaleString()} vues</span></div>
                <div className="flex items-center gap-1"><ShoppingCart className="h-3 w-3" /><span>{product.sales} ventes</span></div>
                <div className="flex items-center gap-1"><TrendingUp className="h-3 w-3 text-green-500" /><span className="text-green-500">+{Math.floor(Math.random()*20)}%</span></div>
              </div>
              {index < products.length - 1 && <div className="border-b" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


