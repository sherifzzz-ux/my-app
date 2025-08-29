import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Heart, Star, Filter, Grid, List, ShoppingCart, Search, X, TrendingUp } from 'lucide-react';
import { ProductCard } from "@/components/ui/ProductCard";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";

// Mock data combining all categories
const allProducts = [
  // Soin du visage
  {
    id: 1,
    name: 'Mixa Duo Soins Éclat Anti Taches',
    brand: 'Mixa',
    category: 'Soin du visage',
    subCategory: 'Anti-taches',
    originalPrice: 12500,
    currentPrice: 9500,
    rating: 4.8,
    reviews: 245,
    image: '/placeholder.svg',
    isNew: true,
    isPromo: true,
    discountPercentage: 24
  },
  // Corps & Bain
  {
    id: 2,
    name: 'Dove Gel Douche Nutrition Intense',
    brand: 'Dove',
    category: 'Corps & Bain',
    subCategory: 'Gels douche',
    originalPrice: 3500,
    currentPrice: 2800,
    rating: 4.7,
    reviews: 489,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 20
  },
  // Maquillage
  {
    id: 3,
    name: 'L\'Oréal True Match Fond de Teint',
    brand: 'L\'Oréal',
    category: 'Maquillage',
    subCategory: 'Fond de teint',
    originalPrice: 8500,
    currentPrice: 6800,
    rating: 4.6,
    reviews: 723,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 20
  },
  // Cheveux
  {
    id: 4,
    name: 'Creme of Nature Pure Honey Shampooing',
    brand: 'Creme of Nature',
    category: 'Cheveux',
    subCategory: 'Shampooings',
    originalPrice: 5500,
    currentPrice: 4400,
    rating: 4.8,
    reviews: 612,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 20
  },
  // Parfumerie
  {
    id: 5,
    name: 'Calvin Klein CK One EDT 100ml',
    brand: 'Calvin Klein',
    category: 'Parfumerie',
    subCategory: 'Parfums Mixte',
    originalPrice: 18500,
    currentPrice: 14800,
    rating: 4.7,
    reviews: 892,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 20
  },
  // Bébé & Enfant
  {
    id: 6,
    name: 'Mustela Gel Lavant Doux Bébé 500ml',
    brand: 'Mustela',
    category: 'Bébé & Enfant',
    subCategory: 'Bain & Hygiène',
    originalPrice: 6500,
    currentPrice: 5200,
    rating: 4.9,
    reviews: 567,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 20
  },
  // Korean Skincare
  {
    id: 7,
    name: 'COSRX Advanced Snail 96 Mucin Power Essence',
    brand: 'COSRX',
    category: 'Korean Skincare',
    subCategory: 'Toners & Essences',
    originalPrice: 12000,
    currentPrice: 10800,
    rating: 4.9,
    reviews: 678,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 10
  },
  // Parapharmacie
  {
    id: 8,
    name: 'Arkopharma Multivitamines & Minéraux 60 gélules',
    brand: 'Arkopharma',
    category: 'Parapharmacie',
    subCategory: 'Vitamines & Compléments',
    originalPrice: 8500,
    currentPrice: 7200,
    rating: 4.6,
    reviews: 432,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 15
  }
];

const categories = [
  'Toutes catégories',
  'Soin du visage',
  'Corps & Bain',
  'Maquillage',
  'Cheveux',
  'Parfumerie',
  'Bébé & Enfant',
  'Korean Skincare',
  'Parapharmacie'
];

const brands = Array.from(new Set(allProducts.map(p => p.brand))).sort();

export default function Recherche() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('Toutes catégories');
  const [selectedBrand, setSelectedBrand] = useState('Toutes marques');
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  const filteredProducts = allProducts.filter(product => {
    const searchMatch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    
    const categoryMatch = selectedCategory === 'Toutes catégories' || product.category === selectedCategory;
    const brandMatch = selectedBrand === 'Toutes marques' || product.brand === selectedBrand;
    const priceMatch = product.currentPrice >= priceRange[0] && product.currentPrice <= priceRange[1];
    
    return searchMatch && categoryMatch && brandMatch && priceMatch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.currentPrice - b.currentPrice;
      case 'price-desc':
        return b.currentPrice - a.currentPrice;
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
        return b.reviews - a.reviews;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      brand: product.brand,
      price: product.currentPrice,
      originalPrice: product.originalPrice,
      image: product.image,
    });
    toast.success(`${product.name} ajouté au panier`);
  };

  const handleWishlistToggle = (product: any) => {
    const productForWishlist = {
      id: product.id.toString(),
      name: product.name,
      brand: product.brand,
      price: product.currentPrice,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      rating: product.rating,
      inStock: true
    };

    if (isInWishlist(product.id.toString())) {
      removeFromWishlist(product.id.toString());
      toast.success(`${product.name} retiré des favoris`);
    } else {
      addToWishlist(productForWishlist);
      toast.success(`${product.name} ajouté aux favoris`);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{searchQuery ? `Recherche: ${searchQuery}` : 'Recherche de produits'} | Flawless Beauty</title>
        <meta name="description" content={`Trouvez les meilleurs produits de beauté et cosmétiques. ${searchQuery ? `Résultats pour: ${searchQuery}` : 'Recherche avancée avec filtres.'}`} />
      </Helmet>
      
      <Header />
      
      {/* Search Header */}
      <section className="bg-muted/50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-playfair font-bold text-center mb-6">
              Recherche de produits
            </h1>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Rechercher des produits, marques..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-10 h-12 text-lg"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => handleSearch('')}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {searchQuery && (
              <p className="text-center text-muted-foreground mt-4">
                Résultats pour "<span className="font-medium">{searchQuery}</span>"
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full mb-4"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>

          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
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
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Toutes marques">Toutes marques</SelectItem>
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
                    max={25000}
                    min={0}
                    step={500}
                    className="mt-2"
                  />
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory('Toutes catégories');
                    setSelectedBrand('Toutes marques');
                    setPriceRange([0, 25000]);
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
                    <SelectItem value="relevance">Pertinence</SelectItem>
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

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
                <p className="text-muted-foreground mb-4">
                  Essayez de modifier vos critères de recherche ou explorez nos catégories.
                </p>
                <Button onClick={() => {
                  handleSearch('');
                  setSelectedCategory('Toutes catégories');
                  setSelectedBrand('Toutes marques');
                  setPriceRange([0, 25000]);
                }}>
                  Réinitialiser la recherche
                </Button>
              </div>
            )}

            {/* Products Grid/List */}
            {filteredProducts.length > 0 && (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart} 
                    onWishlistToggle={handleWishlistToggle} 
                    isInWishlist={isInWishlist(product.id.toString())} 
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}