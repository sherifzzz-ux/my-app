import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Star, ShoppingCart, Baby, Shield, Leaf, Award } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const GrossessePostPartum = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const categories = [
    { id: 'all', name: 'Tous les produits', count: 45 },
    { id: 'grossesse', name: 'Grossesse', count: 18 },
    { id: 'post-partum', name: 'Post-partum', count: 15 },
    { id: 'allaitement', name: 'Allaitement', count: 8 },
    { id: 'bebe', name: 'Bébé 0-3 ans', count: 12 }
  ];

  const products = [
    {
      id: 1,
      name: "Crème Anti-Vergetures Bio",
      brand: "Mama&Co",
      price: 24.99,
      originalPrice: 29.99,
      discount: 17,
      rating: 4.8,
      reviews: 156,
      image: "/api/placeholder/300/300",
      category: "grossesse",
      badges: ["Bio", "Sans Paraben"],
      description: "Prévient et réduit l'apparition des vergetures"
    },
    {
      id: 2,
      name: "Huile de Massage Relaxante",
      brand: "BellyLove",
      price: 19.99,
      rating: 4.7,
      reviews: 89,
      image: "/api/placeholder/300/300",
      category: "grossesse",
      badges: ["Naturel", "Aromathérapie"],
      description: "Soulage les tensions et hydrate en profondeur"
    },
    {
      id: 3,
      name: "Baume Crevasses Allaitement",
      brand: "Lansinoh",
      price: 14.99,
      rating: 4.9,
      reviews: 203,
      image: "/api/placeholder/300/300",
      category: "allaitement",
      badges: ["Hypoallergénique", "Sans rinçage"],
      description: "Traite et prévient les crevasses du mamelon"
    },
    {
      id: 4,
      name: "Gel Jambes Lourdes",
      brand: "MaterniCare",
      price: 16.99,
      rating: 4.6,
      reviews: 127,
      image: "/api/placeholder/300/300",
      category: "grossesse",
      badges: ["Effet Froid", "Veinotonique"],
      description: "Soulage les jambes lourdes et gonflées"
    },
    {
      id: 5,
      name: "Crème Cicatrisante Césarienne",
      brand: "PostBirth",
      price: 22.99,
      rating: 4.7,
      reviews: 94,
      image: "/api/placeholder/300/300",
      category: "post-partum",
      badges: ["Cicatrisant", "Médical"],
      description: "Favorise la cicatrisation post-césarienne"
    },
    {
      id: 6,
      name: "Shampooing Doux Bébé",
      brand: "Mustela",
      price: 12.99,
      rating: 4.8,
      reviews: 245,
      image: "/api/placeholder/300/300",
      category: "bebe",
      badges: ["0% Savon", "Testé sous contrôle pédiatrique"],
      description: "Nettoie en douceur cheveux et corps de bébé"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Sécurité Garantie",
      description: "Produits testés et approuvés par des professionnels de santé"
    },
    {
      icon: Leaf,
      title: "Formules Naturelles",
      description: "Ingrédients naturels et bio, sans substances nocives"
    },
    {
      icon: Baby,
      title: "Spécialement Conçus",
      description: "Adaptés aux besoins spécifiques de la grossesse et maternité"
    },
    {
      icon: Award,
      title: "Marques Reconnues",
      description: "Sélection des meilleures marques spécialisées"
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Grossesse & Post-Partum - Soins Maternité | Flawless Beauty</title>
        <meta name="description" content="Découvrez notre gamme complète de produits pour la grossesse, post-partum et bébé. Soins naturels et sécurisés pour accompagner votre maternité." />
        <meta name="keywords" content="grossesse, post-partum, maternité, bébé, soins naturels, vergetures, allaitement, produits bio" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 mb-12 overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Baby className="h-8 w-8 text-pink-500" />
              <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                Maternité & Bébé
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Grossesse & Post-Partum
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Accompagnez votre maternité avec notre sélection de produits naturels et sécurisés. 
              Du début de grossesse aux premiers mois de bébé, nous prenons soin de vous.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
                Découvrir la collection
              </Button>
              <Button variant="outline" size="lg">
                Guide maternité
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-l from-pink-200/30 to-transparent rounded-full blur-3xl"></div>
        </section>

        {/* Benefits Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Pourquoi nous faire confiance ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-pink-500" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Catégories</CardTitle>
                </CardHeader>
                <CardContent>
                  <TabsList className="flex flex-col h-auto w-full bg-transparent">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="w-full justify-between data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <span>{category.name}</span>
                        <Badge variant="secondary" className="ml-2">
                          {category.count}
                        </Badge>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </CardContent>
              </Card>
            </div>

            <div className="lg:w-3/4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularité</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="rating">Meilleures notes</SelectItem>
                    <SelectItem value="newest">Nouveautés</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.discount && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                          -{product.discount}%
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button className="bg-pink-500 hover:bg-pink-600">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Ajouter
                        </Button>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {product.badges.map((badge, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
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
                          <span className="font-bold text-primary text-lg">
                            {product.price.toFixed(2)} €
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice.toFixed(2)} €
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Tabs>

        {/* Information Section */}
        <section className="mt-16 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Conseils & Guide Maternité</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Découvrez nos guides complets pour bien vivre votre grossesse et votre post-partum. 
              Des conseils d'experts pour choisir les bons produits selon votre trimestre.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤱</span>
                  </div>
                  <h3 className="font-semibold mb-2">1er Trimestre</h3>
                  <p className="text-sm text-muted-foreground">
                    Produits doux et naturels pour débuter votre grossesse
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤰</span>
                  </div>
                  <h3 className="font-semibold mb-2">2e & 3e Trimestre</h3>
                  <p className="text-sm text-muted-foreground">
                    Soins anti-vergetures et confort pour votre corps qui change
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👶</span>
                  </div>
                  <h3 className="font-semibold mb-2">Post-Partum</h3>
                  <p className="text-sm text-muted-foreground">
                    Récupération et soins pour vous et votre bébé
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GrossessePostPartum;