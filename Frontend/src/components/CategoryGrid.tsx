import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"

const categories = [
  {
    name: "Soin du Visage",
    href: "/soin-du-visage",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Nettoyants, sérums, crèmes"
  },
  {
    name: "Corps & Bain",
    href: "/corps-bain",
    image: "https://images.unsplash.com/photo-1570554886111-e80fcac6c51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Gels douche, crèmes corps"
  },
  {
    name: "Maquillage",
    href: "/maquillage",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Teint, yeux, lèvres"
  },
  {
    name: "Cheveux",
    href: "/cheveux",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Shampooings, soins"
  },
  {
    name: "Korean Beauty",
    href: "/korean-beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "K-Beauty tendance"
  },
  {
    name: "Parfums",
    href: "/parfums",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Eaux de parfum"
  },
  {
    name: "Parapharmacie",
    href: "/parapharmacie",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031e3a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Santé & bien-être"
  },
  {
    name: "Bébé & Enfant",
    href: "/bebe-enfant",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Soins doux"
  }
]

export function CategoryGrid() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
            Nos Catégories
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez notre large sélection de produits de beauté et cosmétiques
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} to={category.href}>
              <Card className="group hover-scale cursor-pointer overflow-hidden h-full">
                <div className="relative aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}