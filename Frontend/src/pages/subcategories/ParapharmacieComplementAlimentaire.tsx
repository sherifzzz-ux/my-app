import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { ProductGridWithCart } from "@/components/ProductGridWithCart";

export default function ParapharmacieComplementAlimentaire() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Complément Alimentaire | Flawless Beauty</title>
        <meta name="description" content="Découvrez notre gamme de compléments alimentaires pour votre bien-être et votre beauté de l'intérieur." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CustomBreadcrumb 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Parapharmacie", href: "/parapharmacie" },
            { label: "Complément Alimentaire" }
          ]} 
        />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair text-foreground mb-6">
            Complément Alimentaire
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Renforcez votre bien-être avec notre sélection de compléments alimentaires de qualité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Vitamines</h3>
            <p className="text-muted-foreground text-sm">Vitalité et énergie au quotidien</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Beauté</h3>
            <p className="text-muted-foreground text-sm">Peau, cheveux, ongles</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Immunité</h3>
            <p className="text-muted-foreground text-sm">Défenses naturelles renforcées</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Minceur</h3>
            <p className="text-muted-foreground text-sm">Accompagnement silhouette</p>
          </div>
        </div>

        <ProductGridWithCart />
      </main>
      
      <Footer />
    </div>
  );
}