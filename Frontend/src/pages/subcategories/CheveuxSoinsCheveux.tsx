import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function CheveuxSoinsCheveux() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Soins Cheveux | Flawless Beauty</title>
        <meta name="description" content="Traitements et soins spécialisés pour réparer, nourrir et sublimer vos cheveux." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Cheveux", href: "/cheveux" },
            { label: "Soins Cheveux" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Soins Cheveux
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Traitements intensifs et soins ciblés pour réparer, nourrir et protéger vos cheveux.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Masques Nourrissants</h3>
            <p className="text-muted-foreground text-sm">Nutrition profonde</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Sérums Capillaires</h3>
            <p className="text-muted-foreground text-sm">Réparation ciblée</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Huiles Cheveux</h3>
            <p className="text-muted-foreground text-sm">Brillance et souplesse</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Soins Sans Rinçage</h3>
            <p className="text-muted-foreground text-sm">Protection continue</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}