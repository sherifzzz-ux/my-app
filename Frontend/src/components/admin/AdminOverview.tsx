import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Users, Mail, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { formatCFA } from "@/lib/utils/price-utils";

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  newsletterSubscribers: number;
  recentOrders: any[];
  pendingMessages: number;
}

export function AdminOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch users count
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id');

      // Fetch newsletter subscribers
      const { data: subscribers, error: subscribersError } = await supabase
        .from('newsletter_subscribers')
        .select('id')
        .eq('is_active', true);

      // Fetch unread messages
      const { data: messages, error: messagesError } = await supabase
        .from('contact_messages')
        .select('id')
        .eq('is_read', false);

      if (ordersError || profilesError || subscribersError || messagesError) {
        throw new Error('Error fetching dashboard data');
      }

      const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
      
      setStats({
        totalOrders: orders?.length || 0,
        totalRevenue,
        totalUsers: profiles?.length || 0,
        newsletterSubscribers: subscribers?.length || 0,
        recentOrders: orders?.slice(0, 5) || [],
        pendingMessages: messages?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalOrders || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCFA(stats?.totalRevenue || 0)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abonnés Newsletter</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.newsletterSubscribers || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Commandes Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.recentOrders?.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">#{order.order_number}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCFA(order.total_amount)}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
            
            {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
              <p className="text-center text-muted-foreground py-8">
                Aucune commande récente
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg text-center">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Gérer Commandes</p>
            </div>
            <div className="p-4 bg-secondary/5 rounded-lg text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-secondary-foreground" />
              <p className="text-sm font-medium">Gérer Utilisateurs</p>
            </div>
            <div className="p-4 bg-accent/5 rounded-lg text-center">
              <Mail className="h-8 w-8 mx-auto mb-2 text-accent-foreground" />
              <p className="text-sm font-medium">Messages ({stats?.pendingMessages})</p>
            </div>
            <div className="p-4 bg-success/5 rounded-lg text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-success" />
              <p className="text-sm font-medium">Voir Analyses</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}