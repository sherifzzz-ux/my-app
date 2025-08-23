import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Star, Award, Globe, TrendingUp, Filter } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface Brand {
  id: number;
  name: string;
  logo: string;
  category: string;
  description: string;
  products: number;
  rating: number;
  origin: string;
  founded: number;
  specialties: string[];
  bestseller: string;
  isPopular?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  isOrganic?: boolean;
}

const Marques = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const brandCategories = [
    { id: 'all', name: 'Toutes les marques', count: 127 },
    { id: 'skincare', name: 'Soin du visage', count: 45 },
    { id: 'bodycare', name: 'Soin du corps', count: 32 },
    { id: 'haircare', name: 'Cheveux', count: 28 },
    { id: 'makeup', name: 'Maquillage', count: 38 },
    { id: 'perfume', name: 'Parfumerie', count: 22 },
    { id: 'korean', name: 'K-Beauty', count: 18 },
    { id: 'organic', name: 'Bio & Naturel', count: 25 }
  ];

  const featuredBrands: Brand[] = [
    {
      id: 1,
      name: "CeraVe",
      logo: "/api/placeholder/120/60",
      category: "skincare",
      description: "Marque dermatologique développée avec des dermatologues",
      products: 45,
      rating: 4.8,
      origin: "USA",
      founded: 2005,
      specialties: ["Céramides", "Acide hyaluronique", "Peaux sensibles"],
      bestseller: "Crème lavante hydratante",
      isPopular: true,
      isFeatured: true
    },
    {
      id: 2,
      name: "The Ordinary",
      logo: "/api/placeholder/120/60",
      category: "skincare",
      description: "Soins visage aux actifs purs à prix accessible",
      products: 38,
      rating: 4.6,
      origin: "Canada",
      founded: 2013,
      specialties: ["Actifs purs", "Prix abordables", "Minimalisme"],
      bestseller: "Sérum Niacinamide 10%",
      isPopular: true,
      isTrending: true
    },
    {
      id: 3,
      name: "Fenty Beauty",
      logo: "/api/placeholder/120/60",
      category: "makeup",
      description: "Maquillage inclusif par Rihanna",
      products: 67,
      rating: 4.7,
      origin: "USA",
      founded: 2017,
      specialties: ["Inclusivité", "50 teintes de fond de teint", "Innovation"],
      bestseller: "Fenty Beauty Foundation",
      isNew: true,
      isFeatured: true
    },
    {
      id: 4,
      name: "Beauty of Joseon",
      logo: "/api/placeholder/120/60",
      category: "korean",
      description: "K-Beauty traditionnel coréen moderne",
      products: 24,
      rating: 4.9,
      origin: "Corée du Sud",
      founded: 2014,
      specialties: ["Ginseng", "Riz", "Traditions coréennes"],
      bestseller: "Dynasty Cream",
      isPopular: true,
      isOrganic: true
    },
    {
      id: 5,
      name: "Weleda",
      logo: "/api/placeholder/120/60",
      category: "organic",
      description: "Cosmétiques naturels et anthroposophiques",
      products: 156,
      rating: 4.5,
      origin: "Suisse",
      founded: 1921,
      specialties: ["Biodynamie", "Plantes médicinales", "Développement durable"],
      bestseller: "Huile de Massage à l'Arnica",
      isOrganic: true,
      isFeatured: true
    },
    {
      id: 6,
      name: "COSRX",
      logo: "/api/placeholder/120/60",
      category: "korean",
      description: "Solutions ciblées pour problèmes de peau",
      products: 32,
      rating: 4.7,
      origin: "Corée du Sud",
      founded: 2013,
      specialties: ["Acné", "BHA/AHA", "Minimalisme efficace"],
      bestseller: "BHA Blackhead Power Liquid",
      isTrending: true,
      isPopular: true
    }
  ];

  const allBrands: Brand[] = [
    ...featuredBrands,
    {
      id: 7,
      name: "L'Oréal Paris",
      logo: "/api/placeholder/120/60",
      category: "makeup",
      description: "Beauté accessible et innovation française",
      products: 234,
      rating: 4.3,
      origin: "France",
      founded: 1909,
      specialties: ["Innovation", "Anti-âge", "Couleur"],
      bestseller: "Revitalift Sérum"
    },
    {
      id: 8,
      name: "Neutrogena",
      logo: "/api/placeholder/120/60",
      category: "skincare",
      description: "Dermatologie et recherche scientifique",
      products: 89,
      rating: 4.4,
      origin: "USA",
      founded: 1930,
      specialties: ["Dermatologie", "Protection solaire", "Nettoyage"],
      bestseller: "Gel Nettoyant Ultra Doux"
    }
  ];

  const filteredBrands = allBrands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Toutes nos Marques - Cosmétiques & Beauté | Flawless Beauty</title>
        <meta name="description" content="Découvrez toutes nos marques de cosmétiques : CeraVe, The Ordinary, Fenty Beauty, K-Beauty et plus. Les meilleures marques beauté sélectionnées pour vous." />
        <meta name="keywords" content="marques beauté, cosmétiques, CeraVe, The Ordinary, Fenty Beauty, K-Beauty, marques coréennes, bio naturel" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Nos Marques Partenaires
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Découvrez notre sélection rigoureuse de {allBrands.length}+ marques beauté. 
              Des leaders mondiaux aux pépites K-Beauty, nous choisissons le meilleur pour vous.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto mb-8">
              <Input
                placeholder="Rechercher une marque..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </section>

        {/* Categories */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
          <TabsList className="grid grid-cols-3 lg:grid-cols-8 w-full mb-8">
            {brandCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-xs lg:text-sm"
              >
                <span className="hidden lg:inline">{category.name}</span>
                <span className="lg:hidden">{category.name.split(' ')[0]}</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Featured Brands Section */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Award className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold">Marques Vedettes</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredBrands.slice(0, 6).map((brand) => (
                <Card key={brand.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm relative">
                  {brand.isNew && (
                    <Badge className="absolute top-3 right-3 bg-green-500 z-10">
                      Nouveau
                    </Badge>
                  )}
                  {brand.isTrending && !brand.isNew && (
                    <Badge className="absolute top-3 right-3 bg-red-500 z-10">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Tendance
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="w-full h-20 flex items-center justify-center mb-4 bg-muted/30 rounded-lg p-4">
                      <img
                        src={brand.logo}
                        alt={`Logo ${brand.name}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <CardTitle className="text-xl">{brand.name}</CardTitle>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      <span>{brand.origin}</span>
                      <span>•</span>
                      <span>Depuis {brand.founded}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <CardDescription className="text-center mb-4 line-clamp-2">
                      {brand.description}
                    </CardDescription>
                    
                    <div className="flex items-center justify-center gap-1 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(brand.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{brand.rating}</span>
                      <span className="text-sm text-muted-foreground">({brand.products} produits)</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Spécialités :</p>
                        <div className="flex flex-wrap gap-1">
                          {brand.specialties.slice(0, 3).map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Best-seller :</p>
                        <p className="text-sm font-medium">{brand.bestseller}</p>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4 group-hover:bg-primary/90 transition-colors">
                      Voir les produits
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* All Brands Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Toutes les marques
                <span className="text-lg font-normal text-muted-foreground ml-2">
                  ({filteredBrands.length} résultats)
                </span>
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredBrands.map((brand) => (
                <Card key={brand.id} className="group hover:shadow-md transition-all duration-300 border-0 shadow-sm cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="w-full h-16 flex items-center justify-center mb-3 bg-muted/30 rounded-md p-2">
                      <img
                        src={brand.logo}
                        alt={`Logo ${brand.name}`}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">{brand.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{brand.description}</p>
                    <div className="flex items-center justify-center gap-1 text-xs">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span>{brand.rating}</span>
                      <span className="text-muted-foreground">({brand.products})</span>
                    </div>
                    {(brand.isPopular || brand.isTrending || brand.isNew || brand.isOrganic) && (
                      <div className="flex flex-wrap gap-1 mt-2 justify-center">
                        {brand.isPopular && (
                          <Badge variant="secondary" className="text-xs">
                            Populaire
                          </Badge>
                        )}
                        {brand.isTrending && (
                          <Badge variant="destructive" className="text-xs">
                            Tendance
                          </Badge>
                        )}
                        {brand.isNew && (
                          <Badge className="bg-green-500 text-xs">
                            Nouveau
                          </Badge>
                        )}
                        {brand.isOrganic && (
                          <Badge className="bg-green-600 text-xs">
                            Bio
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </Tabs>

        {/* Brand Partnership CTA */}
        <section className="mt-16 bg-gradient-to-r from-primary/10 to-purple-100 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Vous êtes une marque ?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Rejoignez notre sélection de marques partenaires et bénéficiez de notre expertise 
            en distribution beauté au Sénégal et en Afrique de l'Ouest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Devenir partenaire
            </Button>
            <Button variant="outline" size="lg">
              En savoir plus
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Marques;