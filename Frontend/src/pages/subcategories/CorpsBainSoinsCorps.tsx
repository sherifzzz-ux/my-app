import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function CorpsBainSoinsCorps() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Soins Corps | Flawless Beauty</title>
        <meta name="description" content="Prenez soin de votre corps avec nos crèmes, laits hydratants et soins nourrissants pour une peau douce." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Corps & Bain", href: "/corps-bain" },
            { label: "Soins Corps" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Soins Corps
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Hydratez et nourrissez votre peau avec notre gamme complète de soins pour le corps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Crèmes Hydratantes</h3>
            <p className="text-muted-foreground text-sm">Hydratation intense pour peaux sèches</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Laits Corps</h3>
            <p className="text-muted-foreground text-sm">Texture légère, absorption rapide</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Huiles Corporelles</h3>
            <p className="text-muted-foreground text-sm">Nutrition profonde et éclat</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}