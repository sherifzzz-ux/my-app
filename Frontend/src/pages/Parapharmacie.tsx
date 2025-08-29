import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Heart, Star, Filter, Grid, List, ShoppingCart, Cross, Stethoscope } from 'lucide-react';
import { ProductCard } from "@/components/ui/ProductCard";

const categories = [
  'Tous les produits',
  'Vitamines & Compléments',
  'Médicaments sans ordonnance',
  'Premiers secours',
  'Dispositifs médicaux',
  'Matériel médical',
  'Diabète & Glycémie',
  'Tension artérielle',
  'Thermomètres',
  'Orthopédie',
  'Incontinence'
];

const brands = [
  'ACM laboratoire', 'Avène', 'Biocyte', 'Bio Recherche', 'Caudalie', 'CeraVe', 
  'Ducray', 'Eafit', 'Eucerin', 'Granions', 'Klorane', 'La Roche-Posay', 
  'Mixa', 'Nivea', 'Nuhanciam', 'Nova', 'OXYPROLANE', 'Topicrem', 'Uriage'
];

const products = [
  {
    id: 1,
    name: 'Arkopharma Multivitamines & Minéraux 60 gélules',
    brand: 'Arkopharma',
    category: 'Vitamines & Compléments',
    originalPrice: 8500,
    currentPrice: 7200,
    rating: 4.6,
    reviews: 432,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 15,
    prescription: false
  },
  {
    id: 2,
    name: 'Omron Tensiomètre Automatique M2 Basic',
    brand: 'Omron',
    category: 'Tension artérielle',
    originalPrice: 32000,
    currentPrice: 28800,
    rating: 4.8,
    reviews: 234,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 10,
    prescription: false
  },
  {
    id: 3,
    name: 'Thermomètre Digital Infrarouge Sans Contact',
    brand: 'Omron',
    category: 'Thermomètres',
    originalPrice: 18500,
    currentPrice: 18500,
    rating: 4.7,
    reviews: 567,
    image: '/placeholder.svg',
    isNew: true,
    prescription: false
  },
  {
    id: 4,
    name: 'Urgo Pansements Hydrocolloides 10x',
    brand: 'Urgo',
    category: 'Premiers secours',
    originalPrice: 4200,
    currentPrice: 3800,
    rating: 4.5,
    reviews: 189,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 10,
    prescription: false
  },
  {
    id: 5,
    name: 'Bion 3 Défense Immunité 60 comprimés',
    brand: 'Bion 3',
    category: 'Vitamines & Compléments',
    originalPrice: 12500,
    currentPrice: 10600,
    rating: 4.4,
    reviews: 345,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 15,
    prescription: false
  },
  {
    id: 6,
    name: 'Tena Protections Anatomiques x20',
    brand: 'Tena',
    category: 'Incontinence',
    originalPrice: 6800,
    currentPrice: 6800,
    rating: 4.3,
    reviews: 123,
    image: '/placeholder.svg',
    prescription: false
  }
];

export default function Parapharmacie() {
  const [selectedCategory, setSelectedCategory] = useState('Tous les produits');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 40000]);
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
      <section className="bg-gradient-to-br from-teal-600 via-cyan-500 to-blue-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cross className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-playfair font-bold">
              Parapharmacie
            </h1>
          </div>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Votre pharmacie en ligne pour tous vos besoins de santé et bien-être au quotidien
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
                    max={40000}
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
                    setPriceRange([0, 40000]);
                  }}
                >
                  Réinitialiser
                </Button>
              </CardContent>
            </Card>

            {/* Health Info */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" />
                  Conseil santé
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Produits certifiés CE</li>
                  <li>• Conseil pharmaceutique</li>
                  <li>• Livraison sécurisée</li>
                  <li>• Service client spécialisé</li>
                </ul>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Important Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Important :</strong> Les produits de parapharmacie ne remplacent pas une consultation médicale. 
                En cas de doute, consultez votre médecin ou pharmacien.
              </p>
            </div>

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