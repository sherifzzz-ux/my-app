"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
	AlertTriangle, 
	Package, 
	Search, 
	X,
	Edit,
	TrendingDown,
	AlertCircle,
	CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { formatCFA } from "@/lib/utils/price-utils";

interface Product {
	id: string;
	name: string;
	priceCents: number;
	stock: number;
	imageUrl?: string;
	category?: { name: string };
	brand?: { name: string };
	createdAt: string;
}

export function StockFaiblePage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState<'all' | 'low' | 'out'>('all');
	const { toast } = useToast();

	// Charger les produits
	const loadProducts = async () => {
		setLoading(true);
		try {
			const res = await fetch('/api/admin/products', { credentials: 'include' });
			if (res.ok) {
				const data = await res.json();
				setProducts(data || []);
			} else {
				throw new Error('Erreur lors du chargement des produits');
			}
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: 'Impossible de charger les produits', 
				variant: 'error' 
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadProducts();
	}, []);

	// Filtrer les produits
	const filteredProducts = products.filter(product => {
		const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.brand?.name?.toLowerCase().includes(searchTerm.toLowerCase());
		
		if (!matchesSearch) return false;
		
		switch (filterType) {
			case 'low':
				return product.stock > 0 && product.stock <= 10;
			case 'out':
				return product.stock === 0;
			default:
				return product.stock <= 10;
		}
	});

	// Statistiques
	const stats = {
		totalProducts: products.length,
		lowStock: products.filter(p => p.stock > 0 && p.stock <= 10).length,
		outOfStock: products.filter(p => p.stock === 0).length,
		critical: products.filter(p => p.stock > 0 && p.stock <= 5).length
	};

	// Obtenir la couleur du badge selon le niveau de stock
	const getStockBadgeColor = (stock: number) => {
		if (stock === 0) return "bg-red-100 text-red-800 border-red-200";
		if (stock <= 5) return "bg-orange-100 text-orange-800 border-orange-200";
		return "bg-yellow-100 text-yellow-800 border-yellow-200";
	};

	// Obtenir le texte du badge
	const getStockBadgeText = (stock: number) => {
		if (stock === 0) return "Rupture";
		if (stock <= 5) return "Critique";
		return "Faible";
	};

	// Aller à la page de modification du produit
	const editProduct = (productId: string) => {
		window.location.href = `/admin/products?edit=${productId}`;
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
					<h2 className="text-2xl font-bold">Gestion du Stock</h2>
					<p className="text-muted-foreground">Surveillez et gérez les niveaux de stock de vos produits</p>
				</div>
				<Button onClick={() => window.location.href = '/admin/products'} className="flex items-center gap-2">
					<Package className="h-4 w-4" />
					Gérer Tous les Produits
				</Button>
			</div>

			{/* Statistiques */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-3">
							<Package className="h-8 w-8 text-blue-500" />
							<div>
								<p className="text-sm text-muted-foreground">Total Produits</p>
								<p className="text-2xl font-bold">{stats.totalProducts}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-3">
							<AlertTriangle className="h-8 w-8 text-yellow-500" />
							<div>
								<p className="text-sm text-muted-foreground">Stock Faible</p>
								<p className="text-2xl font-bold">{stats.lowStock}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-3">
							<AlertCircle className="h-8 w-8 text-orange-500" />
							<div>
								<p className="text-sm text-muted-foreground">Stock Critique</p>
								<p className="text-2xl font-bold">{stats.critical}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-3">
							<TrendingDown className="h-8 w-8 text-red-500" />
							<div>
								<p className="text-sm text-muted-foreground">Rupture</p>
								<p className="text-2xl font-bold">{stats.outOfStock}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Filtres et recherche */}
			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex gap-2">
					<Button
						variant={filterType === 'all' ? 'default' : 'outline'}
						size="sm"
						onClick={() => setFilterType('all')}
					>
						Tous ({stats.lowStock + stats.outOfStock})
					</Button>
					<Button
						variant={filterType === 'low' ? 'default' : 'outline'}
						size="sm"
						onClick={() => setFilterType('low')}
					>
						Stock Faible ({stats.lowStock})
					</Button>
					<Button
						variant={filterType === 'out' ? 'default' : 'outline'}
						size="sm"
						onClick={() => setFilterType('out')}
					>
						Rupture ({stats.outOfStock})
					</Button>
				</div>

				<div className="relative flex-1 max-w-md">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
					<Input
						placeholder="Rechercher un produit..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-10"
					/>
				</div>

				{searchTerm && (
					<Button variant="outline" size="sm" onClick={() => setSearchTerm("")}>
						<X className="h-4 w-4" />
					</Button>
				)}
			</div>

			{/* Liste des produits */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<AlertTriangle className="h-5 w-5 text-yellow-500" />
						Produits en Alerte de Stock ({filteredProducts.length})
					</CardTitle>
				</CardHeader>
				<CardContent>
					{filteredProducts.length === 0 ? (
						<div className="text-center py-8 text-muted-foreground">
							{searchTerm ? 'Aucun produit trouvé' : 'Aucun produit en alerte de stock'}
						</div>
					) : (
						<div className="space-y-4">
							{filteredProducts.map((product) => (
								<div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-4 flex-1">
											{/* Image du produit */}
											<div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
												{product.imageUrl ? (
													<img 
														src={product.imageUrl} 
														alt={product.name}
														className="w-full h-full object-cover rounded-lg"
													/>
												) : (
													<Package className="h-8 w-8 text-gray-400" />
												)}
											</div>

											{/* Informations du produit */}
											<div className="flex-1">
												<h3 className="font-semibold text-lg">{product.name}</h3>
												<div className="flex items-center gap-4 text-sm text-muted-foreground">
													<span>Catégorie: {product.category?.name || 'Non définie'}</span>
													<span>Marque: {product.brand?.name || 'Non définie'}</span>
													<span>Prix: {formatCFA(product.priceCents)}</span>
												</div>
												<p className="text-xs text-muted-foreground mt-1">
													Ajouté le {new Date(product.createdAt).toLocaleDateString('fr-FR')}
												</p>
											</div>

											{/* Statut du stock */}
											<div className="flex flex-col items-end gap-3">
												<Badge className={getStockBadgeColor(product.stock)}>
													{getStockBadgeText(product.stock)}
												</Badge>
												<div className="text-right">
													<p className={`text-lg font-bold ${
														product.stock === 0 ? 'text-red-600' : 
														product.stock <= 5 ? 'text-orange-600' : 'text-yellow-600'
													}`}>
														{product.stock} unités
													</p>
													{product.stock === 0 && (
														<p className="text-xs text-red-600">Action requise</p>
													)}
													{product.stock > 0 && product.stock <= 5 && (
														<p className="text-xs text-orange-600">Réapprovisionnement urgent</p>
													)}
													{product.stock > 5 && product.stock <= 10 && (
														<p className="text-xs text-yellow-600">Surveiller</p>
													)}
												</div>
											</div>

											{/* Actions */}
											<div className="flex gap-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => editProduct(product.id)}
													className="flex items-center gap-2"
												>
													<Edit className="h-4 w-4" />
													Modifier
												</Button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>

			{/* Actions recommandées */}
			{stats.outOfStock > 0 && (
				<Card className="border-orange-200 bg-orange-50">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-orange-800">
							<AlertCircle className="h-5 w-5" />
							Actions Recommandées
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<p className="text-orange-700">
								Vous avez <strong>{stats.outOfStock} produit(s)</strong> en rupture de stock.
							</p>
							<div className="flex gap-3">
								<Button 
									variant="outline" 
									onClick={() => window.location.href = '/admin/products'}
									className="border-orange-300 text-orange-700 hover:bg-orange-100"
								>
									Gérer les Produits
								</Button>
								<Button 
									variant="outline" 
									onClick={() => window.location.href = '/admin/products?filter=outOfStock'}
									className="border-orange-300 text-orange-700 hover:bg-orange-100"
								>
									Voir les Ruptures
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
