import { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomBreadcrumb } from "@/components/CustomBreadcrumb";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Heart, Star, Grid, List, ShoppingCart, Filter, Sparkles, Palette, Brush, Eye } from 'lucide-react';
import { WishlistButton } from "@/components/WishlistButton";
import { StarRating } from "@/components/StarRating";
import { ProductCard } from "@/components/ui/ProductCard";

const categories = [
  'Tous les produits',
  'Fond de teint',
  'Rouge à lèvres', 
  'Mascara & Eyeliner',
  'Fards à paupières',
  'Blush & Contouring',
  'Vernis à ongles'
];

const brands = [
  'ACM laboratoire', 'Avène', 'Beauty of Joseon', 'Bi-oil', 'Biocyte', 'Biolane', 
  'Bio Recherche', 'Caudalie', 'CeraVe', 'Château Rouge', 'Dove', 'Ducray', 
  'Eucerin', 'Klorane', 'La Roche-Posay', 'Laneige', 'Mixa', 'Nivea', 
  'Nuhanciam', 'OXYPROLANE', 'Topicrem', 'Uriage', 'Vaseline'
];

const products = [
  {
    id: '1',
    name: 'L\'Oréal True Match Fond de Teint',
    brand: 'L\'Oréal',
    category: 'Fond de teint',
    originalPrice: 8500,
    currentPrice: 6800,
    rating: 4.6,
    reviews: 723,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 20,
    inStock: true,
    description: 'Fond de teint liquide longue tenue'
  },
  {
    id: '2',
    name: 'Maybelline Superstay Matte Ink',
    brand: 'Maybelline',
    category: 'Rouge à lèvres',
    originalPrice: 4500,
    currentPrice: 4500,
    rating: 4.8,
    reviews: 1245,
    image: '/placeholder.svg',
    isPromo: false,
    inStock: true,
    description: 'Rouge à lèvres liquide mat longue tenue'
  },
  {
    id: '3',
    name: 'NYX Professional Makeup Epic Ink Liner',
    brand: 'NYX',
    category: 'Mascara & Eyeliner',
    originalPrice: 3500,
    currentPrice: 2800,
    rating: 4.7,
    reviews: 892,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 20,
    inStock: true,
    description: 'Eyeliner feutre précision ultra'
  },
  {
    id: '4',
    name: 'Urban Decay Naked Eyeshadow Palette',
    brand: 'Urban Decay',
    category: 'Fards à paupières',
    originalPrice: 25000,
    currentPrice: 25000,
    rating: 4.9,
    reviews: 567,
    image: '/placeholder.svg',
    isPromo: false,
    inStock: false,
    description: 'Palette de fards à paupières neutres'
  },
  {
    id: '5',
    name: 'Fenty Beauty Cheeks Out Blush',
    brand: 'Fenty Beauty',
    category: 'Blush & Contouring',
    originalPrice: 12000,
    currentPrice: 10800,
    rating: 4.8,
    reviews: 431,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 10,
    inStock: true,
    description: 'Blush crème modulable'
  },
  {
    id: '6',
    name: 'Essie Nail Polish',
    brand: 'Essie',
    category: 'Vernis à ongles',
    originalPrice: 3000,
    currentPrice: 3000,
    rating: 4.5,
    reviews: 298,
    image: '/placeholder.svg',
    isPromo: false,
    inStock: true,
    description: 'Vernis à ongles longue tenue'
  }
];

export default function Maquillage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous les produits');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Tous les produits' || product.category === selectedCategory;
    const brandMatch = !selectedBrand || selectedBrand === 'all' || product.brand === selectedBrand;
    const priceMatch = product.currentPrice >= priceRange[0] && product.currentPrice <= priceRange[1];
    
    return categoryMatch && brandMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.currentPrice - b.currentPrice;
      case 'price-desc':
        return b.currentPrice - a.currentPrice;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('XOF', 'FCFA');
  };

  const benefits = [
    {
      icon: <Palette className="h-8 w-8 text-pink-500" />,
      title: "Couleurs",
      description: "Gamme complète de teintes"
    },
    {
      icon: <Brush className="h-8 w-8 text-purple-500" />,
      title: "Application",
      description: "Texture facile à appliquer"
    },
    {
      icon: <Eye className="h-8 w-8 text-blue-500" />,
      title: "Longue Tenue",
      description: "Résistance toute la journée"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-amber-500" />,
      title: "Finition",
      description: "Résultat professionnel"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Maquillage Premium | Flawless Beauty</title>
        <meta name="description" content="Découvrez notre collection de maquillage premium. L'Oréal, Maybelline, NYX et plus. Livraison 24h au Sénégal." />
        <meta name="keywords" content="maquillage, cosmétique, fond de teint, rouge à lèvres, mascara, Sénégal" />
        <link rel="canonical" href="https://flawlessbeauty.sn/maquillage" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Header />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-pink-100 via-purple-50 to-fuchsia-100 py-16">
          <div className="absolute inset-0 bg-white/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <CustomBreadcrumb className="mb-6" />
            
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Maquillage</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 font-inter">
                Exprimez votre beauté unique avec notre collection de maquillage premium. 
                Des couleurs vibrantes aux finitions parfaites.
              </p>
              
              {/* Benefits Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col items-center text-center">
                      {benefit.icon}
                      <h3 className="font-semibold text-gray-900 mt-2 mb-1">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-80 space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Filter className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Filtres</h2>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-3 mb-6">
                    <label className="text-sm font-medium text-gray-700">Catégorie</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-lg z-50">
                        {categories.map(category => (
                          <SelectItem key={category} value={category} className="hover:bg-gray-50">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Brand Filter */}
                  <div className="space-y-3 mb-6">
                    <label className="text-sm font-medium text-gray-700">Marque</label>
                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Toutes les marques" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-lg z-50">
                        <SelectItem value="all">Toutes les marques</SelectItem>
                        {brands.map(brand => (
                          <SelectItem key={brand} value={brand} className="hover:bg-gray-50">
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3 mb-6">
                    <label className="text-sm font-medium text-gray-700">
                      Prix: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={30000}
                      min={0}
                      step={500}
                      className="w-full"
                    />
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedCategory('Tous les produits');
                      setSelectedBrand('all');
                      setPriceRange([0, 30000]);
                    }}
                  >
                    Réinitialiser
                  </Button>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Toolbar */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-soft">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">{sortedProducts.length}</span> produits trouvés
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-lg z-50">
                        <SelectItem value="popularity">Plus populaires</SelectItem>
                        <SelectItem value="price-asc">Prix croissant</SelectItem>
                        <SelectItem value="price-desc">Prix décroissant</SelectItem>
                        <SelectItem value="rating">Mieux notés</SelectItem>
                        <SelectItem value="name">Nom A-Z</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="rounded-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="rounded-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {sortedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Filter className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
                  <p className="text-gray-600">Essayez de modifier vos filtres pour voir plus de produits.</p>
                </div>
              ) : (
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' 
                  : 'space-y-6'
                }>
                  {sortedProducts.map((product, index) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      showWishlist={true}
                      showRating={true}
                      showDescription={true}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}