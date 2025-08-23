import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Heart, Star, Filter, Grid, List, ShoppingCart, Shield, Lock } from 'lucide-react';

const categories = [
  'Tous les produits',
  'Préservatifs',
  'Lubrifiants',
  'Gels intimes',
  'Compléments bien-être',
  'Hygiène intime',
  'Tests de grossesse',
  'Contraception',
  'Soins intimes',
  'Accessoires bien-être'
];

const brands = [
  'ACM laboratoire', 'Avène', 'Bio Recherche', 'CeraVe', 'Dove', 'Eucerin', 
  'La Roche-Posay', 'Mixa', 'Nivea', 'OXYPROLANE', 'Uriage', 'Vaseline'
];

const products = [
  {
    id: 1,
    name: 'Durex Préservatifs Sensation Naturelle x12',
    brand: 'Durex',
    category: 'Préservatifs',
    originalPrice: 4500,
    currentPrice: 3600,
    rating: 4.6,
    reviews: 234,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 20,
    discrete: true
  },
  {
    id: 2,
    name: 'Manix Lubrifiant Gel Intime 50ml',
    brand: 'Manix',
    category: 'Lubrifiants',
    originalPrice: 3200,
    currentPrice: 2900,
    rating: 4.5,
    reviews: 156,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 9,
    discrete: true
  },
  {
    id: 3,
    name: 'Saforelle Gel Lavant Doux pH Neutre 250ml',
    brand: 'Saforelle',
    category: 'Hygiène intime',
    originalPrice: 5800,
    currentPrice: 5800,
    rating: 4.8,
    reviews: 423,
    image: '/placeholder.svg',
    isNew: true,
    discrete: false
  },
  {
    id: 4,
    name: 'Test de Grossesse Clearblue Digital',
    brand: 'Clearblue',
    category: 'Tests de grossesse',
    originalPrice: 8500,
    currentPrice: 7600,
    rating: 4.7,
    reviews: 567,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 11,
    discrete: true
  },
  {
    id: 5,
    name: 'Saugella Gel Intime Apaisant 100ml',
    brand: 'Saugella',
    category: 'Soins intimes',
    originalPrice: 4200,
    currentPrice: 3800,
    rating: 4.6,
    reviews: 289,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 10,
    discrete: false
  },
  {
    id: 6,
    name: 'Control Préservatifs Ultra Fins x10',
    brand: 'Control',
    category: 'Préservatifs',
    originalPrice: 3800,
    currentPrice: 3800,
    rating: 4.4,
    reviews: 178,
    image: '/placeholder.svg',
    discrete: true
  }
];

export default function Sexualite() {
  const [selectedCategory, setSelectedCategory] = useState('Tous les produits');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [isAdultConfirmed, setIsAdultConfirmed] = useState(false);

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

  // Age verification modal
  if (!isAdultConfirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-2">Vérification d'âge</h2>
              <p className="text-muted-foreground">
                Cette section contient des produits pour adultes. Vous devez avoir au moins 18 ans pour y accéder.
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => setIsAdultConfirmed(true)}
                className="w-full"
              >
                J'ai plus de 18 ans
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="w-full"
              >
                Retour
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              En confirmant, vous certifiez être majeur selon la législation de votre pays.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-500 via-pink-500 to-rose-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-playfair font-bold">
              Sexualité & Bien-être
            </h1>
          </div>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Des produits de qualité pour votre bien-être intime et votre santé sexuelle
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

            {/* Privacy Info */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <h4 className="font-semibold text-primary mb-2">🔒 Confidentialité</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Emballage discret</li>
                  <li>• Livraison confidentielle</li>
                  <li>• Paiement sécurisé</li>
                  <li>• Produits certifiés CE</li>
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
                        {product.discrete && (
                          <Badge variant="outline" className="bg-white/90 text-xs">
                            <Lock className="w-3 h-3 mr-1" />
                            Discret
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