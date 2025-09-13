"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { formatCFA } from "@/lib/utils/price-utils";
import { Search, Eye, Package, Truck, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Order {
	id: string;
	order_number: string;
	total_amount: number;
	status: string;
	payment_status: string;
	created_at: string;
	shipping_address: unknown;
	user_id: string;
	profiles?: {
		first_name: string;
		last_name: string;
	};
}

export function AdminOrders() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [paymentFilter, setPaymentFilter] = useState("all");
	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");
	const [selectedOrder, setSelectedOrder] = useState<{ order: any, items: any[] } | null>(null);
	const { toast } = useToast();
	const supabase = createBrowserSupabaseClient();

	useEffect(() => {
		fetchOrders();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		filterOrders();
	}, [orders, searchTerm, statusFilter]);

	const fetchOrders = async () => {
		try {
			const params = new URLSearchParams()
			if (statusFilter) params.set('status', statusFilter)
			if (paymentFilter) params.set('payment_status', paymentFilter)
			if (fromDate) params.set('from', fromDate)
			if (toDate) params.set('to', toDate)
			if (searchTerm) params.set('q', searchTerm)
			const res = await fetch(`/api/admin/orders?${params.toString()}`, { credentials: 'include' });
			if (!res.ok) {
				let details = ''
				try { details = await res.text() } catch {}
				throw new Error(`Failed to load orders (${res.status}): ${details}`)
			}
			const data = await res.json();
			setOrders((data as Order[]) || []);
		} catch (error) {
			console.error('Error fetching orders:', error);
			toast({
				title: "Erreur",
				description: "Impossible de charger les commandes",
				variant: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	const fetchOrderDetails = async (id: string) => {
		try {
			const res = await fetch(`/api/admin/orders/${id}`, { credentials: 'include' })
			if (!res.ok) throw new Error("Failed to fetch order details")
			const data = await res.json()
			setSelectedOrder(data)
		} catch {
			setSelectedOrder(null)
		}
	}

	const cancelOrder = async (id: string) => {
		try {
			const res = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE', credentials: 'include' })
			if (!res.ok) throw new Error('Failed to cancel order')
			toast({ title: 'Succès', description: 'Commande annulée' })
			fetchOrders()
		} catch {
                        toast({ title: 'Erreur', description: "Impossible d'annuler la commande", variant: 'error' })
		}
	}

	const exportCsv = async () => {
		const params = new URLSearchParams()
		if (statusFilter) params.set('status', statusFilter)
		if (paymentFilter) params.set('payment_status', paymentFilter)
		if (fromDate) params.set('from', fromDate)
		if (toDate) params.set('to', toDate)
		window.location.href = `/api/admin/orders/export?${params.toString()}`
	}

	const filterOrders = () => {
		let filtered = orders;

		if (searchTerm) {
			filtered = filtered.filter(order => 
				order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
				order.profiles?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				order.profiles?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (statusFilter !== "all") {
			filtered = filtered.filter(order => order.status === statusFilter);
		}

		setFilteredOrders(filtered);
	};

	const updateOrderStatus = async (orderId: string, newStatus: string) => {
		try {
			const { error } = await supabase
				.from('orders')
				.update({ status: newStatus })
				.eq('id', orderId);

			if (error) throw error;

			setOrders(orders.map(order => 
				order.id === orderId ? { ...order, status: newStatus } : order
			));

			toast({ title: "Succès", description: "Statut de la commande mis à jour" });
		} catch (error) {
			console.error('Error updating order status:', error);
			toast({ title: "Erreur", description: "Impossible de mettre à jour le statut", variant: "error" });
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'processing':
				return 'bg-blue-100 text-blue-800';
			case 'shipped':
				return 'bg-purple-100 text-purple-800';
			case 'delivered':
				return 'bg-green-100 text-green-800';
			case 'cancelled':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'processing':
				return <Package className="h-4 w-4" />;
			case 'shipped':
				return <Truck className="h-4 w-4" />;
			default:
				return null;
		}
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
			<Card>
				<CardHeader>
					<CardTitle>Gestion des Commandes</CardTitle>
				</CardHeader>
				<CardContent>
					{/* Filters */}
					<div className="flex flex-col sm:flex-row gap-4 mb-6">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Rechercher par numéro ou client..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="w-full sm:w-[200px]">
								<SelectValue placeholder="Filtrer par statut" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Tous les statuts</SelectItem>
								<SelectItem value="pending">En attente</SelectItem>
								<SelectItem value="processing">En traitement</SelectItem>
								<SelectItem value="shipped">Expédiée</SelectItem>
								<SelectItem value="delivered">Livrée</SelectItem>
								<SelectItem value="cancelled">Annulée</SelectItem>
							</SelectContent>
						</Select>
						<Select value={paymentFilter} onValueChange={setPaymentFilter}>
							<SelectTrigger className="w-full sm:w-[180px]">
								<SelectValue placeholder="Paiement" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Tous paiements</SelectItem>
								<SelectItem value="pending">En attente</SelectItem>
								<SelectItem value="paid">Payé</SelectItem>
								<SelectItem value="refunded">Remboursé</SelectItem>
							</SelectContent>
						</Select>
						<label htmlFor="from-date" className="sr-only">Date de début</label>
						<input id="from-date" type="date" className="border rounded px-3 py-2" value={fromDate} onChange={(e) => setFromDate(e.target.value)} title="Date de début" />
						<label htmlFor="to-date" className="sr-only">Date de fin</label>
						<input id="to-date" type="date" className="border rounded px-3 py-2" value={toDate} onChange={(e) => setToDate(e.target.value)} title="Date de fin" />
						<Button onClick={exportCsv}>
							<Download className="h-4 w-4 mr-2" /> Export CSV
						</Button>
					</div>

					{/* Orders Table */}
					<div className="space-y-4">
						{filteredOrders.map((order) => (
							<div
								key={order.id}
								className="border rounded-lg p-4 hover:shadow-md transition-shadow"
							>
								<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<h3 className="font-semibold">#{order.order_number}</h3>
											<Badge className={getStatusColor(order.status)}>
												<div className="flex items-center gap-1">
													{getStatusIcon(order.status)}
													{order.status}
												</div>
											</Badge>
										</div>
										<div className="text-sm text-muted-foreground space-y-1">
											<p>
												Client: {order.profiles?.first_name} {order.profiles?.last_name}
											</p>
											<p>
												Date: {new Date(order.created_at).toLocaleDateString('fr-FR')}
											</p>
											<p className="font-medium text-foreground">
												Total: {formatCFA(order.total_amount)}
											</p>
										</div>
									</div>

									<div className="flex flex-col sm:flex-row gap-2">
										<Select
											value={order.status}
											onValueChange={(newStatus) => updateOrderStatus(order.id, newStatus)}
										>
											<SelectTrigger className="w-full sm:w-[150px]">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="pending">En attente</SelectItem>
												<SelectItem value="processing">En traitement</SelectItem>
												<SelectItem value="shipped">Expédiée</SelectItem>
												<SelectItem value="delivered">Livrée</SelectItem>
												<SelectItem value="cancelled">Annulée</SelectItem>
											</SelectContent>
										</Select>
										
										<Button variant="outline" size="sm" onClick={() => fetchOrderDetails(order.id)}>
											<Eye className="h-4 w-4 mr-2" />
											Détails
										</Button>
										<Button variant="destructive" size="sm" onClick={() => cancelOrder(order.id)}>Annuler</Button>
									</div>
								</div>
							</div>
						))}

						{filteredOrders.length === 0 && (
							<div className="text-center py-8">
								<p className="text-muted-foreground">Aucune commande trouvée</p>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Order details modal/panel */}
			{selectedOrder && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
					<div className="bg-background rounded-lg shadow-xl max-w-3xl w-full p-6 relative">
						<button className="absolute top-3 right-3" onClick={() => setSelectedOrder(null)} aria-label="Fermer les détails de la commande" title="Fermer">
							<X className="h-5 w-5" />
							<span className="sr-only">Fermer</span>
						</button>
						<h3 className="text-xl font-semibold mb-4">Commande #{selectedOrder.order.order_number}</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h4 className="font-semibold mb-2">Produits</h4>
								<div className="space-y-2 text-sm">
									{selectedOrder.items.map((it) => (
										<div key={it.id} className="flex justify-between">
											<span>{it.product_name} x{it.quantity}</span>
											<span>{formatCFA(it.total_price)}</span>
										</div>
									))}
								</div>
							</div>
							<div>
								<h4 className="font-semibold mb-2">Adresses</h4>
								<p className="text-sm">Livraison:</p>
								<pre className="bg-muted p-2 rounded text-xs whitespace-pre-wrap">{JSON.stringify(selectedOrder.order.shipping_address, null, 2)}</pre>
								{selectedOrder.order.billing_address && (
									<>
										<p className="text-sm mt-2">Facturation:</p>
										<pre className="bg-muted p-2 rounded text-xs whitespace-pre-wrap">{JSON.stringify(selectedOrder.order.billing_address, null, 2)}</pre>
									</>
								)}
								<h4 className="font-semibold mt-4 mb-2">Paiement</h4>
								<p className="text-sm">Méthode: {selectedOrder.order.payment_method || '-'}</p>
								<p className="text-sm capitalize">Statut: {selectedOrder.order.payment_status || '-'}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}


