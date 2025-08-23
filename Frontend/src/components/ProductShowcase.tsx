import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ProductShowcase() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Soin Premium
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-foreground">
              Korean Beauty
              <span className="block text-primary">Routine</span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              Découvrez les secrets de beauté coréens avec notre sélection exclusive 
              de produits K-Beauty. Une routine en plusieurs étapes pour une peau 
              parfaite et éclatante.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Double nettoyage en profondeur</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Essences et sérums concentrés</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Masques tissu ultra-hydratants</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Protection solaire quotidienne</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="primary-gradient">
                Découvrir K-Beauty
              </Button>
              <Button variant="outline" size="lg">
                Guide de routine
              </Button>
            </div>
          </div>

          {/* Image showcase */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="K-Beauty product 1"
                  className="w-full h-48 object-cover rounded-lg shadow-md hover-scale"
                />
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="K-Beauty product 2"
                  className="w-full h-32 object-cover rounded-lg shadow-md hover-scale"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1598662779094-110c2bad80b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="K-Beauty product 3"
                  className="w-full h-32 object-cover rounded-lg shadow-md hover-scale"
                />
                <img
                  src="https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="K-Beauty product 4"
                  className="w-full h-48 object-cover rounded-lg shadow-md hover-scale"
                />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-4 shadow-lg">
              <div className="text-center">
                <div className="text-xl font-bold">10+</div>
                <div className="text-xs">Étapes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}