const brands = [
  { name: 'ACM', logo: '/placeholder.svg?height=60&width=120' },
  { name: 'KLORANE', logo: '/placeholder.svg?height=60&width=120' },
  { name: 'NIVEA', logo: '/placeholder.svg?height=60&width=120' },
  { name: 'Caudalie', logo: '/placeholder.svg?height=60&width=120' },
  { name: 'The Ordinary', logo: '/placeholder.svg?height=60&width=120' },
  { name: 'La Roche Posay', logo: '/placeholder.svg?height=60&width=120' },
  { name: 'Vichy', logo: '/placeholder.svg?height=60&width=120' },
  { name: 'Eucerin', logo: '/placeholder.svg?height=60&width=120' },
]

export function BrandLogos() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Top marques</h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {brands.map((brand, index) => (
              <div key={`first-${index}`} className="flex-shrink-0 mx-8">
                <img
                  src={brand.logo || '/placeholder.svg'}
                  alt={brand.name}
                  className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {brands.map((brand, index) => (
              <div key={`second-${index}`} className="flex-shrink-0 mx-8">
                <img
                  src={brand.logo || '/placeholder.svg'}
                  alt={brand.name}
                  className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
