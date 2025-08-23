import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function SoinVisageBaumesLevres() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Baumes Hydratants Lèvres | Flawless Beauty</title>
        <meta name="description" content="Prenez soin de vos lèvres avec nos baumes hydratants, sticks réparateurs et soins nourrissants." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Soin du Visage", href: "/soin-du-visage" },
            { label: "Baumes Hydratants Lèvres" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Baumes Hydratants Lèvres
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Des lèvres douces et hydratées toute l'année avec notre sélection de baumes et soins pour les lèvres.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Baumes Classiques</h3>
            <p className="text-muted-foreground text-sm">Hydratation quotidienne et protection</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Soins Réparateurs</h3>
            <p className="text-muted-foreground text-sm">Pour lèvres abîmées et gercées</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Baumes Teintés</h3>
            <p className="text-muted-foreground text-sm">Couleur naturelle et hydratation</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}