import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  ShoppingCart, 
  Truck, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  User as UserIcon,
  Minus,
  Plus,
  Trash2,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// Mock cart items from localStorage
interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  brand: string;
  quantity: number;
}

const Commande = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentStep, setCurrentStep] = useState<'cart' | 'shipping' | 'payment'>('cart');
  
  // Shipping form
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    instructions: ''
  });
  
  // Payment form
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'premium'>('standard');

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Pre-fill shipping form with user data
        const metadata = session.user.user_metadata;
        setShippingForm(prev => ({
          ...prev,
          firstName: metadata?.first_name || '',
          lastName: metadata?.last_name || '',
          email: session.user.email || ''
        }));
      }
      setLoading(false);
    });

    // Load cart from localStorage
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        setCartItems(items);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  };

  const updateCartItems = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCartItems(updatedItems);
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    updateCartItems(updatedItems);
    toast.success('Produit supprimé du panier');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    switch (shippingMethod) {
      case 'express': return 9.99;
      case 'premium': return 14.99;
      default: return 4.99;
    }
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingForm.firstName || !shippingForm.lastName || !shippingForm.email || !shippingForm.address) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would integrate with your payment processor (Stripe, etc.)
    toast.success('Commande en cours de traitement...');
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success('Commande confirmée ! Vous recevrez un email de confirmation.');
      // Clear cart
      updateCartItems([]);
      // Redirect to success page or order confirmation
      window.location.href = '/compte';
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0 && currentStep === 'cart') {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Panier - Flawless Beauty</title>
          <meta name="description" content="Finalisez votre commande sur Flawless Beauty. Livraison rapide et paiement sécurisé." />
        </Helmet>

        <Header />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-muted/30 rounded-lg p-12">
              <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
              <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
              <p className="text-muted-foreground mb-6">
                Découvrez nos produits de beauté et ajoutez-les à votre panier
              </p>
              <Button onClick={() => window.location.href = '/'}>
                Continuer mes achats
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Commande - Flawless Beauty</title>
        <meta name="description" content="Finalisez votre commande sur Flawless Beauty. Livraison rapide et paiement sécurisé." />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${currentStep === 'cart' ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'cart' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <ShoppingCart className="h-4 w-4" />
                </div>
                <span className="font-medium">Panier</span>
              </div>
              
              <div className="w-8 h-0.5 bg-muted"></div>
              
              <div className={`flex items-center space-x-2 ${currentStep === 'shipping' ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'shipping' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <Truck className="h-4 w-4" />
                </div>
                <span className="font-medium">Livraison</span>
              </div>
              
              <div className="w-8 h-0.5 bg-muted"></div>
              
              <div className={`flex items-center space-x-2 ${currentStep === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <CreditCard className="h-4 w-4" />
                </div>
                <span className="font-medium">Paiement</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 'cart' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Mon Panier ({cartItems.length} {cartItems.length > 1 ? 'articles' : 'article'})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-bold text-primary">{item.price.toFixed(2)} €</span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {item.originalPrice.toFixed(2)} €
                              </span>
                            )}
                            {item.discount && (
                              <Badge variant="destructive" className="text-xs">
                                -{item.discount}%
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <div className="flex justify-between items-center pt-4">
                      <Button variant="outline" onClick={() => window.location.href = '/'}>
                        Continuer mes achats
                      </Button>
                      <Button onClick={() => setCurrentStep('shipping')}>
                        Procéder à la livraison
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 'shipping' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Informations de livraison
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleShippingSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom *</Label>
                          <Input
                            id="firstName"
                            value={shippingForm.firstName}
                            onChange={(e) => setShippingForm(prev => ({ ...prev, firstName: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom *</Label>
                          <Input
                            id="lastName"
                            value={shippingForm.lastName}
                            onChange={(e) => setShippingForm(prev => ({ ...prev, lastName: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={shippingForm.email}
                            onChange={(e) => setShippingForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={shippingForm.phone}
                            onChange={(e) => setShippingForm(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse *</Label>
                        <Input
                          id="address"
                          value={shippingForm.address}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, address: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">Ville *</Label>
                          <Input
                            id="city"
                            value={shippingForm.city}
                            onChange={(e) => setShippingForm(prev => ({ ...prev, city: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Code postal *</Label>
                          <Input
                            id="postalCode"
                            value={shippingForm.postalCode}
                            onChange={(e) => setShippingForm(prev => ({ ...prev, postalCode: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Pays</Label>
                          <Select value={shippingForm.country} onValueChange={(value) => setShippingForm(prev => ({ ...prev, country: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="France">France</SelectItem>
                              <SelectItem value="Belgique">Belgique</SelectItem>
                              <SelectItem value="Suisse">Suisse</SelectItem>
                              <SelectItem value="Luxembourg">Luxembourg</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="instructions">Instructions de livraison (optionnel)</Label>
                        <Textarea
                          id="instructions"
                          value={shippingForm.instructions}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, instructions: e.target.value }))}
                          placeholder="Code porte, étage, instructions spéciales..."
                        />
                      </div>
                      
                      <div className="flex justify-between items-center pt-4">
                        <Button variant="outline" onClick={() => setCurrentStep('cart')}>
                          Retour au panier
                        </Button>
                        <Button type="submit">
                          Continuer au paiement
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {currentStep === 'payment' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Paiement sécurisé
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePaymentSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Mode de livraison</h3>
                        <div className="space-y-2">
                          <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="shipping"
                                value="standard"
                                checked={shippingMethod === 'standard'}
                                onChange={(e) => setShippingMethod(e.target.value as any)}
                                className="text-primary"
                              />
                              <div>
                                <p className="font-medium">Livraison Standard</p>
                                <p className="text-sm text-muted-foreground">5-7 jours ouvrés</p>
                              </div>
                            </div>
                            <span className="font-medium">4,99 €</span>
                          </label>
                          
                          <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="shipping"
                                value="express"
                                checked={shippingMethod === 'express'}
                                onChange={(e) => setShippingMethod(e.target.value as any)}
                                className="text-primary"
                              />
                              <div>
                                <p className="font-medium">Livraison Express</p>
                                <p className="text-sm text-muted-foreground">2-3 jours ouvrés</p>
                              </div>
                            </div>
                            <span className="font-medium">9,99 €</span>
                          </label>
                          
                          <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="shipping"
                                value="premium"
                                checked={shippingMethod === 'premium'}
                                onChange={(e) => setShippingMethod(e.target.value as any)}
                                className="text-primary"
                              />
                              <div>
                                <p className="font-medium">Livraison Premium</p>
                                <p className="text-sm text-muted-foreground">24h</p>
                              </div>
                            </div>
                            <span className="font-medium">14,99 €</span>
                          </label>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold">Méthode de paiement</h3>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                            <input
                              type="radio"
                              name="payment"
                              value="card"
                              checked={paymentMethod === 'card'}
                              onChange={(e) => setPaymentMethod(e.target.value as any)}
                              className="text-primary"
                            />
                            <CreditCard className="h-5 w-5" />
                            <span>Carte bancaire</span>
                          </label>
                          
                          <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                            <input
                              type="radio"
                              name="payment"
                              value="paypal"
                              checked={paymentMethod === 'paypal'}
                              onChange={(e) => setPaymentMethod(e.target.value as any)}
                              className="text-primary"
                            />
                            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                              P
                            </div>
                            <span>PayPal</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Lock className="h-4 w-4" />
                          <span>Paiement 100% sécurisé avec chiffrement SSL</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4">
                        <Button variant="outline" onClick={() => setCurrentStep('shipping')}>
                          Retour à la livraison
                        </Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">
                          Finaliser la commande
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sous-total ({cartItems.length} articles)</span>
                      <span>{calculateSubtotal().toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Livraison</span>
                      <span>{calculateShipping().toFixed(2)} €</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">{calculateTotal().toFixed(2)} €</span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <p>• Livraison gratuite dès 50€ d'achat</p>
                    <p>• Retour gratuit sous 30 jours</p>
                    <p>• Garantie satisfaction client</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Commande;