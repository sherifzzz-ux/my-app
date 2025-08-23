import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function ParfumerieHommes() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Parfumerie Hommes | Flawless Beauty</title>
        <meta name="description" content="Découvrez notre collection de parfums homme aux fragrances masculines et élégantes." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Parfumerie", href: "/parfumerie" },
            { label: "Parfumerie Hommes" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Parfumerie Hommes
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Affirmez votre style avec notre collection de parfums masculins aux fragrances sophistiquées et charismatiques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Boisés</h3>
            <p className="text-muted-foreground text-sm">Cèdre, santal, vétiver</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Orientaux</h3>
            <p className="text-muted-foreground text-sm">Ambre, oud, épices</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Frais</h3>
            <p className="text-muted-foreground text-sm">Citrus, marine, aromatic</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Cuirés</h3>
            <p className="text-muted-foreground text-sm">Cuir, tabac, fumé</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}