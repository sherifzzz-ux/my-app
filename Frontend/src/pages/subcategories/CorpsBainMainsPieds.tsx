import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function CorpsBainMainsPieds() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mains & Pieds | Flawless Beauty</title>
        <meta name="description" content="Soins spécialisés pour vos mains et pieds : crèmes hydratantes, baumes réparateurs et traitements ciblés." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Corps & Bain", href: "/corps-bain" },
            { label: "Mains & Pieds" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Mains & Pieds
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Chouchoutez vos mains et vos pieds avec nos soins spécialisés pour une peau douce et protégée.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Crèmes Mains</h3>
            <p className="text-muted-foreground text-sm">Hydratation et protection</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Soins Ongles</h3>
            <p className="text-muted-foreground text-sm">Fortification et brillance</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Crèmes Pieds</h3>
            <p className="text-muted-foreground text-sm">Réparation et confort</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Gommages</h3>
            <p className="text-muted-foreground text-sm">Exfoliation et douceur</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}