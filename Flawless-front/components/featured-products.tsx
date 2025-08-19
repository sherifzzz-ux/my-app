import { Button } from "@/components/ui/button"

const featuredProducts = [
  {
    id: 1,
    title: "RESSOURCES",
    description: "Retrouvez chaque jour vos routines Françoise avec de la nature dans vos soins.",
    image: "/placeholder-15xmv.png",
    buttonText: "Voir les produits",
    buttonColor: "bg-pink-600 hover:bg-pink-700",
  },
  {
    id: 2,
    title: "MAQUILLAGE",
    description: "Les produits maquillage à avoir dans votre trousse de beauté pour un look parfait.",
    image: "/placeholder.svg?height=300&width=400",
    buttonText: "Voir les produits",
    buttonColor: "bg-pink-600 hover:bg-pink-700",
  },
  {
    id: 3,
    title: "ALOE",
    description: "La meilleure gamme de soins capillaires à base d'Aloe Vera pour cheveux en bonne santé.",
    image: "/placeholder.svg?height=300&width=400",
    buttonText: "Voir les produits",
    buttonColor: "bg-pink-600 hover:bg-pink-700",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Découvrez notre sélection du moment</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover-scale">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{product.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                <Button className={`w-full ${product.buttonColor} text-white`}>{product.buttonText}</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
