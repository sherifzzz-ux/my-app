"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Save,
  Package,
  Star,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface Product {
  id: string;
  name: string;
  description?: string;
  priceCents: number;
  oldPriceCents?: number;
  imageUrl?: string;
  isFeatured: boolean;
  stock: number;
  rating: number;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  subcategory?: {
    id: string;
    name: string;
    slug: string;
  };
  brand?: {
    id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

interface Brand {
  id: string;
  name: string;
  slug: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priceCents: 0,
    oldPriceCents: 0,
    imageUrl: "",
    isFeatured: false,
    stock: 0,
    rating: 0,
    categoryId: "",
    subcategoryId: "",
    brandId: ""
  });
  const { toast } = useToast();


  // Charger les données
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Charger depuis l'API Supabase
      const [productsRes, taxonomyRes] = await Promise.all([
        fetch('/api/admin/products-supabase', { credentials: 'include' }),
        fetch('/api/admin/taxonomy-supabase', { credentials: 'include' })
      ]);

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData);
        console.log('Produits chargés:', productsData.length);
      } else {
        console.error('Erreur lors du chargement des produits:', productsRes.status);
        setProducts([]);
      }

      if (taxonomyRes.ok) {
        const taxonomyData = await taxonomyRes.json();
        console.log('Données de taxonomie chargées:', taxonomyData);
        
        setCategories(taxonomyData.categories || []);
        setBrands(taxonomyData.brands || []);
      } else {
        console.error('Erreur lors du chargement de la taxonomie:', taxonomyRes.status);
        setCategories([]);
        setBrands([]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      setProducts([]);
      setCategories([]);
      setBrands([]);
      
      toast({ 
        title: 'Erreur', 
        description: 'Impossible de charger les données depuis la base de données.', 
        variant: 'error'
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category.id === selectedCategory;
    const matchesSubcategory = selectedSubcategory === "all" || product.subcategory?.id === selectedSubcategory;
    const matchesBrand = selectedBrand === "all" || product.brand?.id === selectedBrand;
    const matchesFeatured = featuredFilter === "all" || 
                           (featuredFilter === "true" && product.isFeatured) ||
                           (featuredFilter === "false" && !product.isFeatured);
    const matchesStock = stockFilter === "all" ||
                        (stockFilter === "low" && product.stock <= 5) ||
                        (stockFilter === "out" && product.stock === 0) ||
                        (stockFilter === "in" && product.stock > 0);

    return matchesSearch && matchesCategory && matchesSubcategory && matchesBrand && matchesFeatured && matchesStock;
  });

  // Gérer les changements de formulaire
  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Si on change la catégorie, réinitialiser la sous-catégorie
      if (field === 'categoryId') {
        newData.subcategoryId = '';
      }
      
      return newData;
    });
  };

  // Sauvegarder un produit
  const saveProduct = async () => {
    if (!formData.name.trim() || !formData.categoryId) {
      toast({ 
        title: 'Erreur', 
        description: 'Le nom et la catégorie sont requis', 
        variant: 'error'
      });
      return;
    }

    try {
      const res = await fetch(
        editingProduct ? `/api/admin/products-supabase/${editingProduct.id}` : '/api/admin/products-supabase',
        {
          method: editingProduct ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            ...formData,
            id: editingProduct?.id
          }),
        }
      );

      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');

      toast({ 
        title: 'Succès', 
        description: editingProduct ? 'Produit mis à jour' : 'Produit créé' 
      });

      setEditingProduct(null);
      setShowForm(false);
      setFormData({
        name: "",
        description: "",
        priceCents: 0,
        oldPriceCents: 0,
        imageUrl: "",
        isFeatured: false,
        stock: 0,
        rating: 0,
        categoryId: "",
        subcategoryId: "",
        brandId: ""
      });
      await loadData();
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      toast({ 
        title: 'Erreur', 
        description: 'Impossible de sauvegarder le produit', 
        variant: 'error'
      });
    }
  };

  // Supprimer un produit
  const deleteProduct = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/products-supabase?id=${id}`, { 
        method: 'DELETE', 
        credentials: 'include' 
      });

      if (res.ok) {
        toast({ title: 'Succès', description: 'Produit supprimé' });
        await loadData();
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      toast({ 
        title: 'Erreur', 
        description: 'Impossible de supprimer le produit', 
        variant: 'error'
      });
    }
  };

  // Éditer un produit
  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      priceCents: product.priceCents,
      oldPriceCents: product.oldPriceCents || 0,
      imageUrl: product.imageUrl || "",
      isFeatured: product.isFeatured,
      stock: product.stock,
      rating: product.rating,
      categoryId: product.category.id,
      subcategoryId: product.subcategory?.id || "",
      brandId: product.brand?.id || ""
    });
    setShowForm(true);
  };

  // Annuler l'édition
  const cancelEdit = () => {
    setEditingProduct(null);
    setShowForm(false);
    setFormData({
      name: "",
      description: "",
      priceCents: 0,
      oldPriceCents: 0,
      imageUrl: "",
      isFeatured: false,
      stock: 0,
      rating: 0,
      categoryId: "",
      subcategoryId: "",
      brandId: ""
    });
  };

  // Obtenir les sous-catégories de la catégorie sélectionnée
  const getSubcategories = () => {
    const category = categories.find(cat => cat.id === formData.categoryId);
    return category?.subcategories || [];
  };

  // Formater le prix
  const formatPrice = (priceCents: number) => {
    return (priceCents / 100).toFixed(2) + '€';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Produits</h1>
          <p className="text-muted-foreground">Gérez vos produits et leur affichage</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouveau Produit
        </Button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du produit *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Nom du produit"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryId">Catégorie *</Label>
                <Select value={formData.categoryId} onValueChange={(value) => handleInputChange('categoryId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subcategoryId">Sous-catégorie</Label>
                <Select 
                  value={formData.subcategoryId} 
                  onValueChange={(value) => handleInputChange('subcategoryId', value)}
                  disabled={!formData.categoryId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une sous-catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Aucune sous-catégorie</SelectItem>
                    {getSubcategories().map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brandId">Marque</Label>
                <Select value={formData.brandId} onValueChange={(value) => handleInputChange('brandId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une marque" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Aucune marque</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Description du produit"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priceCents">Prix (en centimes) *</Label>
                <Input
                  id="priceCents"
                  type="number"
                  value={formData.priceCents}
                  onChange={(e) => handleInputChange('priceCents', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="oldPriceCents">Ancien prix (en centimes)</Label>
                <Input
                  id="oldPriceCents"
                  type="number"
                  value={formData.oldPriceCents}
                  onChange={(e) => handleInputChange('oldPriceCents', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL de l'image</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Note (0-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
              />
              <Label htmlFor="isFeatured">Produit mis en avant</Label>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={cancelEdit}>
                Annuler
              </Button>
              <Button onClick={saveProduct} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {editingProduct ? 'Mettre à jour' : 'Créer'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <Label>Recherche</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Sous-catégorie</Label>
              <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les sous-catégories</SelectItem>
                  {categories
                    .find(cat => cat.id === selectedCategory)
                    ?.subcategories.map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Marque</Label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les marques</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Mis en avant</Label>
              <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="true">Mis en avant</SelectItem>
                  <SelectItem value="false">Non mis en avant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Stock</Label>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="low">Stock faible (≤5)</SelectItem>
                  <SelectItem value="out">Rupture de stock</SelectItem>
                  <SelectItem value="in">En stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des produits */}
      <Card>
        <CardHeader>
          <CardTitle>Produits ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm || selectedCategory !== "all" ? 'Aucun produit trouvé' : 'Aucun produit créé'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.category.name}</p>
                      {product.subcategory && (
                        <p className="text-xs text-muted-foreground mb-2">{product.subcategory.name}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => editProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {product.imageUrl && (
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{formatPrice(product.priceCents)}</span>
                      {product.oldPriceCents && product.oldPriceCents > product.priceCents && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.oldPriceCents)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={product.stock > 5 ? "default" : product.stock > 0 ? "secondary" : "destructive"}>
                        Stock: {product.stock}
                      </Badge>
                      {product.isFeatured && (
                        <Badge variant="outline" className="text-yellow-600">
                          <Star className="h-3 w-3 mr-1" />
                          Mis en avant
                        </Badge>
                      )}
                      {product.rating > 0 && (
                        <Badge variant="outline">
                          <Star className="h-3 w-3 mr-1" />
                          {product.rating}
                        </Badge>
                      )}
                    </div>

                    {product.brand && (
                      <p className="text-xs text-muted-foreground">Marque: {product.brand.name}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
