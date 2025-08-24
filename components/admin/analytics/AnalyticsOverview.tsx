import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, ShoppingCart, BadgeEuro as Euro, Target } from "lucide-react";
import { type RevenueMetrics } from "@/lib/analytics-data";

interface AnalyticsOverviewProps {
  metrics: RevenueMetrics;
  loading?: boolean;
}

export function AnalyticsOverview({ metrics, loading }: AnalyticsOverviewProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chargement...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-6 bg-muted animate-pulse rounded mb-1"></div>
              <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatCurrency = (amount: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

  const overviewCards = [
    { title: "Chiffre d'Affaires", value: formatCurrency(metrics.totalRevenue), icon: Euro, trend: `+${metrics.monthlyGrowth}%`, trendUp: metrics.monthlyGrowth > 0, description: "vs mois précédent" },
    { title: "Commandes Totales", value: metrics.totalOrders.toLocaleString(), icon: ShoppingCart, trend: "+12%", trendUp: true, description: "nouvelles commandes" },
    { title: "Panier Moyen", value: formatCurrency(metrics.averageOrderValue), icon: Target, trend: "+5%", trendUp: true, description: "par commande" },
    { title: "Taux de Conversion", value: `${metrics.conversionRate}%`, icon: Users, trend: "+0.8%", trendUp: true, description: "visiteurs → clients" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewCards.map((card, index) => {
        const Icon = card.icon as any;
        const TrendIcon = card.trendUp ? TrendingUp : TrendingDown;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{card.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendIcon className={`h-3 w-3 mr-1 ${card.trendUp ? 'text-green-500' : 'text-red-500'}`} />
                <span className={card.trendUp ? 'text-green-500' : 'text-red-500'}>{card.trend}</span>
                <span className="ml-1">{card.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}


