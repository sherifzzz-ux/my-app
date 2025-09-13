"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
	Plus, 
	Edit, 
	Trash2, 
	Search, 
	X,
	Save,
	ShoppingCart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface Category {
	id: string;
	name: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
	imageUrl?: string;
}

export function CategoriesPage() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		slug: "",
		imageUrl: ""
	});
	const { toast } = useToast();

	// Charger les catégories
	const loadCategories = async () => {
		setLoading(true);
		try {
			const res = await fetch('/api/admin/taxonomy', { credentials: 'include' });
			if (res.ok) {
				const data = await res.json();
				setCategories(data.categories || []);
			} else {
				throw new Error('Erreur lors du chargement des catégories');
			}
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: 'Impossible de charger les catégories', 
				variant: 'error' 
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCategories();
	}, []);

	// Filtrer les catégories
	const filteredCategories = categories.filter(category =>
		category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		category.slug.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Gérer les changements de formulaire
	const handleInputChange = (field: string, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		
		// Générer automatiquement le slug à partir du nom
		if (field === 'name') {
			const slug = value.toLowerCase()
				.replace(/[^a-z0-9\s-]/g, '')
				.replace(/\s+/g, '-')
				.replace(/-+/g, '-')
				.trim();
			setFormData(prev => ({ ...prev, slug }));
		}
	};

	// Sauvegarder une catégorie
	const saveCategory = async () => {
		if (!formData.name.trim()) {
			toast({ 
				title: 'Erreur', 
				description: 'Le nom de la catégorie est requis', 
				variant: 'error' 
			});
			return;
		}

		try {
			const res = await fetch(
				editingCategory ? `/api/admin/categories/${editingCategory.id}` : '/api/admin/categories',
				{
					method: editingCategory ? 'PATCH' : 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify(formData),
				}
			);

			if (!res.ok) throw new Error('Erreur lors de la sauvegarde');

			toast({ 
				title: 'Succès', 
				description: editingCategory ? 'Catégorie mise à jour' : 'Catégorie créée' 
			});

			setEditingCategory(null);
			setShowForm(false);
			setFormData({ name: "", slug: "", imageUrl: "" });
			await loadCategories();
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: 'Impossible de sauvegarder la catégorie', 
				variant: 'error' 
			});
		}
	};

	// Supprimer une catégorie
	const deleteCategory = async (id: string) => {
		if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est irréversible.')) {
			return;
		}

		try {
			const res = await fetch(`/api/admin/categories/${id}`, { 
				method: 'DELETE', 
				credentials: 'include' 
			});

			if (res.ok) {
				toast({ title: 'Succès', description: 'Catégorie supprimée' });
				await loadCategories();
			} else {
				throw new Error('Erreur lors de la suppression');
			}
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: 'Impossible de supprimer la catégorie', 
				variant: 'error' 
			});
		}
	};

	// Éditer une catégorie
	const editCategory = (category: Category) => {
		setEditingCategory(category);
		setFormData({
			name: category.name,
			slug: category.slug,
			imageUrl: category.imageUrl || ""
		});
		setShowForm(true);
	};

	// Annuler l'édition
	const cancelEdit = () => {
		setEditingCategory(null);
		setShowForm(false);
		setFormData({ name: "", slug: "", imageUrl: "" });
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
					<h2 className="text-2xl font-bold">Gestion des Catégories</h2>
					<p className="text-muted-foreground">Gérez les catégories de vos produits</p>
				</div>
				<Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
					<Plus className="h-4 w-4" />
					Nouvelle Catégorie
				</Button>
			</div>

			{/* Formulaire */}
			{showForm && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<ShoppingCart className="h-5 w-5" />
							{editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="name">Nom de la catégorie *</Label>
								<Input
									id="name"
									value={formData.name}
									onChange={(e) => handleInputChange('name', e.target.value)}
									placeholder="Nom de la catégorie"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="slug">Slug</Label>
								<Input
									id="slug"
									value={formData.slug}
									onChange={(e) => handleInputChange('slug', e.target.value)}
									placeholder="slug-de-la-categorie"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="imageUrl">URL de l'image</Label>
							<Input
								id="imageUrl"
								value={formData.imageUrl}
								onChange={(e) => handleInputChange('imageUrl', e.target.value)}
								placeholder="https://example.com/category.png"
							/>
						</div>
						<div className="flex justify-end gap-3">
							<Button variant="outline" onClick={cancelEdit}>
								Annuler
							</Button>
							<Button onClick={saveCategory} className="flex items-center gap-2">
								<Save className="h-4 w-4" />
								{editingCategory ? 'Mettre à jour' : 'Créer'}
							</Button>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Barre de recherche */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1 max-w-md">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
					<Input
						placeholder="Rechercher une catégorie..."
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

			{/* Liste des catégories */}
			<Card>
				<CardHeader>
					<CardTitle>Catégories ({filteredCategories.length})</CardTitle>
				</CardHeader>
				<CardContent>
					{filteredCategories.length === 0 ? (
						<div className="text-center py-8 text-muted-foreground">
							{searchTerm ? 'Aucune catégorie trouvée' : 'Aucune catégorie créée'}
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{filteredCategories.map((category) => (
								<div key={category.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<h3 className="font-semibold text-lg">{category.name}</h3>
											<p className="text-sm text-muted-foreground mb-2">{category.slug}</p>
											{category.imageUrl && (
												<div className="w-16 h-16 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
													<ShoppingCart className="h-8 w-8 text-gray-400" />
												</div>
											)}
											<p className="text-xs text-muted-foreground">
												Créée le {new Date(category.createdAt).toLocaleDateString('fr-FR')}
											</p>
										</div>
										<div className="flex gap-2">
											<Button
												variant="outline"
												size="sm"
												onClick={() => editCategory(category)}
											>
												<Edit className="h-4 w-4" />
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() => deleteCategory(category.id)}
												className="text-red-600 hover:text-red-700"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
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
