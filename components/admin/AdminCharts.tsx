"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
	LineChart, 
	Line, 
	AreaChart, 
	Area, 
	BarChart, 
	Bar, 
	PieChart, 
	Pie, 
	Cell,
	XAxis, 
	YAxis, 
	CartesianGrid, 
	Tooltip, 
	Legend, 
	ResponsiveContainer 
} from "recharts";
import { formatCFA } from "@/lib/utils/price-utils";

interface MonthlyRevenue {
	month: string;
	revenue: number;
}

interface OrderStatus {
	status: string;
	count: number;
}

interface TopProduct {
	name: string;
	sales: number;
}

interface AdminChartsProps {
	monthlyRevenue: MonthlyRevenue[];
	orderStatuses: OrderStatus[];
	topProducts: TopProduct[];
}

const ORDER_STATUS_COLORS: Record<string, string> = {
	PENDING: "#f59e0b",
	PAID: "#3b82f6",
	SHIPPED: "#10b981",
	CANCELLED: "#ef4444",
};

const ORDER_STATUS_LABELS: Record<string, string> = {
	PENDING: "En attente",
	PAID: "Payée",
	SHIPPED: "Expédiée",
	CANCELLED: "Annulée",
};

const CHART_COLORS = [
	"#8b5cf6", "#10b981", "#3b82f6", "#f59e0b", 
	"#ef4444", "#06b6d4", "#84cc16", "#f97316"
];

export function AdminCharts({ monthlyRevenue, orderStatuses, topProducts }: AdminChartsProps) {
	// Formater les données pour les graphiques
	const formattedMonthlyRevenue = monthlyRevenue.map(item => ({
		...item,
		revenue: item.revenue / 100, // Convertir centimes en euros pour l'affichage
	}));

	const formattedOrderStatuses = orderStatuses.map(item => ({
		...item,
		label: ORDER_STATUS_LABELS[item.status] || item.status,
		color: ORDER_STATUS_COLORS[item.status] || "#6b7280",
	}));

	const formattedTopProducts = topProducts.map((item, index) => ({
		...item,
		color: CHART_COLORS[index % CHART_COLORS.length],
	}));

	return (
		<div className="space-y-6">
			{/* Graphique des revenus mensuels */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<span className="text-lg">📈 Évolution des Revenus</span>
					</CardTitle>
					<p className="text-sm text-muted-foreground">
						Évolution des revenus sur les 6 derniers mois
					</p>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={formattedMonthlyRevenue}>
							<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
							<XAxis 
								dataKey="month" 
								tick={{ fontSize: 12 }}
								tickLine={false}
								axisLine={false}
							/>
							<YAxis 
								tick={{ fontSize: 12 }}
								tickLine={false}
								axisLine={false}
								tickFormatter={(value) => `${value}€`}
							/>
							<Tooltip 
								formatter={(value: number) => [formatCFA(value * 100), 'Revenus']}
								labelFormatter={(label) => `Mois: ${label}`}
								contentStyle={{
									backgroundColor: 'white',
									border: '1px solid #e5e7eb',
									borderRadius: '8px',
									boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
								}}
							/>
							<Legend />
							<Line 
								type="monotone" 
								dataKey="revenue" 
								stroke="#10b981" 
								strokeWidth={3}
								dot={{ 
									fill: '#10b981', 
									strokeWidth: 2, 
									r: 5,
									stroke: 'white'
								}}
								activeDot={{ 
									r: 8, 
									stroke: '#10b981', 
									strokeWidth: 2 
								}}
							/>
						</LineChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			{/* Graphiques côte à côte */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Graphique des statuts de commandes */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<span className="text-lg">📊 Répartition des Commandes</span>
						</CardTitle>
						<p className="text-sm text-muted-foreground">
							Répartition par statut de commande
						</p>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={formattedOrderStatuses}
									cx="50%"
									cy="50%"
									labelLine={false}
									label={({ label, percent }) => `${label} ${percent ? (percent * 100).toFixed(0) : 0}%`}
									outerRadius={80}
									fill="#8884d8"
									dataKey="count"
									stroke="white"
									strokeWidth={2}
								>
									{formattedOrderStatuses.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.color} />
									))}
								</Pie>
								<Tooltip 
									formatter={(value: number) => [value, 'Commandes']}
									labelFormatter={(label) => `Statut: ${label}`}
									contentStyle={{
										backgroundColor: 'white',
										border: '1px solid #e5e7eb',
										borderRadius: '8px',
										boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
									}}
								/>
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Graphique des produits les plus vendus */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<span className="text-lg">🏆 Top Produits par Ventes</span>
						</CardTitle>
						<p className="text-sm text-muted-foreground">
							Produits les plus vendus
						</p>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={formattedTopProducts} layout="horizontal">
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
								<XAxis 
									type="number"
									tick={{ fontSize: 12 }}
									tickLine={false}
									axisLine={false}
								/>
								<YAxis 
									type="category" 
									dataKey="name" 
									tick={{ fontSize: 11 }}
									tickLine={false}
									axisLine={false}
									width={80}
								/>
								<Tooltip 
									formatter={(value: number) => [value, 'Ventes']}
									labelFormatter={(label) => `Produit: ${label}`}
									contentStyle={{
										backgroundColor: 'white',
										border: '1px solid #e5e7eb',
										borderRadius: '8px',
										boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
									}}
								/>
								<Legend />
								<Bar 
									dataKey="sales" 
									fill="#8b5cf6"
									radius={[0, 4, 4, 0]}
								>
									{formattedTopProducts.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.color} />
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			{/* Graphique des revenus en aire */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<span className="text-lg">💰 Revenus Mensuels (Vue Aire)</span>
					</CardTitle>
					<p className="text-sm text-muted-foreground">
						Visualisation en aire des revenus mensuels
					</p>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={300}>
						<AreaChart data={formattedMonthlyRevenue}>
							<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
							<XAxis 
								dataKey="month" 
								tick={{ fontSize: 12 }}
								tickLine={false}
								axisLine={false}
							/>
							<YAxis 
								tick={{ fontSize: 12 }}
								tickLine={false}
								axisLine={false}
								tickFormatter={(value) => `${value}€`}
							/>
							<Tooltip 
								formatter={(value: number) => [formatCFA(value * 100), 'Revenus']}
								labelFormatter={(label) => `Mois: ${label}`}
								contentStyle={{
									backgroundColor: 'white',
									border: '1px solid #e5e7eb',
									borderRadius: '8px',
									boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
								}}
							/>
							<Legend />
							<Area 
								type="monotone" 
								dataKey="revenue" 
								stroke="#10b981" 
								fill="#10b981"
								fillOpacity={0.3}
								strokeWidth={2}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	);
}
