import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function CorpsBainEpilation() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Épilation | Flawless Beauty</title>
        <meta name="description" content="Découvrez nos produits d'épilation et soins post-épilation pour une peau douce et lisse." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Corps & Bain", href: "/corps-bain" },
            { label: "Épilation" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Épilation
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Une peau lisse et douce avec nos produits d'épilation et soins apaisants post-épilation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Crèmes Dépilatoires</h3>
            <p className="text-muted-foreground text-sm">Épilation douce sans douleur</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Cires & Bandes</h3>
            <p className="text-muted-foreground text-sm">Épilation longue durée</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Soins Post-épilation</h3>
            <p className="text-muted-foreground text-sm">Apaisement et hydratation</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}