"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
	ShoppingCart, 
	Users, 
	Mail, 
	TrendingUp, 
	CreditCard,
	Package,
	MessageSquare,
	X
} from "lucide-react";
import { formatCFA } from "@/lib/utils/price-utils";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { KPICard } from "./KPICard";
import { AdminCharts } from "./AdminCharts";
import { RecentOrdersTable } from "./RecentOrdersTable";
import { MetricsOverview } from "./MetricsOverview";
import { BrandsPage } from "./BrandsPage";
import { CategoriesPage } from "./CategoriesPage";
import { StockFaiblePage } from "./StockFaiblePage";

interface OverviewData {
	// Compteurs principaux
	totalProducts: number;
	totalCategories: number;
	totalBrands: number;
	totalStock: number;
	totalStockValue: number;
	
	// Alertes
	lowStockProducts: number;
	outOfStockProducts: number;
	featuredProducts: number;
	
	// Données récentes
	recentProducts: Array<{
		id: string;
		name: string;
		priceCents: number;
		stock: number;
		createdAt: string;
		category?: { name: string };
		brand?: { name: string };
	}>;
	expensiveProducts: Array<{
		id: string;
		name: string;
		priceCents: number;
		imageUrl?: string;
	}>;
	categoriesWithCount: Array<{
		id: string;
		name: string;
		slug: string;
	}>;
	
	// Placeholders pour les fonctionnalités futures
	totalOrders: number;
	totalRevenue: number;
	totalUsers: number;
	recentOrders: any[];
	monthlyRevenue: any[];
	orderStatuses: any[];
	topProducts: any[];
	pendingOrders: number;
	revenueThisMonth: number;
	revenueLastMonth: number;
}

interface AdminOverviewProps {
	onPageChange?: (page: 'overview' | 'orders' | 'users' | 'messages' | 'newsletter' | 'products' | 'categories' | 'brands' | 'stock' | 'analytics' | 'settings') => void;
}

type ActiveTab = 'overview' | 'products' | 'categories' | 'brands' | 'stock';

