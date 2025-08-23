import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function CorpsBainGelsDouche() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Gels Douche & Savons - Corps & Bain | Flawless Beauty</title>
        <meta name="description" content="Découvrez notre gamme de gels douche et savons pour le corps. Formules hydratantes et parfums envoûtants." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Corps & Bain", href: "/corps-bain" },
            { label: "Gels Douche & Savons" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Gels Douche & Savons
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transformez votre douche en moment de bien-être avec nos gels douche et savons aux textures onctueuses et parfums délicats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Gels Douche</h3>
            <p className="text-muted-foreground text-sm">Formules hydratantes et parfumées</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Savons Naturels</h3>
            <p className="text-muted-foreground text-sm">Composition naturelle et biologique</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Huiles de Douche</h3>
            <p className="text-muted-foreground text-sm">Nutrition intense pour peaux sèches</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}