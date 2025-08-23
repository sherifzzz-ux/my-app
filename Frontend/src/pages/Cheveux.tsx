import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Heart, Star, Filter, Grid, List, ShoppingCart } from 'lucide-react';

const categories = [
  'Tous les produits',
  'Shampooings',
  'Après-shampooings',
  'Masques capillaires',
  'Sérums & Huiles',
  'Produits coiffants',
  'Colorations',
  'Soins anti-chute',
  'Soins cheveux bouclés',
  'Accessoires cheveux'
];

const brands = [
  'ACM laboratoire', 'Avène', 'Beauty of Joseon', 'Bi-oil', 'Biocyte', 'Biolane', 
  'Bio Recherche', 'Caudalie', 'CeraVe', 'Château Rouge', 'Dove', 'Ducray', 
  'Eucerin', 'Granions', 'Klorane', 'La Roche-Posay', 'Laneige', 'Mixa', 'Nivea', 
  'Nuhanciam', 'OXYPROLANE', 'Topicrem', 'Uriage', 'Vaseline'
];

const products = [
  {
    id: 1,
    name: 'Creme of Nature Pure Honey Shampooing',
    brand: 'Creme of Nature',
    category: 'Shampooings',
    originalPrice: 5500,
    currentPrice: 4400,
    rating: 4.8,
    reviews: 612,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 20
  },
  {
    id: 2,
    name: 'Cantu Masque Réparateur Karité',
    brand: 'Cantu',
    category: 'Masques capillaires',
    originalPrice: 7200,
    currentPrice: 6500,
    rating: 4.7,
    reviews: 398,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 10
  },
  {
    id: 3,
    name: 'L\'Oréal Sérum Anti-Chute Aminexil',
    brand: 'L\'Oréal',
    category: 'Soins anti-chute',
    originalPrice: 15000,
    currentPrice: 15000,
    rating: 4.6,
    reviews: 234,
    image: '/placeholder.svg',
    isNew: true
  },
  {
    id: 4,
    name: 'Shea Moisture Huile Coco & Hibiscus',
    brand: 'Shea Moisture',
    category: 'Sérums & Huiles',
    originalPrice: 8500,
    currentPrice: 7200,
    rating: 4.9,
    reviews: 456,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 15
  },
  {
    id: 5,
    name: 'Garnier Fructis Gel Coiffant',
    brand: 'Garnier',
    category: 'Produits coiffants',
    originalPrice: 3200,
    currentPrice: 2700,
    rating: 4.3,
    reviews: 289,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 16
  },
  {
    id: 6,
    name: 'Pantene Après-shampooing Nutrition',
    brand: 'Pantene',
    category: 'Après-shampooings',
    originalPrice: 4500,
    currentPrice: 4500,
    rating: 4.5,
    reviews: 367,
    image: '/placeholder.svg'
  }
];

export default function Cheveux() {
  const [selectedCategory, setSelectedCategory] = useState('Tous les produits');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Tous les produits' || product.category === selectedCategory;
    const brandMatch = !selectedBrand || selectedBrand === 'all' || product.brand === selectedBrand;
    const priceMatch = product.currentPrice >= priceRange[0] && product.currentPrice <= priceRange[1];
    
    return categoryMatch && brandMatch && priceMatch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-600 via-yellow-500 to-orange-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            Cheveux
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Des soins capillaires adaptés à tous types de cheveux pour une chevelure éclatante de santé
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5" />
                  <h3 className="font-semibold">Filtres</h3>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Catégorie</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Marque</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les marques" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les marques</SelectItem>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Prix: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={20000}
                    min={0}
                    step={500}
                    className="mt-2"
                  />
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory('Tous les produits');
                    setSelectedBrand('all');
                    setPriceRange([0, 20000]);
                  }}
                >
                  Réinitialiser
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">{filteredProducts.length}</span> produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              </p>
              
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularité</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="rating">Meilleures notes</SelectItem>
                    <SelectItem value="newest">Nouveautés</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {filteredProducts.map(product => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.isNew && (
                          <Badge className="bg-success text-success-foreground">
                            Nouveau
                          </Badge>
                        )}
                        {product.isPromo && (
                          <Badge className="bg-urgent text-urgent-foreground">
                            -{product.discountPercentage}%
                          </Badge>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">
                        {product.brand}
                      </div>
                      
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">
                            {formatPrice(product.currentPrice)}
                          </span>
                          {product.originalPrice > product.currentPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        
                        <Button size="sm">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Ajouter
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Aucun produit ne correspond à vos critères de recherche.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}