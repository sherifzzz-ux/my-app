import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { TrendingUp, Target, CreditCard, Percent } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { RevenueMetrics as RevenueMetricsType } from "@/lib/analytics-data";

type SalesDataPoint = { date: string; revenue: number };
interface RevenueMetricsProps { metrics: RevenueMetricsType; salesData: SalesDataPoint[]; loading?: boolean }

export function RevenueMetrics({ metrics, salesData, loading }: RevenueMetricsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle>Détails Revenus</CardTitle></CardHeader>
        <CardContent><div className="h-[300px] bg-muted animate-pulse rounded"></div></CardContent>
      </Card>
    );
  }
  const formatCurrency = (amount: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  const monthlyGoal = 200000000; // CFA
  const progressPercentage = (metrics.totalRevenue / monthlyGoal) * 100;
  type RevenueBreakdownItem = { label: string; value: string; percentage: number; icon: LucideIcon; colorClass: string };
  const revenueBreakdown: RevenueBreakdownItem[] = [
    { label: "Revenus Produits", value: formatCurrency(metrics.totalRevenue * 0.85), percentage: 85, icon: Target, colorClass: "bg-primary" },
    { label: "Frais de Livraison", value: formatCurrency(metrics.totalRevenue * 0.12), percentage: 12, icon: CreditCard, colorClass: "bg-secondary" },
    { label: "Autres Revenus", value: formatCurrency(metrics.totalRevenue * 0.03), percentage: 3, icon: Percent, colorClass: "bg-accent" },
  ];
  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Analyse des Revenus</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between"><span className="text-sm font-medium">Objectif Mensuel</span><span className="text-sm text-muted-foreground">{formatCurrency(metrics.totalRevenue)} / {formatCurrency(monthlyGoal)}</span></div>
          <Progress value={Math.min(progressPercentage, 100)} className="h-3" />
          <div className="text-xs text-muted-foreground text-center">{progressPercentage.toFixed(1)}% de l&apos;objectif atteint</div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-3">Tendance des Revenus (30j)</h4>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorRevenue2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tickFormatter={(v) => new Date(v).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })} fontSize={10} />
                <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} fontSize={10} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-3">Répartition des Revenus</h4>
          <div className="space-y-3">
            {revenueBreakdown.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3"><div className={`w-3 h-3 rounded-full ${item.colorClass}`}></div><Icon className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{item.label}</span></div>
                  <div className="text-right"><div className="text-sm font-medium">{item.value}</div><div className="text-xs text-muted-foreground">{item.percentage}%</div></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center"><div className="text-lg font-bold text-green-600">+{metrics.monthlyGrowth}%</div><div className="text-xs text-muted-foreground">Croissance mensuelle</div></div>
          <div className="text-center"><div className="text-lg font-bold">{formatCurrency(metrics.averageOrderValue)}</div><div className="text-xs text-muted-foreground">Panier moyen</div></div>
        </div>
      </CardContent>
    </Card>
  );
}


