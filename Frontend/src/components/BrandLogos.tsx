const brands = [
  { name: "SkinCeuticals", logo: "https://via.placeholder.com/120x60/e5e7eb/6b7280?text=SkinCeuticals" },
  { name: "CeraVe", logo: "https://via.placeholder.com/120x60/e5e7eb/6b7280?text=CeraVe" },
  { name: "The Ordinary", logo: "https://via.placeholder.com/120x60/e5e7eb/6b7280?text=The+Ordinary" },
  { name: "Neutrogena", logo: "https://via.placeholder.com/120x60/e5e7eb/6b7280?text=Neutrogena" },
  { name: "L'Oréal", logo: "https://via.placeholder.com/120x60/e5e7eb/6b7280?text=L%27Or%C3%A9al" },
  { name: "Vichy", logo: "https://via.placeholder.com/120x60/e5e7eb/6b7280?text=Vichy" },
  { name: "La Roche-Posay", logo: "https://via.placeholder.com/120x60/e5e7eb/6b7280?text=La+Roche-Posay" },
  { name: "Garnier", logo: "https://via.placeholder.com/120x60/e5e7eb/6b7280?text=Garnier" },
  { name: "Maybelline", logo: "https://via.placeholder.com/120x60/e5e7eb/6b7280?text=Maybelline" },
  { name: "NYX", logo: "https://via.placeholder.com/120x60/e5e7eb/6b7280?text=NYX" },
  { name: "Revlon", logo: "https://via.placeholder.com/120x60/e5e7eb/6b7280?text=Revlon" },
  { name: "Dove", logo: "https://via.placeholder.com/120x60/e5e7eb/6b7280?text=Dove" }
]

export function BrandLogos() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
            Nos Marques Partenaires
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez les plus grandes marques de cosmétiques et parapharmacie
          </p>
        </div>

        {/* Scrolling brands container */}
        <div className="relative overflow-hidden">
          <div className="flex space-x-8 animate-scroll">
            {/* First set of brands */}
            {brands.map((brand, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {brands.map((brand, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}