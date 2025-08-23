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
import { Heart, Star, Grid, List, ShoppingCart, Filter, Sparkles, Droplets, Shield, Sun } from 'lucide-react';
import { WishlistButton } from "@/components/WishlistButton";
import { StarRating } from "@/components/StarRating";

const categories = [
  'Tous les produits',
  'Nettoyants & Démaquillants', 
  'Hydratants & Sérums',
  'Anti-âge & Fermeté',
  'Protection solaire',
  'Soins ciblés',
  'Masques & Gommages'
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
    name: 'CeraVe Lotion Hydratante Visage SPF 30',
    brand: 'CeraVe',
    category: 'Protection solaire',
    originalPrice: 18500,
    currentPrice: 14800,
    rating: 4.8,
    reviews: 245,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 20,
    inStock: true,
    description: 'Lotion hydratante quotidienne avec protection solaire'
  },
  {
    id: '2',
    name: 'The Ordinary Hyaluronic Acid 2% + B5',
    brand: 'The Ordinary',
    category: 'Hydratants & Sérums',
    originalPrice: 12000,
    currentPrice: 12000,
    rating: 4.9,
    reviews: 892,
    image: '/placeholder.svg',
    isPromo: false,
    inStock: true,
    description: 'Sérum hydratant à l\'acide hyaluronique'
  },
  {
    id: '3',
    name: 'Neutrogena Gel Nettoyant Hydra Boost',
    brand: 'Neutrogena',
    category: 'Nettoyants & Démaquillants',
    originalPrice: 8500,
    currentPrice: 6800,
    rating: 4.6,
    reviews: 567,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 20,
    inStock: true,
    description: 'Gel nettoyant hydratant à l\'acide hyaluronique'
  },
  {
    id: '4',
    name: 'Mixa Anti-Imperfection Zinc',
    brand: 'Mixa',
    category: 'Soins ciblés',
    originalPrice: 7500,
    currentPrice: 7500,
    rating: 4.4,
    reviews: 324,
    image: '/placeholder.svg',
    isPromo: false,
    inStock: false,
    description: 'Soin anti-imperfections au zinc'
  },
  {
    id: '5',
    name: 'Avène Crème Solaire Fluide Minéral SPF 50+',
    brand: 'Avène',
    category: 'Protection solaire',
    originalPrice: 22000,
    currentPrice: 19800,
    rating: 4.7,
    reviews: 431,
    image: '/placeholder.svg',
    isPromo: true,
    discountPercentage: 10,
    inStock: true,
    description: 'Crème solaire très haute protection'
  },
  {
    id: '6',
    name: 'La Roche-Posay Toleriane Caring Wash',
    brand: 'La Roche-Posay',
    category: 'Nettoyants & Démaquillants',
    originalPrice: 16500,
    currentPrice: 16500,
    rating: 4.8,
    reviews: 698,
    image: '/placeholder.svg',
    isPromo: false,
    inStock: true,
    description: 'Gel nettoyant doux pour peaux sensibles'
  }
];

export default function SoinDuVisage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous les produits');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 25000]);
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
      icon: <Droplets className="h-8 w-8 text-blue-500" />,
      title: "Hydratation",
      description: "Formules ultra-hydratantes"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Protection",
      description: "Barrière contre les agressions"
    },
    {
      icon: <Sun className="h-8 w-8 text-orange-500" />,
      title: "Anti-UV",
      description: "Protection solaire avancée"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-purple-500" />,
      title: "Éclat",
      description: "Révélateur de beauté naturelle"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Soin du Visage Premium | Flawless Beauty</title>
        <meta name="description" content="Découvrez notre sélection de soins du visage premium. CeraVe, The Ordinary, Neutrogena et plus. Livraison 24h au Sénégal." />
        <meta name="keywords" content="soin visage, cosmétique, CeraVe, The Ordinary, crème hydratante, sérum, Sénégal" />
        <link rel="canonical" href="https://flawlessbeauty.sn/soin-du-visage" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <Header />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-rose-100 via-pink-50 to-purple-100 py-16">
          <div className="absolute inset-0 bg-white/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <CustomBreadcrumb className="mb-6" />
            
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mb-4">
                Soin du <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600">Visage</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 font-inter">
                Révélez votre beauté naturelle avec nos soins visage premium. 
                Des formules expertes pour chaque type de peau.
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
                      max={25000}
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
                      setPriceRange([0, 25000]);
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
                  {sortedProducts.map((product, index) => {
                    const wishlistProduct = {
                      id: product.id,
                      name: product.name,
                      price: product.currentPrice,
                      originalPrice: product.originalPrice,
                      image: product.image,
                      brand: product.brand,
                      rating: product.rating,
                      inStock: product.inStock
                    };

                    return (
                      <Card 
                        key={product.id} 
                        className="group bg-white hover:shadow-xl transition-all duration-300 animate-fade-in border-0 shadow-soft hover:shadow-strong overflow-hidden"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CardContent className="p-0">
                          <div className="relative overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            
                            {/* Badges */}
                            <div className="absolute top-4 left-4 space-y-2">
                              {product.isPromo && (
                                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md">
                                  -{product.discountPercentage}%
                                </Badge>
                              )}
                              {!product.inStock && (
                                <Badge variant="destructive" className="shadow-md">
                                  Rupture
                                </Badge>
                              )}
                            </div>

                            {/* Wishlist Button */}
                            <div className="absolute top-4 right-4">
                              <WishlistButton product={wishlistProduct} size="sm" />
                            </div>

                            {/* Quick Actions Overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <Button 
                                className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg transform scale-95 group-hover:scale-100 transition-transform duration-300"
                                disabled={!product.inStock}
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                {product.inStock ? 'Ajouter' : 'Indisponible'}
                              </Button>
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="text-sm text-primary font-medium mb-2">
                              {product.brand}
                            </div>
                            
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>

                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <StarRating rating={product.rating} size="sm" showNumber={false} />
                              <span className="text-sm text-gray-600">
                                ({product.reviews} avis)
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-gray-900">
                                  {formatPrice(product.currentPrice)}
                                </span>
                                {product.originalPrice > product.currentPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(product.originalPrice)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
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