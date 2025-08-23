import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function ParfumerieHuilesBougies() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Huiles Parfumées & Bougies | Flawless Beauty</title>
        <meta name="description" content="Créez une ambiance parfumée avec nos huiles parfumées et bougies aux senteurs envoûtantes." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Parfumerie", href: "/parfumerie" },
            { label: "Huiles Parfumées & Bougies" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Huiles Parfumées & Bougies
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transformez votre intérieur en havre de paix avec nos huiles parfumées et bougies aux fragrances délicates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Huiles Parfumées</h3>
            <p className="text-muted-foreground text-sm">Diffusion longue durée</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Bougies Parfumées</h3>
            <p className="text-muted-foreground text-sm">Ambiance chaleureuse</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Diffuseurs</h3>
            <p className="text-muted-foreground text-sm">Parfum d'ambiance continu</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}