import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Search,
  Phone,
  Mail,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

export default function SuiviCommande() {
  const [orderNumber, setOrderNumber] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock order data for demonstration
  const mockOrder = {
    number: "CMD123456789",
    status: "En livraison",
    statusColor: "bg-blue-500",
    date: "2024-01-15",
    total: "45 750 FCFA",
    items: [
      { name: "Sérum Vitamine C The Ordinary", quantity: 1, price: "15 000 FCFA" },
      { name: "Crème Hydratante CeraVe", quantity: 2, price: "30 750 FCFA" }
    ],
    delivery: {
      address: "Dakar, Plateau, Rue 10",
      method: "Livraison Express",
      cost: "Gratuit",
      estimatedDate: "2024-01-16"
    },
    tracking: [
      {
        status: "Commande confirmée",
        date: "15/01/2024 - 10:30",
        description: "Votre commande a été confirmée et est en préparation",
        completed: true
      },
      {
        status: "Commande préparée",
        date: "15/01/2024 - 14:20",
        description: "Votre commande a été préparée et emballée",
        completed: true
      },
      {
        status: "En cours de livraison",
        date: "16/01/2024 - 09:15",
        description: "Votre commande est en route vers votre adresse",
        completed: true,
        current: true
      },
      {
        status: "Livré",
        date: "En attente",
        description: "Votre commande sera livrée à votre adresse",
        completed: false
      }
    ]
  };

  const handleSearch = () => {
    if (!orderNumber.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (orderNumber === "CMD123456789") {
        setSearchResult(mockOrder);
      } else {
        setSearchResult("not_found");
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string, completed: boolean, current: boolean = false) => {
    if (current) return <Truck className="h-5 w-5 text-blue-500" />;
    if (completed) return <CheckCircle className="h-5 w-5 text-green-500" />;
    return <Clock className="h-5 w-5 text-gray-400" />;
  };

  return (
    <>
      <Helmet>
        <title>Suivi de Commande - Tracking | Flawless Beauty</title>
        <meta 
          name="description" 
          content="Suivez votre commande Flawless Beauty en temps réel. Entrez votre numéro de commande pour connaître le statut de livraison." 
        />
        <meta name="keywords" content="suivi commande, tracking, livraison, statut commande, Sénégal" />
        <link rel="canonical" href="https://flawlessbeauty.sn/suivi-commande" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Suivi de Commande
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entrez votre numéro de commande pour suivre le statut de votre livraison en temps réel.
            </p>
          </div>

          {/* Search Section */}
          <Card className="mb-8 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Numéro de commande
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ex: CMD123456789"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button onClick={handleSearch} disabled={isLoading}>
                      <Search className="h-4 w-4 mr-2" />
                      {isLoading ? "Recherche..." : "Rechercher"}
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Votre numéro de commande vous a été envoyé par SMS et email après validation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searchResult === "not_found" && (
            <Card className="mb-8 max-w-2xl mx-auto">
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
                <h3 className="text-lg font-semibold mb-2">Commande non trouvée</h3>
                <p className="text-muted-foreground mb-4">
                  Aucune commande ne correspond à ce numéro. Vérifiez votre numéro de commande.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    77 123 45 67
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {searchResult && typeof searchResult === 'object' && (
            <div className="space-y-8">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">Commande #{searchResult.number}</CardTitle>
                      <p className="text-muted-foreground">Passée le {searchResult.date}</p>
                    </div>
                    <Badge className={`${searchResult.statusColor} text-white`}>
                      {searchResult.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold mb-3">Articles commandés</h3>
                    <div className="space-y-2">
                      {searchResult.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center py-2">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                          </div>
                          <p className="font-medium">{item.price}</p>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total</span>
                      <span>{searchResult.total}</span>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div>
                    <h3 className="font-semibold mb-3">Informations de livraison</h3>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{searchResult.delivery.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        <span>{searchResult.delivery.method} - {searchResult.delivery.cost}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Livraison prévue le {searchResult.delivery.estimatedDate}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Suivi de livraison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {searchResult.tracking.map((step: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          {getStatusIcon(step.status, step.completed, step.current)}
                          {index < searchResult.tracking.length - 1 && (
                            <div className={`w-0.5 h-12 mt-2 ${step.completed ? 'bg-green-200' : 'bg-gray-200'}`} />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h3 className={`font-semibold ${step.current ? 'text-blue-600' : step.completed ? 'text-green-600' : 'text-gray-500'}`}>
                              {step.status}
                            </h3>
                            <span className="text-sm text-muted-foreground">{step.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card className="bg-primary/5">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Besoin d'aide ?</h3>
                  <p className="text-muted-foreground mb-4">
                    Notre équipe est là pour vous accompagner
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      77 123 45 67
                    </Button>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      contact@flawlessbeauty.sn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Help Section */}
          {!searchResult && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Comment ça marche ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <Search className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">1. Entrez votre numéro</h3>
                    <p className="text-sm text-muted-foreground">
                      Saisissez le numéro de commande reçu par SMS/email
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">2. Consultez le statut</h3>
                    <p className="text-sm text-muted-foreground">
                      Visualisez l'état de votre commande en temps réel
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="bg-primary/10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">3. Suivez la livraison</h3>
                    <p className="text-sm text-muted-foreground">
                      Recevez les mises à jour jusqu'à la livraison
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Demo Button */}
          {!searchResult && (
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">
                Vous voulez voir un exemple ? Essayez avec le numéro de commande de démonstration :
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setOrderNumber("CMD123456789");
                  setTimeout(() => handleSearch(), 100);
                }}
              >
                Tester avec CMD123456789
              </Button>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}