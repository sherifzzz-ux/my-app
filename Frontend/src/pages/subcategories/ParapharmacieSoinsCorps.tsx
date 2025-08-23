import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function ParapharmacieSoinsCorps() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Soins du Corps Parapharmacie | Flawless Beauty</title>
        <meta name="description" content="Soins corporels dermatologiques et traitements spécialisés pour le corps en parapharmacie." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Parapharmacie", href: "/parapharmacie" },
            { label: "Soins du Corps" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Soins du Corps Parapharmacie
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Soins corporels thérapeutiques et dermatologiques pour traiter les problèmes spécifiques de la peau.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Peaux Atopiques</h3>
            <p className="text-muted-foreground text-sm">Eczéma, dermatite, apaisement</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Cicatrisation</h3>
            <p className="text-muted-foreground text-sm">Réparation et régénération</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Peaux Sèches</h3>
            <p className="text-muted-foreground text-sm">Hydratation intense médicale</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}