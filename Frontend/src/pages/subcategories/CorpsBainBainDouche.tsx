import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function CorpsBainBainDouche() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Bain & Douche | Flawless Beauty</title>
        <meta name="description" content="Transformez votre bain en moment de détente avec nos gels douche, savons et produits de bain." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Corps & Bain", href: "/corps-bain" },
            { label: "Bain & Douche" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Bain & Douche
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Créez un rituel de bien-être avec nos produits pour le bain et la douche aux parfums envoûtants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Gels Douche</h3>
            <p className="text-muted-foreground text-sm">Nettoyage doux et parfumé</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Savons</h3>
            <p className="text-muted-foreground text-sm">Naturels et artisanaux</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Sels de Bain</h3>
            <p className="text-muted-foreground text-sm">Relaxation et détox</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Bombes de Bain</h3>
            <p className="text-muted-foreground text-sm">Effervescence et parfum</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}