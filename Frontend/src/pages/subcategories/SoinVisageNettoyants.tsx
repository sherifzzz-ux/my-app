import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function SoinVisageNettoyants() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Nettoyants & Démaquillants - Soin du Visage | Flawless Beauty</title>
        <meta name="description" content="Découvrez notre gamme de nettoyants et démaquillants pour le visage. Huiles démaquillantes, gels nettoyants et eaux micellaires." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Soin du Visage", href: "/soin-du-visage" },
            { label: "Nettoyants & Démaquillants" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Nettoyants & Démaquillants
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Une peau propre est la base de toute routine beauté. Découvrez nos nettoyants doux et démaquillants efficaces pour tous types de peaux.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Huiles Démaquillantes</h3>
            <p className="text-muted-foreground text-sm">Éliminent efficacement le maquillage waterproof</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Gels Nettoyants</h3>
            <p className="text-muted-foreground text-sm">Nettoient en profondeur sans assécher</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Eaux Micellaires</h3>
            <p className="text-muted-foreground text-sm">Démaquillent et nettoient en un seul geste</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}