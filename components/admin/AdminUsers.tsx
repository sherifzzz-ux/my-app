"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Search, Shield, User, ArrowLeft, AlertTriangle, CheckCircle, Ban, Unlock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
	const [confirmDialog, setConfirmDialog] = useState<{
		open: boolean;
		action: 'suspend' | 'reactivate' | null;
		user: UserProfile | null;
		loading: boolean;
	}>({
		open: false,
		action: null,
		user: null,
		loading: false
	});
	const { toast } = useToast();

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
			toast({ title: "Erreur", description: "Impossible de charger les utilisateurs", variant: "error" });
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
			toast({ title: "Erreur", description: "Impossible d'assigner le rôle", variant: "error" });
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

	const openConfirmDialog = (action: 'suspend' | 'reactivate', user: UserProfile) => {
		setConfirmDialog({
			open: true,
			action,
			user,
			loading: false
		});
	};

	const closeConfirmDialog = () => {
		setConfirmDialog({
			open: false,
			action: null,
			user: null,
			loading: false
		});
	};

	const executeAction = async () => {
		if (!confirmDialog.user || !confirmDialog.action) return;

		setConfirmDialog(prev => ({ ...prev, loading: true }));

		try {
			console.log(`🔄 Exécution de l'action: ${confirmDialog.action} pour l'utilisateur:`, confirmDialog.user.id);
			
			if (confirmDialog.action === 'suspend') {
				await suspendUser(confirmDialog.user.id);
			} else {
				await reactivateUser(confirmDialog.user.id);
			}
			
			console.log('✅ Action exécutée avec succès');
			closeConfirmDialog();
		} catch (error) {
			console.error('❌ Erreur lors de l\'exécution de l\'action:', error);
		} finally {
			setConfirmDialog(prev => ({ ...prev, loading: false }));
		}
	};

	const suspendUser = async (userId: string) => {
		try {
			const res = await fetch(`/api/admin/users/${userId}/suspend`, { 
				method: 'POST', 
				credentials: 'include' 
			})
			if (!res.ok) {
				const errorData = await res.text()
				throw new Error(`Erreur ${res.status}: ${errorData}`)
			}
			
			// Mettre à jour l'état local immédiatement
			setUsers(prevUsers => 
				prevUsers.map(user => 
					user.id === userId 
						? { ...user, is_banned: true }
						: user
				)
			);
			
			// Mettre à jour l'utilisateur sélectionné s'il s'agit du même
			if (selectedUser && selectedUser.id === userId) {
				setSelectedUser(prev => prev ? { ...prev, is_banned: true } : null);
			}
			
			toast({ 
				title: 'Succès', 
				description: 'Utilisateur suspendu avec succès',
				variant: 'default'
			})
		} catch (error) {
			console.error('Error suspending user:', error)
			toast({ 
				title: 'Erreur', 
				description: "Impossible de suspendre l'utilisateur", 
				variant: 'error' 
			})
			throw error; // Re-throw pour la gestion dans executeAction
		}
	}

	const reactivateUser = async (userId: string) => {
		try {
			console.log('🔄 Tentative de réactivation de l\'utilisateur:', userId);
			const res = await fetch(`/api/admin/users/${userId}/reactivate`, { 
				method: 'POST', 
				credentials: 'include' 
			})
			console.log('📡 Réponse de l\'API de réactivation:', res.status, res.statusText);
			
			if (!res.ok) {
				const errorData = await res.text()
				console.error('❌ Erreur API de réactivation:', errorData);
				throw new Error(`Erreur ${res.status}: ${errorData}`)
			}
			
			const responseData = await res.json();
			console.log('✅ Données de réponse de réactivation:', responseData);
			
			// Mettre à jour l'état local immédiatement
			setUsers(prevUsers => 
				prevUsers.map(user => 
					user.id === userId 
						? { ...user, is_banned: false }
						: user
				)
			);
			
			// Mettre à jour l'utilisateur sélectionné s'il s'agit du même
			if (selectedUser && selectedUser.id === userId) {
				setSelectedUser(prev => prev ? { ...prev, is_banned: false } : null);
			}
			
			console.log('✅ État local mis à jour après réactivation');
			
			toast({ 
				title: 'Succès', 
				description: 'Compte réactivé avec succès',
				variant: 'default'
			})
		} catch (error) {
			console.error('❌ Erreur lors de la réactivation:', error)
			toast({ 
				title: 'Erreur', 
				description: "Impossible de réactiver le compte", 
				variant: 'error' 
			})
			throw error; // Re-throw pour la gestion dans executeAction
		}
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

	const handleUserDetails = (user: UserProfile) => {
		setSelectedUser(user);
		fetchOrdersForUser(user.id);
	};

	const handleBackToList = () => {
		setSelectedUser(null);
		setUserOrders([]);
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
					{/* Section Détails Utilisateur - Affichée en haut si un utilisateur est sélectionné */}
					{selectedUser && (
						<div className="mb-8">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-lg font-semibold">Détails: {selectedUser.first_name} {selectedUser.last_name}</h3>
								<Button 
									variant="outline" 
									size="sm" 
									onClick={handleBackToList}
									className="flex items-center gap-2"
								>
									<ArrowLeft className="h-4 w-4" />
									Retour à la liste
								</Button>
							</div>
							
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h4 className="font-semibold mb-2">Profil</h4>
									<div className="space-y-2 text-sm">
										<p><span className="font-medium">Email:</span> {selectedUser.email || '-'}</p>
										<p><span className="font-medium">Téléphone:</span> {selectedUser.phone || '-'}</p>
										<p><span className="font-medium">Inscrit le:</span> {new Date(selectedUser.created_at).toLocaleDateString('fr-FR')}</p>
										<div className="flex items-center gap-2 mt-2">
											{selectedUser.is_banned ? (
												<Badge className="bg-red-100 text-red-800 flex items-center gap-1">
													<AlertTriangle className="h-3 w-3" />
													Suspendu
												</Badge>
											) : (
												<Badge className="bg-green-100 text-green-800 flex items-center gap-1">
													<CheckCircle className="h-3 w-3" />
													Actif
												</Badge>
											)}
										</div>
									</div>
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
						</div>
					)}

					{/* Section Liste des Utilisateurs - Affichée seulement si aucun utilisateur n'est sélectionné */}
					{!selectedUser && (
						<>
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
											{/* État du compte - toujours visible */}
											{user.is_banned ? (
												<Badge className="bg-red-100 text-red-800 flex items-center gap-1">
													<AlertTriangle className="h-3 w-3" />
													Suspendu
												</Badge>
											) : (
												<Badge className="bg-green-100 text-green-800 flex items-center gap-1">
													<CheckCircle className="h-3 w-3" />
													Actif
												</Badge>
											)}
										</div>
										<div className="text-sm text-muted-foreground space-y-1">
											{user.email && <p>Email: {user.email}</p>}
											{user.phone && <p>Téléphone: {user.phone}</p>}
											<p>Inscrit le: {new Date(user.created_at).toLocaleDateString('fr-FR')}</p>
										</div>
									</div>

									<div className="flex flex-col sm:flex-row gap-2">
										<Button variant="outline" size="sm" onClick={() => handleUserDetails(user)}>
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
										
										{/* Boutons de suspension et réactivation - toujours visibles côte à côte */}
										<div className="flex gap-1">
											<Button 
												variant="destructive" 
												size="sm" 
												onClick={() => openConfirmDialog('suspend', user)}
												className="flex items-center gap-1"
												title="Suspendre le compte"
												disabled={user.is_banned}
											>
												<Ban className="h-3 w-3" />
												Suspendre
											</Button>
											<Button 
												size="sm" 
												onClick={() => openConfirmDialog('reactivate', user)}
												className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
												title="Réactiver le compte"
												disabled={!user.is_banned}
											>
												<Unlock className="h-3 w-3" />
												Réactiver
											</Button>
										</div>
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
						</>
					)}
					</CardContent>
				</Card>

				{/* Popup de confirmation */}
				<AlertDialog open={confirmDialog.open} onOpenChange={closeConfirmDialog}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								{confirmDialog.action === 'suspend' ? 'Suspendre l\'utilisateur' : 'Réactiver l\'utilisateur'}
							</AlertDialogTitle>
							<AlertDialogDescription>
								{confirmDialog.action === 'suspend' 
									? `Êtes-vous sûr de vouloir suspendre ${confirmDialog.user?.first_name} ${confirmDialog.user?.last_name} ? Cette action peut être annulée à tout moment.`
									: `Êtes-vous sûr de vouloir réactiver le compte de ${confirmDialog.user?.first_name} ${confirmDialog.user?.last_name} ?`
								}
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={confirmDialog.loading}>
								Annuler
							</AlertDialogCancel>
							<AlertDialogAction 
								onClick={executeAction}
								disabled={confirmDialog.loading}
								className={confirmDialog.action === 'suspend' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
							>
								{confirmDialog.loading ? (
									<LoadingSpinner size="sm" />
								) : (
									<>
										{confirmDialog.action === 'suspend' ? (
											<>
												<Ban className="h-4 w-4 mr-2" />
												Suspendre
											</>
										) : (
											<>
												<Unlock className="h-4 w-4 mr-2" />
												Réactiver
											</>
										)}
									</>
								)}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
		</div>
	);
}


