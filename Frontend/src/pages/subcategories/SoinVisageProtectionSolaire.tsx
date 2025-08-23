import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function SoinVisageProtectionSolaire() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Protection Solaire - Soin du Visage | Flawless Beauty</title>
        <meta name="description" content="Découvrez notre gamme de protection solaire pour le visage. Crèmes solaires, BB crèmes SPF et soins anti-UV." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Soin du Visage", href: "/soin-du-visage" },
            { label: "Protection Solaire" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Protection Solaire
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Protégez votre peau des rayons UV avec notre sélection de crèmes solaires et soins anti-UV pour le visage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Crèmes Solaires</h3>
            <p className="text-muted-foreground text-sm">SPF 30, 50+ pour une protection optimale</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">BB Crèmes SPF</h3>
            <p className="text-muted-foreground text-sm">Protection et teint unifié en un seul geste</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Soins Anti-UV</h3>
            <p className="text-muted-foreground text-sm">Protection quotidienne et réparation</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}