'use client'

import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'

const showcaseProducts = [
  {
    id: 1,
    brand: 'REVOLUTION',
    title: 'Conceal and Define',
    subtitle: 'Correcteur Liquide',
    description: 'Couverture légère mais complète pour couvrir les imperfections',
    image: '/placeholder.svg?height=400&width=600',
    price: '15.900 CFA',
    originalPrice: '18.900 CFA',
  },
]

const productGrid = [
  {
    id: 1,
    name: 'Acti + Sérum Anti-Âge Vitamine C',
    price: '15.900 CFA',
    originalPrice: '18.900 CFA',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 2,
    name: 'Acti + Sérum Hydratant Acide Hyaluronique',
    price: '15.900 CFA',
    originalPrice: '18.900 CFA',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 3,
    name: 'Acti + Crème Purifiante Niacinamide',
    price: '15.900 CFA',
    originalPrice: '18.900 CFA',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 4,
    name: 'Acti + Gel Nettoyant Doux',
    price: '15.900 CFA',
    originalPrice: '18.900 CFA',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 5,
    name: 'Acti + Masque Hydratant',
    price: '15.900 CFA',
    originalPrice: '18.900 CFA',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 6,
    name: 'Acti + Crème Hydratante Jour',
    price: '15.900 CFA',
    originalPrice: '18.900 CFA',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 7,
    name: 'Acti + Huile Démaquillante',
    price: '15.900 CFA',
    originalPrice: '18.900 CFA',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 8,
    name: 'Acti + Crème Réparatrice Nuit',
    price: '15.900 CFA',
    originalPrice: '18.900 CFA',
    image: '/placeholder.svg?height=200&width=200',
  },
]

export function ProductShowcase() {
  const { dispatch } = useCart()

  const addToCart = (product: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name || product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image || '/placeholder.svg',
      },
    })
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hero product showcase */}
        <div className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={showcaseProducts[0].image || '/placeholder.svg'}
                alt={showcaseProducts[0].title}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="bg-black text-white px-4 py-2 inline-block rounded mb-4">
                {showcaseProducts[0].brand}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {showcaseProducts[0].title}
              </h2>
              <h3 className="text-xl text-gray-700 mb-4">{showcaseProducts[0].subtitle}</h3>
              <p className="text-gray-600 mb-6">{showcaseProducts[0].description}</p>
              <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                <span className="text-2xl font-bold text-pink-600">
                  {showcaseProducts[0].price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {showcaseProducts[0].originalPrice}
                </span>
              </div>
              <Button
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3"
                onClick={() => addToCart(showcaseProducts[0])}
              >
                Ajouter au panier
              </Button>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {productGrid.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover-scale"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex flex-col space-y-1">
                  <span className="text-lg font-bold text-pink-600">{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                </div>
                <Button
                  className="w-full mt-3 bg-pink-600 hover:bg-pink-700 text-white text-sm"
                  onClick={() => addToCart(product)}
                >
                  Ajouter
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
