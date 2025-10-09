"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
	Package, 
	Plus, 
	Edit, 
	Trash2, 
	Download, 
	Upload,
	Search,
	Filter,
	Eye,
	MoreHorizontal,
	Star,
	TrendingUp,
	AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { formatCFA } from "@/lib/utils/price-utils";

interface Product {
	id: string;
	name: string;
	description?: string | null;
	priceCents: number;
	oldPriceCents?: number | null;
	imageUrl?: string | null;
	isFeatured: boolean;
	stock: number;
	categoryId: string;
	subcategoryId?: string | null;
	brandId?: string | null;
	rating?: number | null;
	category?: { name: string };
	subcategory?: { name: string };
	brand?: { name: string };
}

interface Taxonomy {
	categories: Array<{ id: string; name: string; slug: string }>;
	subcategories: Array<{ id: string; name: string; slug: string; categoryId: string }>;
	brands: Array<{ id: string; name: string; slug: string }>;
}

interface ProductListProps {
	products: Product[];
	taxonomy: Taxonomy | null;
	loading: boolean;
	onEdit: (product: Product) => void;
	onDelete: (id: string) => void;
	onView: (id: string) => void;
	onExport: () => void;
	onImport: (file: File) => void;
	onFixImages?: () => void;
}

export function ProductList({ 
	products, 
	taxonomy, 
	loading, 
	onEdit, 
	onDelete, 
	onView, 
	onExport, 
	onImport,
	onFixImages
}: ProductListProps) {
	const { toast } = useToast();
	const [searchTerm, setSearchTerm] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('all');
	const [subcategoryFilter, setSubcategoryFilter] = useState('all');
	const [brandFilter, setBrandFilter] = useState('all');
	const [featuredFilter, setFeaturedFilter] = useState('all');
	const [stockFilter, setStockFilter] = useState('all');
	const [sortBy, setSortBy] = useState('name');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	// Filtrer les sous-catégories par catégorie sélectionnée
	const filteredSubcategories = taxonomy?.subcategories.filter(
		sub => sub.categoryId === categoryFilter
	) || [];

	// Filtrer et trier les produits
	const filteredAndSortedProducts = useMemo(() => {
		let filtered = products.filter(product => {
			const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
								(product.description || '').toLowerCase().includes(searchTerm.toLowerCase());
			
			const matchesCategory = categoryFilter === 'all' || product.categoryId === categoryFilter;
			const matchesSubcategory = subcategoryFilter === 'all' || product.subcategoryId === subcategoryFilter;
			const matchesBrand = brandFilter === 'all' || product.brandId === brandFilter;
			const matchesFeatured = featuredFilter === 'all' || 
				(featuredFilter === 'true' && product.isFeatured) ||
				(featuredFilter === 'false' && !product.isFeatured);
			
			let matchesStock = true;
			if (stockFilter === 'low') matchesStock = product.stock <= 5;
			else if (stockFilter === 'out') matchesStock = product.stock === 0;
			else if (stockFilter === 'in') matchesStock = product.stock > 0;

			return matchesSearch && matchesCategory && matchesSubcategory && matchesBrand && matchesFeatured && matchesStock;
		});

		// Trier les produits
		filtered.sort((a, b) => {
			let aValue: any = a[sortBy as keyof Product];
			let bValue: any = b[sortBy as keyof Product];

			// Gestion des valeurs nulles
			if (aValue === null || aValue === undefined) aValue = '';
			if (bValue === null || bValue === undefined) bValue = '';

			// Tri spécial pour les prix
			if (sortBy === 'priceCents') {
				aValue = Number(aValue);
				bValue = Number(bValue);
			}

			// Tri spécial pour le stock
			if (sortBy === 'stock') {
				aValue = Number(aValue);
				bValue = Number(bValue);
			}

			if (sortOrder === 'asc') {
				return aValue > bValue ? 1 : -1;
			} else {
				return aValue < bValue ? 1 : -1;
			}
		});

		return filtered;
	}, [products, searchTerm, categoryFilter, subcategoryFilter, brandFilter, featuredFilter, stockFilter, sortBy, sortOrder]);

	// Gestion de l'import CSV
	const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
				toast({ 
					title: 'Erreur', 
					description: 'Veuillez sélectionner un fichier CSV valide', 
					variant: 'error' 
				});
				return;
			}
			onImport(file);
		}
	};

	// Calculer les statistiques
	const stats = useMemo(() => {
		const total = products.length;
		const featured = products.filter(p => p.isFeatured).length;
		const lowStock = products.filter(p => p.stock <= 5).length;
		const outOfStock = products.filter(p => p.stock === 0).length;
		const totalValue = products.reduce((sum, p) => sum + (p.priceCents * p.stock), 0);

		return { total, featured, lowStock, outOfStock, totalValue };
	}, [products]);

	return (
		<Card>
			<CardHeader>
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
					<div>
						<CardTitle className="flex items-center gap-2">
							<Package className="h-5 w-5" />
							Gestion des Produits
						</CardTitle>
						<p className="text-sm text-muted-foreground mt-1">
							{filteredAndSortedProducts.length} produit(s) affiché(s) sur {stats.total} total
						</p>
					</div>
					
					<div className="flex flex-wrap gap-2">
						<Button onClick={onExport} variant="outline" size="sm">
							<Download className="h-4 w-4 mr-2" />
							Exporter CSV
						</Button>
						
					<label className="inline-flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:bg-muted transition-colors">
						<Upload className="h-4 w-4" />
						<span className="text-sm font-medium">Importer CSV</span>
						<input 
							type="file" 
							accept=".csv" 
							className="hidden" 
							onChange={handleFileImport}
						/>
					</label>
					
					{onFixImages && (
						<Button onClick={onFixImages} variant="outline" size="sm" title="Corriger les images manquantes en base de données">
							<AlertTriangle className="h-4 w-4 mr-2" />
							Corriger Images
						</Button>
					)}
					
					<Button onClick={() => onEdit({} as Product)} size="sm">
						<Plus className="h-4 w-4 mr-2" />
						Ajouter
					</Button>
					</div>
				</div>

				{/* Statistiques rapides */}
				<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
					<div className="text-center p-3 bg-blue-50 rounded-lg">
						<div className="text-2xl font-bold text-blue-600">{stats.total}</div>
						<div className="text-xs text-blue-600">Total</div>
					</div>
					<div className="text-center p-3 bg-green-50 rounded-lg">
						<div className="text-2xl font-bold text-green-600">{stats.featured}</div>
						<div className="text-xs text-green-600">En avant</div>
					</div>
					<div className="text-center p-3 bg-orange-50 rounded-lg">
						<div className="text-2xl font-bold text-orange-600">{stats.lowStock}</div>
						<div className="text-xs text-orange-600">Stock faible</div>
					</div>
					<div className="text-center p-3 bg-red-50 rounded-lg">
						<div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
						<div className="text-xs text-red-600">Rupture</div>
					</div>
					<div className="text-center p-3 bg-purple-50 rounded-lg">
						<div className="text-2xl font-bold text-purple-600">{formatCFA(stats.totalValue)}</div>
						<div className="text-xs text-purple-600">Valeur stock</div>
					</div>
				</div>
			</CardHeader>

			<CardContent>
				{/* Filtres et recherche */}
				<div className="space-y-4 mb-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Rechercher un produit..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>

						<Select value={categoryFilter} onValueChange={setCategoryFilter}>
							<SelectTrigger>
								<SelectValue placeholder="Catégorie" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Toutes les catégories</SelectItem>
								{taxonomy?.categories.map((category) => (
									<SelectItem key={category.id} value={category.id}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select 
							value={subcategoryFilter} 
							onValueChange={setSubcategoryFilter}
							disabled={categoryFilter === 'all'}
						>
							<SelectTrigger>
								<SelectValue placeholder="Sous-catégorie" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Toutes</SelectItem>
								{filteredSubcategories.map((subcategory) => (
									<SelectItem key={subcategory.id} value={subcategory.id}>
										{subcategory.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select value={brandFilter} onValueChange={setBrandFilter}>
							<SelectTrigger>
								<SelectValue placeholder="Marque" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Toutes les marques</SelectItem>
								{taxonomy?.brands.map((brand) => (
									<SelectItem key={brand.id} value={brand.id}>
										{brand.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select value={featuredFilter} onValueChange={setFeaturedFilter}>
							<SelectTrigger>
								<SelectValue placeholder="Mise en avant" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Tous</SelectItem>
								<SelectItem value="true">En avant</SelectItem>
								<SelectItem value="false">Standard</SelectItem>
							</SelectContent>
						</Select>

						<Select value={stockFilter} onValueChange={setStockFilter}>
							<SelectTrigger>
								<SelectValue placeholder="Stock" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Tous</SelectItem>
								<SelectItem value="in">En stock</SelectItem>
								<SelectItem value="low">Stock faible (≤5)</SelectItem>
								<SelectItem value="out">Rupture</SelectItem>
							</SelectContent>
						</Select>

						<Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
							const [field, order] = value.split('-');
							setSortBy(field);
							setSortOrder(order as 'asc' | 'desc');
						}}>
							<SelectTrigger>
								<SelectValue placeholder="Trier par" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="name-asc">Nom A-Z</SelectItem>
								<SelectItem value="name-desc">Nom Z-A</SelectItem>
								<SelectItem value="priceCents-asc">Prix croissant</SelectItem>
								<SelectItem value="priceCents-desc">Prix décroissant</SelectItem>
								<SelectItem value="stock-asc">Stock croissant</SelectItem>
								<SelectItem value="stock-desc">Stock décroissant</SelectItem>
								<SelectItem value="rating-desc">Note décroissante</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Liste des produits */}
				<div className="space-y-3">
					{loading ? (
						<div className="flex items-center justify-center py-16">
							<LoadingSpinner size="lg" />
						</div>
					) : filteredAndSortedProducts.length > 0 ? (
						filteredAndSortedProducts.map((product) => (
							<div 
								key={product.id} 
								className="border rounded-lg p-4 hover:shadow-md transition-shadow"
							>
								<div className="flex items-center gap-4">
									{/* Image du produit */}
									<div className="h-16 w-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
										{product.imageUrl ? (
											<img 
												src={product.imageUrl} 
												alt={product.name} 
												className="h-full w-full object-cover" 
											/>
										) : (
											<div className="h-full w-full flex items-center justify-center">
												<Package className="h-8 w-8 text-muted-foreground" />
											</div>
										)}
									</div>

									{/* Informations du produit */}
									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between">
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2 mb-1">
													<h3 className="font-semibold text-lg truncate">
														{product.name}
													</h3>
													{product.isFeatured && (
														<Badge variant="default" className="text-xs">
															<TrendingUp className="h-3 w-3 mr-1" />
															En avant
														</Badge>
													)}
													{product.rating && (
														<Badge variant="secondary" className="text-xs">
															<Star className="h-3 w-3 mr-1" />
															{product.rating.toFixed(1)}
														</Badge>
													)}
												</div>
												
												{product.description && (
													<p className="text-sm text-muted-foreground line-clamp-2 mb-2">
														{product.description}
													</p>
												)}

												<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
													<span>
														Catégorie: {product.category?.name || 'Non définie'}
													</span>
													{product.subcategory?.name && (
														<span>
															Sous-catégorie: {product.subcategory.name}
														</span>
													)}
													{product.brand?.name && (
														<span>
															Marque: {product.brand.name}
														</span>
													)}
												</div>
											</div>

											{/* Prix et stock */}
											<div className="text-right ml-4">
												<div className="mb-2">
													<div className="text-lg font-bold">
														{formatCFA(product.priceCents)}
													</div>
													{product.oldPriceCents && product.oldPriceCents > product.priceCents && (
														<div className="text-sm text-muted-foreground line-through">
															{formatCFA(product.oldPriceCents)}
														</div>
													)}
												</div>

												<div className="flex items-center justify-center mb-2">
													{product.stock === 0 ? (
														<Badge variant="destructive" className="text-xs">
															<AlertTriangle className="h-3 w-3 mr-1" />
															Rupture
														</Badge>
													) : product.stock <= 5 ? (
														<Badge variant="secondary" className="text-xs">
															Stock faible: {product.stock}
														</Badge>
													) : (
														<Badge variant="default" className="text-xs">
															Stock: {product.stock}
														</Badge>
													)}
												</div>
											</div>
										</div>
									</div>

									{/* Actions */}
									<div className="flex items-center gap-2 ml-4">
										<Button 
											variant="outline" 
											size="sm"
											onClick={() => onView(product.id)}
											title="Voir le produit"
										>
											<Eye className="h-4 w-4" />
										</Button>
										
										<Button 
											variant="outline" 
											size="sm"
											onClick={() => onEdit(product)}
											title="Modifier le produit"
										>
											<Edit className="h-4 w-4" />
										</Button>
										
										<Button 
											variant="destructive" 
											size="sm"
											onClick={() => onDelete(product.id)}
											title="Supprimer le produit"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="text-center py-16">
							<Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
							<h3 className="text-lg font-medium text-muted-foreground mb-2">
								Aucun produit trouvé
							</h3>
							<p className="text-sm text-muted-foreground">
								{searchTerm || categoryFilter !== 'all' || brandFilter !== 'all' 
									? 'Aucun produit ne correspond aux filtres sélectionnés'
									: 'Commencez par ajouter votre premier produit'
								}
							</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
