import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Heart, Star, Filter, Grid, List, ShoppingCart } from 'lucide-react';
import { ProductCard } from "@/components/ui/ProductCard";

const categories = [
  'Tous les produits',
  'Parfums Femme',
  'Parfums Homme',
  'Parfums Mixte',
  'Eaux de toilette',
  'Eaux de parfum',
  'Déodorants parfumés',
  'Coffrets cadeaux',
  'Miniatures',
  'Parfums orientaux'
];

const brands = [
  'ACM laboratoire', 'Avène', 'Beauty of Joseon', 'Bi-oil', 'Biocyte', 'Biolane', 
  'Bio Recherche', 'Caudalie', 'CeraVe', 'Château Rouge', 'Dove', 'Ducray', 
  'Eucerin', 'Klorane', 'La Roche-Posay', 'Laneige', 'Mixa', 'Nivea', 
  'Nuhanciam', 'OXYPROLANE', 'Topicrem', 'Uriage', 'Vaseline'
];

const products = [
  {
    id: 1,
    name: 'Calvin Klein CK One EDT 100ml',
    brand: 'Calvin Klein',
    category: 'Parfums Mixte',
    originalPrice: 18500,
    currentPrice: 14800,
    rating: 4.7,
    reviews: 892,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 20
  },
  {
    id: 2,
    name: 'Hugo Boss Bottled EDT 100ml',
    brand: 'Hugo Boss',
    category: 'Parfums Homme',
    originalPrice: 22000,
    currentPrice: 19800,
    rating: 4.8,
    reviews: 567,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 10
  },
  {
    id: 3,
    name: 'Paco Rabanne Lady Million EDP 80ml',
    brand: 'Paco Rabanne',
    category: 'Parfums Femme',
    originalPrice: 35000,
    currentPrice: 35000,
    rating: 4.9,
    reviews: 423,
    image: '/placeholder.svg',
    isNew: true
  },
  {
    id: 4,
    name: 'Versace Bright Crystal EDT 90ml',
    brand: 'Versace',
    category: 'Parfums Femme',
    originalPrice: 28000,
    currentPrice: 23800,
    rating: 4.6,
    reviews: 334,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 15
  },
  {
    id: 5,
    name: 'Dolce & Gabbana The One EDP 75ml',
    brand: 'Dolce & Gabbana',
    category: 'Parfums Homme',
    originalPrice: 32000,
    currentPrice: 27200,
    rating: 4.8,
    reviews: 245,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 15
  },
  {
    id: 6,
    name: 'Giorgio Armani Code EDT 125ml',
    brand: 'Giorgio Armani',
    category: 'Parfums Homme',
    originalPrice: 38000,
    currentPrice: 38000,
    rating: 4.7,
    reviews: 198,
    image: '/placeholder.svg'
  }
];

export default function Parfumerie() {
  const [selectedCategory, setSelectedCategory] = useState('Tous les produits');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
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
      <section className="bg-gradient-to-br from-purple-600 via-indigo-500 to-purple-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            Parfumerie
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Découvrez notre collection exclusive de parfums et fragrances pour toutes les occasions
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
                    max={50000}
                    min={0}
                    step={1000}
                    className="mt-2"
                  />
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory('Tous les produits');
                    setSelectedBrand('all');
                    setPriceRange([0, 50000]);
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
                <ProductCard key={product.id} product={product} />
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