import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Users, UserPlus, Repeat, DollarSign } from "lucide-react";
import type { CustomerMetrics } from "@/lib/analytics-data";

interface CustomerAnalyticsProps {
  metrics: CustomerMetrics;
  categoryData: any[];
  trafficData: any[];
  loading?: boolean;
}

export function CustomerAnalytics({ metrics, categoryData, trafficData, loading }: CustomerAnalyticsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card><CardHeader><CardTitle>Métriques Clients</CardTitle></CardHeader><CardContent><div className="h-[200px] bg-muted animate-pulse rounded"></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Répartition par Catégorie</CardTitle></CardHeader><CardContent><div className="h-[200px] bg-muted animate-pulse rounded"></div></CardContent></Card>
      </div>
    );
  }

  const customerTypeData = [
    { name: 'Nouveaux', value: metrics.newCustomers, color: 'hsl(var(--primary))' },
    { name: 'Fidèles', value: metrics.returningCustomers, color: 'hsl(var(--secondary))' },
  ];

  const formatCurrency = (amount: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

  const customerStats = [
    { title: "Total Clients", value: metrics.totalCustomers.toLocaleString(), icon: Users, description: "clients enregistrés" },
    { title: "Nouveaux Clients", value: metrics.newCustomers.toLocaleString(), icon: UserPlus, description: "ce mois" },
    { title: "Clients Fidèles", value: metrics.returningCustomers.toLocaleString(), icon: Repeat, description: "commandes multiples" },
    { title: "Valeur Vie Client", value: formatCurrency(metrics.customerLifetimeValue), icon: DollarSign, description: "moyenne estimée" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Métriques Clients</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {customerStats.map((stat, index) => {
              const Icon = stat.icon as any;
              return (
                <div key={index} className="text-center p-3 border rounded-lg">
                  <Icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-3">Répartition Nouveaux vs Fidèles</h4>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={customerTypeData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                    {customerTypeData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Ventes par Catégorie</CardTitle></CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="horizontal">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} fontSize={12} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0,2,2,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium">Sources de Trafic</h4>
            {trafficData.map((source: any, index: number) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{source.source}</span>
                <div className="flex items-center gap-2"><span className="font-medium">{source.visitors}</span><span className="text-xs text-muted-foreground">({source.percentage}%)</span></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


