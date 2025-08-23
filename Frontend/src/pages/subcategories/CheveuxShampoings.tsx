import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function CheveuxShampoings() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shampoings - Soins Cheveux | Flawless Beauty</title>
        <meta name="description" content="Découvrez notre gamme de shampoings pour tous types de cheveux. Formules spécialisées pour cheveux gras, secs, colorés et sensibles." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Cheveux", href: "/cheveux" },
            { label: "Shampoings" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Shampoings
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Des shampoings adaptés à chaque type de cheveux pour un nettoyage en douceur et des cheveux sublimés au quotidien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Cheveux Gras</h3>
            <p className="text-muted-foreground text-sm">Purifient et régulent le sébum</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Cheveux Secs</h3>
            <p className="text-muted-foreground text-sm">Nourrissent et hydratent intensément</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Cheveux Colorés</h3>
            <p className="text-muted-foreground text-sm">Protègent et prolongent l'éclat</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Cuir Chevelu Sensible</h3>
            <p className="text-muted-foreground text-sm">Apaisent et respectent l'équilibre</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}