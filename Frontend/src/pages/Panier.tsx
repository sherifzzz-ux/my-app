import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ShoppingBag,
  Truck,
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  Loader2,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/integrations/supabase/client';
import { formatCFA } from '@/lib/utils/price-utils';
import { toast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimated_days_min: number;
  estimated_days_max: number;
}

interface ShippingAddress {
  first_name: string;
  last_name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  postal_code: string;
  country: string;
  phone: string;
}

export default function Panier() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, totalItems } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout' | 'processing'>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string>('');
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    first_name: '',
    last_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    postal_code: '',
    country: 'SN',
    phone: ''
  });
  
  const [billingAddress, setBillingAddress] = useState<ShippingAddress>({
    first_name: '',
    last_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    postal_code: '',
    country: 'SN',
    phone: ''
  });
  
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [orderNotes, setOrderNotes] = useState('');

  // Check authentication and load user data
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        
        // Pre-fill addresses from user metadata
        const metadata = session.user.user_metadata;
        if (metadata.first_name || metadata.last_name) {
          const defaultAddress = {
            first_name: metadata.first_name || '',
            last_name: metadata.last_name || '',
            address_line_1: '',
            address_line_2: '',
            city: '',
            postal_code: '',
            country: 'SN',
            phone: metadata.phone || ''
          };
          setShippingAddress(defaultAddress);
          setBillingAddress(defaultAddress);
        }
      }
    };
    checkAuth();
  }, []);

  // Load shipping methods
  useEffect(() => {
    const loadShippingMethods = async () => {
      const { data, error } = await supabase
        .from('shipping_methods')
        .select('*')
        .eq('is_active', true)
        .order('price');

      if (data) {
        setShippingMethods(data);
        if (data.length > 0) {
          setSelectedShippingMethod(data[0].id);
        }
      }
    };
    loadShippingMethods();
  }, []);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const selectedShipping = shippingMethods.find(sm => sm.id === selectedShippingMethod);
  const shippingCost = selectedShipping ? selectedShipping.price / 100 : 0;
  const total = subtotal + shippingCost;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour passer commande.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    setStep('checkout');
  };

  const handlePlaceOrder = async () => {
    // Validation
    if (!selectedShippingMethod) {
      toast({
        title: "Méthode de livraison requise",
        description: "Veuillez sélectionner une méthode de livraison.",
        variant: "destructive"
      });
      return;
    }

    const requiredFields = ['first_name', 'last_name', 'address_line_1', 'city', 'postal_code', 'phone'];
    for (const field of requiredFields) {
      if (!shippingAddress[field as keyof ShippingAddress]) {
        toast({
          title: "Adresse incomplète",
          description: "Veuillez remplir tous les champs obligatoires de l'adresse.",
          variant: "destructive"
        });
        return;
      }
    }

    setIsProcessing(true);
    setStep('processing');

    try {
      const orderData = {
        items: items.map(item => ({
          product_id: item.id,
          product_name: item.name,
          product_brand: item.brand,
          product_image: item.image,
          quantity: item.quantity,
          unit_price: Math.round(item.price * 100), // Convert to cents
        })),
        shipping_address: shippingAddress,
        billing_address: sameAsBilling ? shippingAddress : billingAddress,
        shipping_method_id: selectedShippingMethod,
        notes: orderNotes || undefined,
      };

      const { data, error } = await supabase.functions.invoke('create-order', {
        body: orderData
      });

      if (error) throw error;

      // Clear cart after successful order creation
      clearCart();

      // Redirect to Stripe checkout
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error("URL de paiement non reçue");
      }

    } catch (error: any) {
      console.error('Order creation error:', error);
      toast({
        title: "Erreur de commande",
        description: error.message || "Une erreur s'est produite lors de la création de la commande.",
        variant: "destructive"
      });
      setStep('checkout');
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 'processing') {
    return (
      <>
        <Helmet>
          <title>Traitement de la commande - Flawless Beauty</title>
        </Helmet>
        <Header />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6 text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Traitement de votre commande</h2>
              <p className="text-muted-foreground">
                Veuillez patienter, nous préparons votre commande et vous redirigeons vers le paiement...
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {step === 'cart' ? `Panier (${totalItems})` : 'Finaliser la commande'} - Flawless Beauty
        </title>
        <meta name="description" content="Finalisez votre commande de produits de beauté premium. Livraison rapide au Sénégal." />
      </Helmet>

      <Header />
      
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center ${step === 'cart' ? 'text-primary' : 'text-success'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step === 'cart' ? 'border-primary bg-primary text-white' : 'border-success bg-success text-white'
                }`}>
                  {step === 'cart' ? '1' : <Check className="w-4 h-4" />}
                </div>
                <span className="ml-2 font-medium">Panier</span>
              </div>
              
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              
              <div className={`flex items-center ${
                step === 'checkout' ? 'text-primary' : step === 'cart' ? 'text-muted-foreground' : 'text-success'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step === 'checkout' ? 'border-primary bg-primary text-white' : 
                  step === 'cart' ? 'border-muted-foreground' : 'border-success bg-success text-white'
                }`}>
                  {step === 'checkout' ? <Check className="w-4 h-4" /> : '2'}
                </div>
                <span className="ml-2 font-medium">Livraison</span>
              </div>
              
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              
              <div className="flex items-center text-muted-foreground">
                <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-muted-foreground">
                  3
                </div>
                <span className="ml-2 font-medium">Paiement</span>
              </div>
            </div>
          </div>

          {step === 'cart' && (
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold font-playfair mb-8">Votre panier</h1>
              
              {items.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
                    <p className="text-muted-foreground mb-6">
                      Découvrez nos produits de beauté et ajoutez-les à votre panier
                    </p>
                    <Button asChild>
                      <Link to="/">Continuer mes achats</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ShoppingCart className="w-5 h-5" />
                          Articles ({totalItems})
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-border last:border-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder.svg';
                              }}
                            />
                            
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.brand}</p>
                              <p className="font-bold text-primary">{formatCFA(Math.round(item.price * 100))}</p>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="h-8 w-8"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="h-8 w-8"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-urgent hover:text-urgent/80"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card className="sticky top-24">
                      <CardHeader>
                        <CardTitle>Récapitulatif</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span>Sous-total</span>
                          <span>{formatCFA(Math.round(subtotal * 100))}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Livraison</span>
                          <span>Calculée à l'étape suivante</span>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-primary">{formatCFA(Math.round(subtotal * 100))}</span>
                        </div>
                        
                        <Button 
                          onClick={handleProceedToCheckout} 
                          className="w-full" 
                          size="lg"
                        >
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Passer commande
                        </Button>
                        
                        <Button variant="outline" asChild className="w-full">
                          <Link to="/">Continuer mes achats</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'checkout' && (
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold font-playfair mb-8">Finaliser la commande</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Shipping Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Adresse de livraison
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shipping_first_name">Prénom *</Label>
                          <Input
                            id="shipping_first_name"
                            value={shippingAddress.first_name}
                            onChange={(e) => setShippingAddress({...shippingAddress, first_name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="shipping_last_name">Nom *</Label>
                          <Input
                            id="shipping_last_name"
                            value={shippingAddress.last_name}
                            onChange={(e) => setShippingAddress({...shippingAddress, last_name: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="shipping_address_1">Adresse *</Label>
                        <Input
                          id="shipping_address_1"
                          value={shippingAddress.address_line_1}
                          onChange={(e) => setShippingAddress({...shippingAddress, address_line_1: e.target.value})}
                          placeholder="Numéro et nom de rue"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="shipping_address_2">Complément d'adresse</Label>
                        <Input
                          id="shipping_address_2"
                          value={shippingAddress.address_line_2}
                          onChange={(e) => setShippingAddress({...shippingAddress, address_line_2: e.target.value})}
                          placeholder="Appartement, étage, etc."
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="shipping_city">Ville *</Label>
                          <Input
                            id="shipping_city"
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="shipping_postal_code">Code postal *</Label>
                          <Input
                            id="shipping_postal_code"
                            value={shippingAddress.postal_code}
                            onChange={(e) => setShippingAddress({...shippingAddress, postal_code: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="shipping_phone">Téléphone *</Label>
                        <Input
                          id="shipping_phone"
                          type="tel"
                          value={shippingAddress.phone}
                          onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                          placeholder="+221 XX XXX XX XX"
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Shipping Method */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="w-5 h-5" />
                        Méthode de livraison
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={selectedShippingMethod} onValueChange={setSelectedShippingMethod}>
                        {shippingMethods.map((method) => (
                          <div key={method.id} className="flex items-center space-x-2 border rounded-lg p-4">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <div className="flex-1">
                              <Label htmlFor={method.id} className="cursor-pointer">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-semibold">{method.name}</p>
                                    <p className="text-sm text-muted-foreground">{method.description}</p>
                                    {method.estimated_days_min > 0 && (
                                      <p className="text-xs text-muted-foreground">
                                        {method.estimated_days_min === method.estimated_days_max
                                          ? `${method.estimated_days_min} jour${method.estimated_days_min > 1 ? 's' : ''}`
                                          : `${method.estimated_days_min}-${method.estimated_days_max} jours`
                                        }
                                      </p>
                                    )}
                                  </div>
                                  <span className="font-bold">
                                    {method.price === 0 ? 'Gratuit' : formatCFA(method.price)}
                                  </span>
                                </div>
                              </Label>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </CardContent>
                  </Card>
                  
                  {/* Order Notes */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Notes de commande (optionnel)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Instructions spéciales pour la livraison..."
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        rows={3}
                      />
                    </CardContent>
                  </Card>
                </div>
                
                {/* Order Summary */}
                <div>
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Récapitulatif de commande</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Items */}
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span>{formatCFA(Math.round(item.price * item.quantity * 100))}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between">
                        <span>Sous-total</span>
                        <span>{formatCFA(Math.round(subtotal * 100))}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Livraison</span>
                        <span>
                          {shippingCost === 0 ? 'Gratuit' : formatCFA(Math.round(shippingCost * 100))}
                        </span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">{formatCFA(Math.round(total * 100))}</span>
                      </div>
                      
                      <Button 
                        onClick={handlePlaceOrder} 
                        className="w-full" 
                        size="lg"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Traitement...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-4 h-4 mr-2" />
                            Payer maintenant
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={() => setStep('cart')} 
                        className="w-full"
                        disabled={isProcessing}
                      >
                        Retour au panier
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}