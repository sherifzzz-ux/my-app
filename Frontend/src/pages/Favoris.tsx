import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Star, Grid, List, ShoppingCart, Trash2, HeartOff, Filter, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { toast } from "sonner";

export default function Favoris() {
  const { items, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addItem } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  const moveToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
    });
    removeFromWishlist(item.id);
    toast.success(`${item.name} ajouté au panier et retiré des favoris`);
  };

  const handleRemoveFromWishlist = (id: string, name: string) => {
    removeFromWishlist(id);
    toast.success(`${name} retiré des favoris`);
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast.success('Liste de favoris vidée');
  };

  const filteredItems = items.filter(item => {
    if (filterBy === 'in-stock') return item.inStock;
    if (filterBy === 'out-of-stock') return !item.inStock;
    if (filterBy === 'on-sale') return item.originalPrice && item.originalPrice > item.price;
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'brand':
        return a.brand.localeCompare(b.brand);
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
      default:
        return 0; // Keep original order
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate statistics
  const inStockCount = items.filter(item => item.inStock).length;
  const onSaleCount = items.filter(item => item.originalPrice && item.originalPrice > item.price).length;
  const averageRating = items.length > 0 ? items.reduce((sum, item) => sum + item.rating, 0) / items.length : 0;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Mes Favoris - Liste vide | Flawless Beauty</title>
          <meta name="description" content="Votre liste de favoris est vide. Découvrez nos produits de beauté et ajoutez vos articles préférés." />
        </Helmet>
        
        <Header />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <HeartOff className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-playfair font-bold mb-4">Votre liste de favoris est vide</h1>
            <p className="text-muted-foreground mb-8">
              Parcourez nos produits et ajoutez vos articles préférés à votre liste de favoris en cliquant sur le cœur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg">
                  Découvrir nos produits
                </Button>
              </Link>
              <Link to="/recherche">
                <Button variant="outline" size="lg">
                  Rechercher des produits
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mes Favoris ({wishlistCount}) | Flawless Beauty</title>
        <meta name="description" content={`Retrouvez vos ${wishlistCount} produits favoris. Gérez votre liste de souhaits et ajoutez facilement vos articles au panier.`} />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-12 h-12 text-primary fill-current" />
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground">
              Mes Favoris
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Retrouvez tous vos produits préférés dans votre liste de favoris personnalisée
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary mb-1">{wishlistCount}</div>
              <div className="text-sm text-muted-foreground">Articles total</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success mb-1">{inStockCount}</div>
              <div className="text-sm text-muted-foreground">En stock</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-urgent mb-1">{onSaleCount}</div>
              <div className="text-sm text-muted-foreground">En promotion</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gold mb-1">
                {averageRating.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Note moyenne</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-muted/50 rounded-lg">
          <Button
            onClick={() => {
              items.filter(item => item.inStock).forEach(item => moveToCart(item));
            }}
            disabled={inStockCount === 0}
            className="flex-1 min-w-[200px]"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Tout ajouter au panier ({inStockCount})
          </Button>
          
          <Button
            variant="outline"
            onClick={handleClearWishlist}
            className="flex-1 min-w-[150px] text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Vider la liste
          </Button>
        </div>

        {/* Filters & Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les articles</SelectItem>
                  <SelectItem value="in-stock">En stock</SelectItem>
                  <SelectItem value="out-of-stock">Rupture de stock</SelectItem>
                  <SelectItem value="on-sale">En promotion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Ajoutés récemment</SelectItem>
                  <SelectItem value="name">Nom A-Z</SelectItem>
                  <SelectItem value="brand">Marque A-Z</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="rating">Meilleures notes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">{sortedItems.length}</span> article{sortedItems.length > 1 ? 's' : ''} affiché{sortedItems.length > 1 ? 's' : ''}
            </p>
            
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
        {sortedItems.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
          }>
            {sortedItems.map(item => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {item.originalPrice && item.originalPrice > item.price && (
                        <Badge className="bg-urgent text-urgent-foreground">
                          -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                        </Badge>
                      )}
                      {!item.inStock && (
                        <Badge variant="destructive">
                          Rupture
                        </Badge>
                      )}
                    </div>

                    {/* Remove Button */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-destructive hover:text-destructive"
                      onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </Button>
                  </div>

                  <div className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">
                      {item.brand}
                    </div>
                    
                    <h3 className="font-semibold mb-2 line-clamp-2 min-h-[2.5rem]">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.rating}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        disabled={!item.inStock}
                        onClick={() => moveToCart(item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        {item.inStock ? 'Ajouter au panier' : 'Indisponible'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aucun article ne correspond aux filtres</h3>
            <p className="text-muted-foreground mb-4">
              Essayez de modifier vos critères de filtrage pour voir plus de produits.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setFilterBy('all');
                setSortBy('recent');
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}