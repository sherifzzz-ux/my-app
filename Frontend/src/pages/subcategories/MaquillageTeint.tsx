import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function MaquillageTeint() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Maquillage Teint - Fonds de teint, BB Crèmes | Flawless Beauty</title>
        <meta name="description" content="Découvrez notre collection de maquillage teint : fonds de teint, BB crèmes, correcteurs et poudres pour un teint parfait." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Maquillage", href: "/maquillage" },
            { label: "Teint" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Maquillage Teint
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Sublimez votre teint avec notre sélection de fonds de teint, correcteurs et poudres pour une peau parfaite et naturelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Fonds de Teint</h3>
            <p className="text-muted-foreground text-sm">Couverture modulable pour tous types de peaux</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">BB & CC Crèmes</h3>
            <p className="text-muted-foreground text-sm">Hydratation et couverture légère</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Correcteurs</h3>
            <p className="text-muted-foreground text-sm">Camouflez imperfections et cernes</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Poudres</h3>
            <p className="text-muted-foreground text-sm">Fixation et matification longue durée</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}