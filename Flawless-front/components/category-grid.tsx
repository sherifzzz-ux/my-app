import Link from "next/link"

const categories = [
  {
    name: "Soins Visage",
    image: "/woman-skincare-smile.png",
    href: "/soin-du-visage",
    color: "from-pink-200 to-pink-300",
    textColor: "text-white",
  },
  {
    name: "Bien-être Intime",
    image: "/couple-intimate-wellness.png",
    href: "/bien-etre-intime",
    color: "from-red-200 to-pink-300",
    textColor: "text-white",
  },
  {
    name: "Korean Beauty",
    image: "/glowing-asian-woman-korean-beauty.png",
    href: "/korean-beauty",
    color: "from-blue-200 to-cyan-300",
    textColor: "text-white",
  },
  {
    name: "Corps & Bain",
    image: "/woman-spa-products.png",
    href: "/corps-bain",
    color: "from-pink-200 to-rose-300",
    textColor: "text-white",
  },
  {
    name: "Cheveux",
    image: "/beautiful-hair-care.png",
    href: "/cheveux",
    color: "from-purple-200 to-pink-300",
    textColor: "text-white",
  },
  {
    name: "Soins Bébé",
    image: "/mother-baby-gentle-care.png",
    href: "/soins-bebe",
    color: "from-blue-200 to-blue-300",
    textColor: "text-white",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif text-pink-600 mb-2">Flawless Beauty</h2>
          <p className="text-pink-600 font-medium">Parapharmacie en ligne & Cosmétiques</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <div className="group relative overflow-hidden rounded-lg aspect-square hover-scale cursor-pointer">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`} />
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 mx-auto">
                      <div className="w-6 h-6 bg-white rounded-full" />
                    </div>
                    <h3 className={`text-lg md:text-xl font-bold ${category.textColor} drop-shadow-lg`}>
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