export function AdminOverview({ onPageChange }: AdminOverviewProps) {
	const [data, setData] = useState<OverviewData | null>(null);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
	const { toast } = useToast();

	useEffect(() => {
		fetch('/api/admin/overview', { credentials: 'include' })
			.then(async (res) => {
				if (!res.ok) throw new Error(`Failed (${res.status})`);
				return res.json();
			})
			.then((json) => setData(json))
			.catch(() => {
				toast({ 
					title: 'Erreur', 
					description: "Impossible de charger l'aperçu", 
        variant: 'error'
				});
			})
			.finally(() => setLoading(false));
	}, []);

	// Calculer le panier moyen
	const averageOrderValue = data?.totalOrders && data.totalOrders > 0 
		? (data.totalRevenue ?? 0) / data.totalOrders 
		: 0;

	if (loading) {
		return (
			<div className="flex items-center justify-center py-16">
				<LoadingSpinner size="lg" />
			</div>
		);
	}

	// Rendu du contenu selon l'onglet actif
	const renderTabContent = () => {
		switch (activeTab) {
			case 'overview':
				return (
					<>
						{/* Cartes KPI détaillées */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							<KPICard
								title="Total Produits"
								value={data?.totalProducts ?? 0}
								icon={Package}
								trend={{ value: data?.recentProducts?.length || 0, isPositive: true, period: "produits récents" }}
								className="border-l-blue-500"
								iconColor="text-blue-500"
								valueColor="text-blue-600"
							/>

							<KPICard
								title="Valeur du Stock"
								value={formatCFA(data?.totalStockValue ?? 0)}
								icon={TrendingUp}
								trend={{ value: data?.totalStock || 0, isPositive: true, period: "unités en stock" }}
								className="border-l-green-500"
								iconColor="text-green-500"
								valueColor="text-green-600"
							/>

							<KPICard
								title="Total Catégories"
								value={data?.totalCategories ?? 0}
								icon={ShoppingCart}
								trend={{ value: data?.categoriesWithCount?.length || 0, isPositive: true, period: "catégories actives" }}
								className="border-l-purple-500"
								iconColor="text-purple-500"
								valueColor="text-purple-600"
							/>

							<KPICard
								title="Produits en Vedette"
								value={data?.featuredProducts ?? 0}
								icon={CreditCard}
								trend={{ value: data?.outOfStockProducts || 0, isPositive: false, period: "en rupture de stock" }}
								className="border-l-orange-500"
								iconColor="text-orange-500"
								valueColor="text-orange-600"
							/>
						</div>

						{/* Alertes et produits récents */}
						{data && (
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								{/* Alertes de stock */}
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<TrendingUp className="h-5 w-5 text-destructive" />
											Alertes de Stock
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										{data.lowStockProducts > 0 && (
											<div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
												<div className="flex items-center gap-2">
													<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
													<span className="text-sm font-medium">Stock faible</span>
												</div>
												<span className="text-sm text-yellow-700 font-semibold">{data.lowStockProducts} produits</span>
											</div>
										)}
										
										{data.outOfStockProducts > 0 && (
											<div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
												<div className="flex items-center gap-2">
													<div className="w-3 h-3 bg-red-500 rounded-full"></div>
													<span className="text-sm font-medium">Rupture de stock</span>
												</div>
												<span className="text-sm text-red-700 font-semibold">{data.outOfStockProducts} produits</span>
											</div>
										)}
										
										{data.lowStockProducts === 0 && data.outOfStockProducts === 0 && (
											<div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
												<div className="flex items-center gap-2">
													<div className="w-3 h-3 bg-green-500 rounded-full"></div>
													<span className="text-sm font-medium">Stock OK</span>
												</div>
												<span className="text-sm text-green-700 font-semibold">Aucune alerte</span>
											</div>
										)}
									</CardContent>
								</Card>

								{/* Produits récents */}
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Package className="h-5 w-5 text-blue-500" />
											Produits Récents
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											{data.recentProducts?.slice(0, 5).map((product) => (
												<div key={product.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
													<div className="flex items-center gap-3">
														<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
															<Package className="h-4 w-4 text-gray-600" />
														</div>
														<div>
															<p className="text-sm font-medium">{product.name}</p>
															<p className="text-xs text-muted-foreground">
																{product.category?.name || 'Sans catégorie'}
															</p>
														</div>
													</div>
													<div className="text-right">
														<p className="text-sm font-semibold">{formatCFA(product.priceCents)}</p>
														<p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</div>
						)}

						{/* Section des catégories populaires */}
						{data && data.categoriesWithCount && data.categoriesWithCount.length > 0 && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<ShoppingCart className="h-5 w-5 text-purple-500" />
										Catégories
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
										{data.categoriesWithCount.map((category) => (
											<div key={category.id} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
												<h4 className="font-medium text-gray-900">{category.name}</h4>
												<p className="text-sm text-gray-600 mt-1">{category.slug}</p>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						)}
					</>
				);

			case 'products':
				return (
					<div className="text-center py-16">
						<Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
						<h3 className="text-xl font-semibold mb-2">Gestion des Produits</h3>
						<p className="text-muted-foreground mb-4">
							Cette section sera intégrée directement dans le panneau d'administration
						</p>
						<Button onClick={() => window.location.href = '/admin/products'}>
							Aller à la Gestion des Produits
						</Button>
					</div>
				);

			case 'categories':
				return <CategoriesPage />;

			case 'brands':
				return <BrandsPage />;

			case 'stock':
				return <StockFaiblePage />;

			default:
				return null;
		}
	};

	return (
		<div className="space-y-6">
			{/* En-tête avec navigation par onglets */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold">Panneau d'Administration</h1>
						<p className="text-muted-foreground">Gérez votre boutique en ligne</p>
					</div>
					{activeTab !== 'overview' && (
						<Button 
							variant="outline" 
							onClick={() => setActiveTab('overview')}
							className="flex items-center gap-2"
						>
							<X className="h-4 w-4" />
							Retour à l'Aperçu
						</Button>
					)}
				</div>

				{/* Navigation par onglets */}
				<div className="flex flex-wrap gap-2 border-b">
					<Button
						variant={activeTab === 'overview' ? 'default' : 'ghost'}
						onClick={() => setActiveTab('overview')}
						className="flex items-center gap-2"
					>
						<TrendingUp className="h-4 w-4" />
						Vue d'Ensemble
					</Button>
					<Button
						variant={activeTab === 'products' ? 'default' : 'ghost'}
						onClick={() => setActiveTab('products')}
						className="flex items-center gap-2"
					>
						<Package className="h-4 w-4" />
						Produits
					</Button>
					<Button
						variant={activeTab === 'categories' ? 'default' : 'ghost'}
						onClick={() => setActiveTab('categories')}
						className="flex items-center gap-2"
					>
						<ShoppingCart className="h-4 w-4" />
						Catégories
					</Button>
					<Button
						variant={activeTab === 'brands' ? 'default' : 'ghost'}
						onClick={() => setActiveTab('brands')}
						className="flex items-center gap-2"
					>
						<CreditCard className="h-4 w-4" />
						Marques
					</Button>
					<Button
						variant={activeTab === 'stock' ? 'default' : 'ghost'}
						onClick={() => setActiveTab('stock')}
						className="flex items-center gap-2"
					>
						<TrendingUp className="h-4 w-4" />
						Stock
					</Button>
				</div>
			</div>

			{/* Actions rapides (visible seulement sur l'aperçu) */}
			{activeTab === 'overview' && (
				<Card>
					<CardHeader>
						<CardTitle>Actions Rapides</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<Button 
								variant="outline" 
								className="h-auto p-4 flex flex-col items-center gap-2"
								onClick={() => onPageChange ? onPageChange('products') : setActiveTab('products')}
							>
								<Package className="h-8 w-8 text-primary" />
								<span className="text-sm font-medium">Gérer Produits</span>
								<span className="text-xs text-muted-foreground">{data?.totalProducts ?? 0} produits</span>
							</Button>
							
							<Button 
								variant="outline" 
								className="h-auto p-4 flex flex-col items-center gap-2"
								onClick={() => onPageChange ? onPageChange('categories') : setActiveTab('categories')}
							>
								<ShoppingCart className="h-8 w-8 text-secondary" />
								<span className="text-sm font-medium">Gérer Catégories</span>
								<span className="text-xs text-muted-foreground">{data?.totalCategories ?? 0} catégories</span>
							</Button>
							
							<Button 
								variant="outline" 
								className="h-auto p-4 flex flex-col items-center gap-2"
								onClick={() => onPageChange ? onPageChange('brands') : setActiveTab('brands')}
							>
								<CreditCard className="h-8 w-8 text-accent" />
								<span className="text-sm font-medium">Gérer Marques</span>
								<span className="text-xs text-muted-foreground">{data?.totalBrands ?? 0} marques</span>
							</Button>
							
							<Button 
								variant="outline" 
								className="h-auto p-4 flex flex-col items-center gap-2"
								onClick={() => onPageChange ? onPageChange('stock') : setActiveTab('stock')}
							>
								<TrendingUp className="h-8 w-8 text-destructive" />
								<span className="text-sm font-medium">Stock Faible</span>
								<span className="text-xs text-muted-foreground">{data?.lowStockProducts ?? 0} alertes</span>
							</Button>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Contenu de l'onglet actif */}
			{renderTabContent()}
		</div>
	);
}


