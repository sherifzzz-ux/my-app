import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Search, Mail, UserX, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  source: string;
  subscribed_at: string;
}

export function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    filterSubscribers();
  }, [subscribers, searchTerm, statusFilter]);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les abonnés",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterSubscribers = () => {
    let filtered = subscribers;

    if (searchTerm) {
      filtered = filtered.filter(subscriber => 
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      filtered = filtered.filter(subscriber => subscriber.is_active === isActive);
    }

    setFilteredSubscribers(filtered);
  };

  const toggleSubscriberStatus = async (subscriberId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ is_active: !currentStatus })
        .eq('id', subscriberId);

      if (error) throw error;

      setSubscribers(subscribers.map(sub => 
        sub.id === subscriberId ? { ...sub, is_active: !currentStatus } : sub
      ));

      toast({
        title: "Succès",
        description: `Abonné ${!currentStatus ? 'activé' : 'désactivé'} avec succès`,
      });
    } catch (error) {
      console.error('Error toggling subscriber status:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut de l'abonné",
        variant: "destructive",
      });
    }
  };

  const exportSubscribers = () => {
    const activeSubscribers = subscribers.filter(sub => sub.is_active);
    const emails = activeSubscribers.map(sub => sub.email).join('\n');
    
    const blob = new Blob([emails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Succès",
      description: "Liste des abonnés exportée",
    });
  };

  const stats = {
    total: subscribers.length,
    active: subscribers.filter(sub => sub.is_active).length,
    inactive: subscribers.filter(sub => !sub.is_active).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Abonnés</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Mail className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Actifs</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Actifs
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inactifs</p>
                <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
              </div>
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                Inactifs
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Abonnés Newsletter</CardTitle>
            <Button onClick={exportSubscribers}>
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les abonnés</SelectItem>
                <SelectItem value="active">Actifs</SelectItem>
                <SelectItem value="inactive">Inactifs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subscribers List */}
          <div className="space-y-4">
            {filteredSubscribers.map((subscriber) => (
              <div
                key={subscriber.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{subscriber.email}</span>
                      <Badge 
                        variant={subscriber.is_active ? "default" : "destructive"}
                      >
                        {subscriber.is_active ? "Actif" : "Inactif"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Source: {subscriber.source}</p>
                      <p>
                        Abonné le: {new Date(subscriber.subscribed_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={subscriber.is_active ? "destructive" : "default"}
                      size="sm"
                      onClick={() => toggleSubscriberStatus(subscriber.id, subscriber.is_active)}
                    >
                      {subscriber.is_active ? (
                        <>
                          <UserX className="h-4 w-4 mr-2" />
                          Désactiver
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Activer
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredSubscribers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Aucun abonné trouvé</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}