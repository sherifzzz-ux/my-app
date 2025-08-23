import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function SoinVisageDemaquillants() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Démaquillants & Nettoyants Visage | Flawless Beauty</title>
        <meta name="description" content="Nettoyez en douceur votre visage avec nos démaquillants et nettoyants adaptés à tous types de peaux." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Soin du Visage", href: "/soin-du-visage" },
            { label: "Démaquillants & Nettoyants" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Démaquillants & Nettoyants
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            La première étape essentielle de votre routine beauté : un nettoyage en douceur pour une peau parfaitement propre.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Eaux Micellaires</h3>
            <p className="text-muted-foreground text-sm">Nettoyage sans rinçage</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Huiles Démaquillantes</h3>
            <p className="text-muted-foreground text-sm">Maquillage waterproof</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Gels Nettoyants</h3>
            <p className="text-muted-foreground text-sm">Peaux mixtes à grasses</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Laits Démaquillants</h3>
            <p className="text-muted-foreground text-sm">Peaux sèches et sensibles</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}