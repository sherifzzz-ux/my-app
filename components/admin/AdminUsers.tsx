"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Search, Shield, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
	id: string;
	first_name: string | null;
	last_name: string | null;
	phone: string | null;
	created_at: string;
	user_roles?: { role: string }[];
  email?: string | null;
  is_banned?: boolean;
}

export function AdminUsers() {
	const [users, setUsers] = useState<UserProfile[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [roleFilter, setRoleFilter] = useState("all");
	const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
	const [userOrders, setUserOrders] = useState<any[]>([]);
	const [loadingOrders, setLoadingOrders] = useState(false);
	const { toast } = useToast();
	const supabase = createBrowserSupabaseClient();

	useEffect(() => {
		fetchUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		filterUsers();
	}, [users, searchTerm, roleFilter]);

	const fetchUsers = async () => {
		try {
			const res = await fetch('/api/admin/users', { credentials: 'include' })
			if (!res.ok) {
				let details = ''
				try { details = await res.text() } catch {}
				throw new Error(`Failed to load users (${res.status}): ${details}`)
			}
			const data = await res.json()
			setUsers((data as UserProfile[]) || [])
		} catch (error) {
			console.error('Error fetching users:', error);
			toast({ title: "Erreur", description: "Impossible de charger les utilisateurs", variant: "destructive" });
		} finally {
			setLoading(false);
		}
	};

	const filterUsers = () => {
		let filtered = users;

		if (searchTerm) {
			filtered = filtered.filter(user => 
				user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.phone?.includes(searchTerm) ||
				user.email?.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (roleFilter !== "all") {
			filtered = filtered.filter(user => 
				user.user_roles?.some(role => role.role === roleFilter)
			);
		}

		setFilteredUsers(filtered);
	};

	const assignRole = async (userId: string, role: 'admin' | 'moderator' | 'user') => {
		try {
			const res = await fetch('/api/admin/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ userId, role }),
			})
			if (!res.ok) {
				let details = ''
				try { details = await res.text() } catch {}
				throw new Error(`Failed to assign role (${res.status}): ${details}`)
			}
			toast({ title: "Succès", description: `Rôle ${role} assigné avec succès` })
			fetchUsers()
		} catch (error) {
			console.error('Error assigning role:', error);
			toast({ title: "Erreur", description: "Impossible d'assigner le rôle", variant: "destructive" });
		}
	};

	const fetchOrdersForUser = async (userId: string) => {
		setLoadingOrders(true)
		try {
			const res = await fetch(`/api/admin/users/${userId}/orders`, { credentials: 'include' })
			if (!res.ok) throw new Error(`Failed to load orders (${res.status})`)
			const data = await res.json()
			setUserOrders(data || [])
		} catch (e) {
			setUserOrders([])
		} finally {
			setLoadingOrders(false)
		}
	}

	const suspendUser = async (userId: string) => {
		const res = await fetch(`/api/admin/users/${userId}/suspend`, { method: 'POST', credentials: 'include' })
		if (!res.ok) {
			toast({ title: 'Erreur', description: "Impossible de suspendre l'utilisateur", variant: 'destructive' })
			return
		}
		toast({ title: 'Succès', description: 'Compte suspendu' })
		fetchUsers()
	}

	const reactivateUser = async (userId: string) => {
		const res = await fetch(`/api/admin/users/${userId}/reactivate`, { method: 'POST', credentials: 'include' })
		if (!res.ok) {
			toast({ title: 'Erreur', description: 'Impossible de réactiver le compte', variant: 'destructive' })
			return
		}
		toast({ title: 'Succès', description: 'Compte réactivé' })
		fetchUsers()
	}

	const getUserRole = (user: UserProfile) => 'user';

	const getRoleColor = (role: string) => {
		switch (role) {
			case 'admin':
				return 'bg-red-100 text-red-800';
			case 'moderator':
				return 'bg-blue-100 text-blue-800';
			default:
				return 'bg-gray-100 text-gray-800';
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
					<CardTitle>Gestion des Utilisateurs</CardTitle>
				</CardHeader>
				<CardContent>
					{/* Filters */}
					<div className="flex flex-col sm:flex-row gap-4 mb-6">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Rechercher par nom ou téléphone..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Select value={roleFilter} onValueChange={setRoleFilter}>
							<SelectTrigger className="w-full sm:w-[200px]">
								<SelectValue placeholder="Filtrer par rôle" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Tous les rôles</SelectItem>
								<SelectItem value="admin">Administrateur</SelectItem>
								<SelectItem value="moderator">Modérateur</SelectItem>
								<SelectItem value="user">Utilisateur</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Users List */}
					<div className="space-y-4">
						{filteredUsers.map((user) => (
							<div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
								<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<div className="flex items-center gap-2">
												<User className="h-4 w-4 text-muted-foreground" />
												<h3 className="font-semibold">
													{user.first_name} {user.last_name}
												</h3>
											</div>
											<Badge className={getRoleColor(getUserRole(user))}>
												<Shield className="h-3 w-3 mr-1" />
												{getUserRole(user)}
											</Badge>
											{user.is_banned && (
												<Badge className="bg-red-100 text-red-800">Suspendu</Badge>
											)}
										</div>
										<div className="text-sm text-muted-foreground space-y-1">
											{user.email && <p>Email: {user.email}</p>}
											{user.phone && <p>Téléphone: {user.phone}</p>}
											<p>Inscrit le: {new Date(user.created_at).toLocaleDateString('fr-FR')}</p>
										</div>
									</div>

									<div className="flex flex-col sm:flex-row gap-2">
										<Button variant="outline" size="sm" onClick={() => { setSelectedUser(user); fetchOrdersForUser(user.id); }}>
											Détails
										</Button>
										<Select
											value={getUserRole(user)}
											onValueChange={(newRole: 'admin' | 'moderator' | 'user') => assignRole(user.id, newRole)}
										>
											<SelectTrigger className="w-full sm:w-[150px]">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="user">Utilisateur</SelectItem>
												<SelectItem value="moderator">Modérateur</SelectItem>
												<SelectItem value="admin">Administrateur</SelectItem>
											</SelectContent>
										</Select>
										{user.is_banned ? (
											<Button size="sm" onClick={() => reactivateUser(user.id)}>Réactiver</Button>
										) : (
											<Button variant="destructive" size="sm" onClick={() => suspendUser(user.id)}>Suspendre</Button>
										)}
									</div>
								</div>
							</div>
						))}

						{filteredUsers.length === 0 && (
							<div className="text-center py-8">
								<p className="text-muted-foreground">Aucun utilisateur trouvé</p>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Détails utilisateur */}
			{selectedUser && (
				<Card>
					<CardHeader>
						<CardTitle>Détails: {selectedUser.first_name} {selectedUser.last_name}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h4 className="font-semibold mb-2">Profil</h4>
								<p>Email: {selectedUser.email || '-'}</p>
								<p>Téléphone: {selectedUser.phone || '-'}</p>
								<p>Inscrit le: {new Date(selectedUser.created_at).toLocaleDateString('fr-FR')}</p>
							</div>
							<div>
								<h4 className="font-semibold mb-2">Historique des commandes</h4>
								{loadingOrders ? (
									<LoadingSpinner />
								) : (
									<div className="space-y-2">
										{userOrders.map((o) => (
											<div key={o.id} className="border rounded p-3 text-sm flex justify-between">
												<span>#{o.order_number}</span>
												<span className="capitalize">{o.status}</span>
												<span>{new Date(o.created_at).toLocaleDateString('fr-FR')}</span>
											</div>
										))}
										{userOrders.length === 0 && (<p className="text-muted-foreground">Aucune commande</p>)}
									</div>
								)}
							</div>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}


