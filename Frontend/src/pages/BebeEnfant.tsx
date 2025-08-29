import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Heart, Star, Filter, Grid, List, ShoppingCart, Baby, Child } from 'lucide-react';
import { ProductCard } from "@/components/ui/ProductCard";

const categories = [
  'Tous les produits',
  'Soins bébé 0-12 mois',
  'Soins enfant 1-5 ans',
  'Bain & Hygiène',
  'Soins du siège',
  'Produits cheveux',
  'Protection solaire',
  'Alimentation bébé',
  'Accessoires bébé',
  'Soins naturels'
];

const brands = [
  'ACM laboratoire', 'Avène', 'Biocyte', 'Biolane', 'Bio Recherche', 'Caudalie', 
  'CeraVe', 'Dove', 'Ducray', 'Eucerin', 'Klorane', 'La Roche-Posay', 
  'Mixa', 'Nivea', 'Nuhanciam', 'OXYPROLANE', 'Topicrem', 'Uriage', 'Vaseline'
];

const products = [
  {
    id: 1,
    name: 'Mustela Gel Lavant Doux Bébé 500ml',
    brand: 'Mustela',
    category: 'Bain & Hygiène',
    originalPrice: 6500,
    currentPrice: 5200,
    rating: 4.9,
    reviews: 567,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 20,
    ageRange: '0-12 mois'
  },
  {
    id: 2,
    name: 'Weleda Crème pour le Change 75ml',
    brand: 'Weleda',
    category: 'Soins du siège',
    originalPrice: 4800,
    currentPrice: 4300,
    rating: 4.8,
    reviews: 423,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 10,
    ageRange: '0-24 mois'
  },
  {
    id: 3,
    name: 'Johnson\'s Baby Shampooing Doux 300ml',
    brand: 'Johnson\'s Baby',
    category: 'Produits cheveux',
    originalPrice: 3200,
    currentPrice: 3200,
    rating: 4.6,
    reviews: 789,
    image: '/placeholder.svg',
    isNew: true,
    ageRange: '0-3 ans'
  },
  {
    id: 4,
    name: 'Avène Pédiatril Lait Hydratant 200ml',
    brand: 'Avène Pédiatril',
    category: 'Soins bébé 0-12 mois',
    originalPrice: 8500,
    currentPrice: 7600,
    rating: 4.7,
    reviews: 234,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 11,
    ageRange: '0-6 mois'
  },
  {
    id: 5,
    name: 'Uriage Bébé Crème Solaire SPF50+ 50ml',
    brand: 'Uriage Bébé',
    category: 'Protection solaire',
    originalPrice: 7800,
    currentPrice: 6800,
    rating: 4.8,
    reviews: 156,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 13,
    ageRange: '6 mois+'
  },
  {
    id: 6,
    name: 'Sebamed Baby Lotion Extra Douce 200ml',
    brand: 'Sebamed Baby',
    category: 'Soins enfant 1-5 ans',
    originalPrice: 5500,
    currentPrice: 5500,
    rating: 4.5,
    reviews: 345,
    image: '/placeholder.svg',
    ageRange: '1-5 ans'
  }
];

export default function BebeEnfant() {
  const [selectedCategory, setSelectedCategory] = useState('Tous les produits');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
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
      <section className="bg-gradient-to-br from-green-500 via-emerald-400 to-teal-300 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Baby className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-playfair font-bold">
              Bébé & Enfant
            </h1>
          </div>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Des soins doux et sécurisés spécialement conçus pour la peau délicate de votre bébé
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
                    max={10000}
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
                    setPriceRange([0, 10000]);
                  }}
                >
                  Réinitialiser
                </Button>
              </CardContent>
            </Card>

            {/* Safety Info */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <h4 className="font-semibold text-success mb-2">🛡️ Sécurité garantie</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Produits testés dermatologiquement</li>
                  <li>• Formules hypoallergéniques</li>
                  <li>• Sans parabènes ni sulfates</li>
                  <li>• Recommandés par les pédiatres</li>
                </ul>
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