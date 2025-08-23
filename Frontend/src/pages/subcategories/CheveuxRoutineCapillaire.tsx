import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function CheveuxRoutineCapillaire() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Routine Capillaire | Flawless Beauty</title>
        <meta name="description" content="Créez la routine capillaire parfaite avec nos produits adaptés à votre type de cheveux." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Cheveux", href: "/cheveux" },
            { label: "Routine Capillaire" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Routine Capillaire
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Adoptez une routine capillaire complète et personnalisée pour des cheveux en pleine santé.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Étape 1: Nettoyage</h3>
            <p className="text-muted-foreground text-sm">Shampoings adaptés</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Étape 2: Soin</h3>
            <p className="text-muted-foreground text-sm">Après-shampoings et masques</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Étape 3: Protection</h3>
            <p className="text-muted-foreground text-sm">Sprays et crèmes thermoprotectrices</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Étape 4: Coiffage</h3>
            <p className="text-muted-foreground text-sm">Produits de finition</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}