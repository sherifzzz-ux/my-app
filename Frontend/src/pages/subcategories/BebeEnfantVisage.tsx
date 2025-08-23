import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function BebeEnfantVisage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Soins du Visage Bébé - Bébé & Enfant | Flawless Beauty</title>
        <meta name="description" content="Découvrez notre gamme de soins du visage pour bébé. Produits doux et hypoallergéniques pour protéger la peau délicate de bébé." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Bébé & Enfant", href: "/bebe-enfant" },
            { label: "Soins du Visage Bébé" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Soins du Visage Bébé
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Prenez soin du visage délicat de votre bébé avec nos produits spécialement formulés pour respecter sa peau fragile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Crèmes Hydratantes</h3>
            <p className="text-muted-foreground text-sm">Protection et hydratation douce</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Nettoyants Doux</h3>
            <p className="text-muted-foreground text-sm">Sans savon, pH neutre</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Crèmes Apaisantes</h3>
            <p className="text-muted-foreground text-sm">Pour les irritations et rougeurs</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}