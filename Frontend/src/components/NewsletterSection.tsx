import React, { useState } from 'react';
import { Mail, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email, source: 'homepage' }
      });

      if (error) throw error;

      setIsSubscribed(true);
      setEmail('');
      
      toast({
        title: "Inscription réussie !",
        description: "Vous allez recevoir un email de confirmation.",
      });

    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-success" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold font-playfair">
                Merci pour votre inscription !
              </h2>
              <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                Vous allez recevoir un email de confirmation avec un cadeau de bienvenue.
              </p>
            </div>
            
            <Button 
              variant="secondary" 
              onClick={() => setIsSubscribed(false)}
              className="bg-white text-primary hover:bg-white/90"
            >
              S'inscrire avec une autre adresse
            </Button>

            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">5000+</div>
                <div className="text-sm text-primary-foreground/80">Abonnées</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-primary-foreground/80">Marques</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24H</div>
                <div className="text-sm text-primary-foreground/80">Livraison</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-primary-foreground/80">Authentique</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair">
              Restez Informée
            </h2>
            <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
              Abonnez-vous à notre newsletter pour recevoir les dernières nouveautés, 
              offres exclusives et conseils beauté directement dans votre boîte mail.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  className="pr-10 bg-white text-foreground border-white/20 placeholder:text-muted-foreground"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Button 
                type="submit" 
                variant="secondary" 
                className="bg-white text-primary hover:bg-white/90 whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ...
                  </>
                ) : (
                  'S\'abonner'
                )}
              </Button>
            </form>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold">5000+</div>
              <div className="text-sm text-primary-foreground/80">Abonnées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-primary-foreground/80">Marques</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24H</div>
              <div className="text-sm text-primary-foreground/80">Livraison</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-primary-foreground/80">Authentique</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}