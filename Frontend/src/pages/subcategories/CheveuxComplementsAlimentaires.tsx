import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function CheveuxComplementsAlimentaires() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Compléments Alimentaires Cheveux | Flawless Beauty</title>
        <meta name="description" content="Renforcez vos cheveux de l'intérieur avec nos compléments alimentaires spécialisés." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Cheveux", href: "/cheveux" },
            { label: "Compléments Alimentaires" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Compléments Alimentaires Cheveux
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nourrissez vos cheveux de l'intérieur pour une chevelure plus forte, plus dense et plus brillante.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Anti-chute</h3>
            <p className="text-muted-foreground text-sm">Fortification et stimulation</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Croissance</h3>
            <p className="text-muted-foreground text-sm">Pousse et densité renforcées</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Brillance</h3>
            <p className="text-muted-foreground text-sm">Éclat et vitalité naturels</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}