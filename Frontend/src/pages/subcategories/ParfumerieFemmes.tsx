import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function ParfumerieFemmes() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Parfumerie Femmes | Flawless Beauty</title>
        <meta name="description" content="Découvrez notre collection exclusive de parfums femme des plus grandes marques." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Parfumerie", href: "/parfumerie" },
            { label: "Parfumerie Femmes" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Parfumerie Femmes
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Exprimez votre personnalité avec notre sélection raffinée de parfums féminins aux notes envoûtantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Floraux</h3>
            <p className="text-muted-foreground text-sm">Rose, jasmin, pivoine</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Orientaux</h3>
            <p className="text-muted-foreground text-sm">Vanille, ambre, épices</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Boisés</h3>
            <p className="text-muted-foreground text-sm">Cèdre, santal, patchouli</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Frais</h3>
            <p className="text-muted-foreground text-sm">Agrumes, aquatique</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}