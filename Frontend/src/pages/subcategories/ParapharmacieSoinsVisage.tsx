import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function ParapharmacieSoinsVisage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Soins du Visage Parapharmacie | Flawless Beauty</title>
        <meta name="description" content="Soins dermatologiques et traitements spécialisés pour le visage recommandés en parapharmacie." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Parapharmacie", href: "/parapharmacie" },
            { label: "Soins du Visage" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Soins du Visage Parapharmacie
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Traitements dermatologiques et soins spécialisés recommandés par les professionnels de santé.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Dermatologie</h3>
            <p className="text-muted-foreground text-sm">Traitements peaux à problèmes</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Anti-âge Médical</h3>
            <p className="text-muted-foreground text-sm">Efficacité cliniquement prouvée</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Peaux Sensibles</h3>
            <p className="text-muted-foreground text-sm">Formules hypoallergéniques</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}