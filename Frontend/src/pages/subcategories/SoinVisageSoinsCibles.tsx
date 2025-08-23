import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function SoinVisageSoinsCibles() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Soins Ciblés Visage | Flawless Beauty</title>
        <meta name="description" content="Soins spécialisés pour traiter les problèmes spécifiques de votre peau : rides, taches, imperfections." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Soin du Visage", href: "/soin-du-visage" },
            { label: "Soins Ciblés" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Soins Ciblés
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Traitements spécialisés pour répondre aux besoins spécifiques de votre peau et corriger les imperfections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Anti-âge</h3>
            <p className="text-muted-foreground text-sm">Rides, ridules, fermeté</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Anti-taches</h3>
            <p className="text-muted-foreground text-sm">Hyperpigmentation, taches brunes</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Anti-imperfections</h3>
            <p className="text-muted-foreground text-sm">Acné, pores dilatés, points noirs</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Peaux sensibles</h3>
            <p className="text-muted-foreground text-sm">Apaisement, réparation, confort</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}