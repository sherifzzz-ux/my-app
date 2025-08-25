"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
	AlertTriangle, 
	Clock, 
	Package, 
	Truck, 
	DollarSign,
	TrendingDown,
	Info
} from "lucide-react";
import { formatCFA } from "@/lib/utils/price-utils";

interface MetricsOverviewProps {
	totalOrders: number;
	pendingOrders: number;
	lowStockProducts: number;
	revenueThisMonth: number;
	revenueLastMonth: number;
}

export function MetricsOverview({
	totalOrders,
	pendingOrders,
	lowStockProducts,
	revenueThisMonth,
	revenueLastMonth
}: MetricsOverviewProps) {
	// Calculer les variations
	const revenueChange = revenueLastMonth > 0 
		? ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100 
		: 0;
	
	const orderChange = totalOrders > 0 
		? (pendingOrders / totalOrders) * 100 
		: 0;

	// Déterminer les alertes
	const alerts = [];
	
	if (pendingOrders > 5) {
		alerts.push({
			type: 'warning',
			icon: Clock,
			title: 'Commandes en attente',
			message: `${pendingOrders} commandes nécessitent votre attention`,
			color: 'text-yellow-600',
			bgColor: 'bg-yellow-50'
		});
	}

	if (lowStockProducts > 0) {
		alerts.push({
			type: 'danger',
			icon: Package,
			title: 'Stock faible',
			message: `${lowStockProducts} produits ont un stock faible`,
			color: 'text-red-600',
			bgColor: 'bg-red-50'
		});
	}

	if (revenueChange < -10) {
		alerts.push({
			type: 'info',
			icon: TrendingDown,
			title: 'Baisse des revenus',
			message: `Revenus en baisse de ${Math.abs(revenueChange).toFixed(1)}% ce mois`,
			color: 'text-blue-600',
			bgColor: 'bg-blue-50'
		});
	}

	return (
		<div className="space-y-6">
			{/* Métriques supplémentaires */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
							<Clock className="h-4 w-4" />
							Commandes en Attente
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-700">{pendingOrders}</div>
						<p className="text-xs text-blue-600 mt-1">
							{orderChange.toFixed(1)}% du total des commandes
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-orange-700 flex items-center gap-2">
							<Package className="h-4 w-4" />
							Stock Faible
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-orange-700">{lowStockProducts}</div>
						<p className="text-xs text-orange-600 mt-1">
							Produits nécessitant réapprovisionnement
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
							<DollarSign className="h-4 w-4" />
							Revenus ce Mois
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-700">
							{formatCFA(revenueThisMonth)}
						</div>
						<p className="text-xs text-green-600 mt-1 flex items-center gap-1">
							{revenueChange >= 0 ? (
								<>
									<span>+{revenueChange.toFixed(1)}%</span>
									<span>vs mois dernier</span>
								</>
							) : (
								<>
									<span>{revenueChange.toFixed(1)}%</span>
									<span>vs mois dernier</span>
								</>
							)}
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Alertes et notifications */}
			{alerts.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<AlertTriangle className="h-5 w-5 text-amber-500" />
							Alertes et Notifications
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{alerts.map((alert, index) => (
								<div 
									key={index}
									className={`p-4 rounded-lg border ${alert.bgColor} border-l-4 border-l-current`}
								>
									<div className="flex items-start gap-3">
										<alert.icon className={`h-5 w-5 mt-0.5 ${alert.color}`} />
										<div className="flex-1">
											<h4 className={`font-medium ${alert.color}`}>
												{alert.title}
											</h4>
											<p className="text-sm text-gray-600 mt-1">
												{alert.message}
											</p>
										</div>
										<Button 
											variant="ghost" 
											size="sm"
											className={alert.color}
										>
											Voir détails
										</Button>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Conseils et recommandations */}
			<Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-purple-700">
						<Info className="h-5 w-5" />
						Conseils et Recommandations
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<h4 className="font-medium text-purple-700">Actions recommandées</h4>
							<ul className="text-sm text-purple-600 space-y-1">
								<li>• Traiter les commandes en attente rapidement</li>
								<li>• Vérifier les stocks des produits populaires</li>
								<li>• Analyser les tendances de vente</li>
							</ul>
						</div>
						<div className="space-y-2">
							<h4 className="font-medium text-purple-700">Optimisations</h4>
							<ul className="text-sm text-purple-600 space-y-1">
								<li>• Promouvoir les produits en stock</li>
								<li>• Améliorer la conversion des visiteurs</li>
								<li>• Optimiser les coûts de livraison</li>
							</ul>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
