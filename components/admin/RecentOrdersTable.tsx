"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
	Search, 
	Eye, 
	Edit, 
	MoreHorizontal,
	Filter,
	Calendar,
	User,
	Package
} from "lucide-react";
import { formatCFA } from "@/lib/utils/price-utils";

interface Order {
	id: string;
	order_number: string;
	total_amount: number;
	status: string;
	created_at: string;
	customer_name?: string;
	items_count?: number;
}

interface RecentOrdersTableProps {
	orders: Order[];
}

const ORDER_STATUS_COLORS: Record<string, string> = {
	PENDING: "bg-yellow-100 text-yellow-800",
	PAID: "bg-blue-100 text-blue-800",
	SHIPPED: "bg-green-100 text-green-800",
	CANCELLED: "bg-red-100 text-red-800",
};

const ORDER_STATUS_LABELS: Record<string, string> = {
	PENDING: "En attente",
	PAID: "Payée",
	SHIPPED: "Expédiée",
	CANCELLED: "Annulée",
};

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState<string>("all");

	// Filtrer les commandes
	const filteredOrders = orders.filter(order => {
		const matchesSearch = order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
							(order.customer_name || "").toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter === "all" || order.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const handleViewOrder = (orderId: string) => {
		// Navigation vers la page de détail de la commande
		window.location.href = `/admin/orders/${orderId}`;
	};

	const handleEditOrder = (orderId: string) => {
		// Navigation vers la page d'édition de la commande
		window.location.href = `/admin/orders/${orderId}/edit`;
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Package className="h-5 w-5" />
					Commandes Récentes
				</CardTitle>
				<div className="flex flex-col sm:flex-row gap-4 mt-4">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Rechercher par numéro de commande ou client..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10"
						/>
					</div>
					<Select value={statusFilter} onValueChange={setStatusFilter}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Filtrer par statut" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Tous les statuts</SelectItem>
							<SelectItem value="PENDING">En attente</SelectItem>
							<SelectItem value="PAID">Payée</SelectItem>
							<SelectItem value="SHIPPED">Expédiée</SelectItem>
							<SelectItem value="CANCELLED">Annulée</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="flex items-center gap-1">
									<Package className="h-4 w-4" />
									Commande
								</TableHead>
								<TableHead className="flex items-center gap-1">
									<User className="h-4 w-4" />
									Client
								</TableHead>
								<TableHead className="flex items-center gap-1">
									<Calendar className="h-4 w-4" />
									Date
								</TableHead>
								<TableHead>Montant</TableHead>
								<TableHead>Statut</TableHead>
								<TableHead>Articles</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredOrders.length > 0 ? (
								filteredOrders.map((order) => (
									<TableRow key={order.id} className="hover:bg-muted/50">
										<TableCell className="font-medium">
											#{order.order_number}
										</TableCell>
										<TableCell>
											{order.customer_name || (
												<span className="text-muted-foreground italic">
													Client anonyme
												</span>
											)}
										</TableCell>
										<TableCell>
											{new Date(order.created_at).toLocaleDateString('fr-FR', {
												day: '2-digit',
												month: '2-digit',
												year: 'numeric',
												hour: '2-digit',
												minute: '2-digit'
											})}
										</TableCell>
										<TableCell className="font-medium">
											{formatCFA(order.total_amount)}
										</TableCell>
										<TableCell>
											<Badge className={ORDER_STATUS_COLORS[order.status]}>
												{ORDER_STATUS_LABELS[order.status] || order.status}
											</Badge>
										</TableCell>
										<TableCell>
											<span className="flex items-center gap-1">
												<Package className="h-3 w-3" />
												{order.items_count || 0} article(s)
											</span>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<Button 
													variant="ghost" 
													size="sm"
													onClick={() => handleViewOrder(order.id)}
													title="Voir la commande"
												>
													<Eye className="h-4 w-4" />
												</Button>
												<Button 
													variant="ghost" 
													size="sm"
													onClick={() => handleEditOrder(order.id)}
													title="Modifier la commande"
												>
													<Edit className="h-4 w-4" />
												</Button>
												<Button variant="ghost" size="sm" title="Plus d'actions">
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={7} className="text-center py-8">
										<div className="text-muted-foreground">
											{searchTerm || statusFilter !== "all" ? (
												<div className="flex flex-col items-center gap-2">
													<Filter className="h-8 w-8 text-muted-foreground" />
													<span>Aucune commande ne correspond aux filtres</span>
													<Button 
														variant="outline" 
														size="sm"
														onClick={() => {
															setSearchTerm("");
															setStatusFilter("all");
														}}
													>
														Réinitialiser les filtres
													</Button>
												</div>
											) : (
												<div className="flex flex-col items-center gap-2">
													<Package className="h-8 w-8 text-muted-foreground" />
													<span>Aucune commande récente</span>
												</div>
											)}
										</div>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				
				{/* Pagination simple */}
				{filteredOrders.length > 0 && (
					<div className="flex items-center justify-between mt-4">
						<p className="text-sm text-muted-foreground">
							Affichage de {filteredOrders.length} commande(s) sur {orders.length} total
						</p>
						<div className="flex items-center gap-2">
							<Button variant="outline" size="sm" disabled>
								Précédent
							</Button>
							<Button variant="outline" size="sm" disabled>
								Suivant
							</Button>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
