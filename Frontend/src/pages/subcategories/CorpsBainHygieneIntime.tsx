import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function CorpsBainHygieneIntime() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Hygiène Intime | Flawless Beauty</title>
        <meta name="description" content="Prenez soin de votre intimité avec nos produits d'hygiène intime doux et respectueux de l'équilibre naturel." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Corps & Bain", href: "/corps-bain" },
            { label: "Hygiène Intime" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Hygiène Intime
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Des soins intimes doux et respectueux pour votre confort et votre bien-être au quotidien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Gels Lavants</h3>
            <p className="text-muted-foreground text-sm">pH adapté, sans savon</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Lingettes Intimes</h3>
            <p className="text-muted-foreground text-sm">Fraîcheur et propreté nomade</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Soins Apaisants</h3>
            <p className="text-muted-foreground text-sm">Confort et protection</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}