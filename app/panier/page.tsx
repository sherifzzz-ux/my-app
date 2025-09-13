'use client';

import React, { useState, useEffect } from 'react';
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
import { useCart } from '@/hooks/use-cart';
import { createBrowserSupabaseClient } from '@/lib/supabase';
import { formatCFA } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { ShippingMethod, ShippingAddress } from '@/types/cart';
import Link from 'next/link';

export default function PanierPage() {
  const { items, updateQuantity, removeItem, clear, totalItems, subtotal } = useCart();
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
      const supabase = createBrowserSupabaseClient();
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
      const supabase = createBrowserSupabaseClient();
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
  const selectedShipping = shippingMethods.find(sm => sm.id === selectedShippingMethod);
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const total = subtotal + shippingCost;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour passer commande.",
        variant: "error"
      });
      // Redirect to login
      window.location.href = '/auth';
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
        variant: "error"
      });
      return;
    }

    const requiredFields = ['first_name', 'last_name', 'address_line_1', 'city', 'postal_code', 'phone'];
    for (const field of requiredFields) {
      if (!shippingAddress[field as keyof ShippingAddress]) {
        toast({
          title: "Adresse incomplète",
          description: "Veuillez remplir tous les champs obligatoires de l'adresse.",
          variant: "error"
        });
        return;
      }
    }

    setIsProcessing(true);
    setStep('processing');

    try {
      const supabase = createBrowserSupabaseClient();
      const orderData = {
        items: items.map(item => ({
          product_id: item.productId,
          product_name: item.name,
          product_brand: item.brand,
          product_image: item.image || item.imageUrl,
          quantity: item.quantity,
          unit_price: item.priceCents,
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
      clear();

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
        variant: "error"
      });
      setStep('checkout');
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 'processing') {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Traitement de votre commande</h2>
            <p className="text-muted-foreground">
              Veuillez patienter, nous préparons votre commande et vous redirigeons vers le paiement...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
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

        {step === 'cart' ? (
          /* Cart Step */
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold mb-6">Votre panier ({totalItems})</h2>
                
                {items.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center py-12">
                      <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">Votre panier est vide</h3>
                      <p className="text-muted-foreground mb-4">
                        Découvrez nos produits et commencez vos achats
                      </p>
                      <Button asChild>
                        <Link href="/catalog">Découvrir les produits</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  items.map((item) => (
                    <Card key={item.productId}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <img
                            src={item.image || item.imageUrl || ''}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1 space-y-3">
                            <div>
                              <h3 className="font-semibold text-lg">{item.name}</h3>
                              <p className="text-muted-foreground">{item.brand}</p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                
                                <span className="w-12 text-center font-medium">{item.quantity}</span>
                                
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <div className="text-right">
                                <div className="font-semibold text-lg">
                                  {formatCFA(item.priceCents * item.quantity)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {formatCFA(item.priceCents)} l'unité
                                </div>
                              </div>
                              
                              <Button
                                size="icon"
                                variant="ghost"
                                className="text-destructive hover:text-destructive"
                                onClick={() => removeItem(item.productId)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Résumé de la commande</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Sous-total ({totalItems} articles)</span>
                        <span>{formatCFA(subtotal)}</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{formatCFA(subtotal)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handleProceedToCheckout}
                        disabled={items.length === 0}
                      >
                        Passer à la livraison
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        size="lg"
                        onClick={() => clear()}
                        disabled={items.length === 0}
                      >
                        Vider le panier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          /* Checkout Step */
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Finaliser votre commande</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Shipping Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Informations de livraison
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first_name">Prénom *</Label>
                        <Input
                          id="first_name"
                          value={shippingAddress.first_name}
                          onChange={(e) => setShippingAddress(prev => ({ ...prev, first_name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="last_name">Nom *</Label>
                        <Input
                          id="last_name"
                          value={shippingAddress.last_name}
                          onChange={(e) => setShippingAddress(prev => ({ ...prev, last_name: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address_line_1">Adresse *</Label>
                      <Input
                        id="address_line_1"
                        value={shippingAddress.address_line_1}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, address_line_1: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address_line_2">Complément d'adresse</Label>
                      <Input
                        id="address_line_2"
                        value={shippingAddress.address_line_2}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, address_line_2: e.target.value }))}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="postal_code">Code postal *</Label>
                        <Input
                          id="postal_code"
                          value={shippingAddress.postal_code}
                          onChange={(e) => setShippingAddress(prev => ({ ...prev, postal_code: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Methods */}
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
                        <div key={method.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">{method.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {method.description}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Livraison en {method.estimated_days_min}-{method.estimated_days_max} jours
                                </div>
                              </div>
                              <div className="font-semibold">
                                {formatCFA(method.price)}
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Order Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notes de commande</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Instructions spéciales, commentaires..."
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      rows={3}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Résumé de la commande</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.productId} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image || item.imageUrl || ''}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <div className="font-medium text-sm">{item.name}</div>
                              <div className="text-xs text-muted-foreground">
                                Qté: {item.quantity}
                              </div>
                            </div>
                          </div>
                          <div className="font-medium">
                            {formatCFA(item.priceCents * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    {/* Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Sous-total</span>
                        <span>{formatCFA(subtotal)}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Livraison</span>
                        <span>{selectedShipping ? formatCFA(selectedShipping.price) : 'À sélectionner'}</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{formatCFA(total)}</span>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handlePlaceOrder}
                      disabled={!selectedShippingMethod}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Passer la commande
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
