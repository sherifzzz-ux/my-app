import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function SoinVisageParProduit() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Soins du Visage par Produit | Flawless Beauty</title>
        <meta name="description" content="Explorez notre gamme complète de soins du visage classés par type de produit." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Soin du Visage", href: "/soin-du-visage" },
            { label: "Soins par Produit" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Soins du Visage par Produit
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Trouvez facilement le produit qu'il vous faut grâce à notre classification par type de soin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Nettoyants</h3>
            <p className="text-muted-foreground text-sm">Gels, mousses, huiles démaquillantes</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Sérums</h3>
            <p className="text-muted-foreground text-sm">Traitements concentrés ciblés</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Crèmes</h3>
            <p className="text-muted-foreground text-sm">Hydratation jour et nuit</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Masques</h3>
            <p className="text-muted-foreground text-sm">Soins intensifs hebdomadaires</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}