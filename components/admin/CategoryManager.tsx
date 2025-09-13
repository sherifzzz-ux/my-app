"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
	FolderOpen, 
	Folder, 
	Plus, 
	Edit, 
	Trash2, 
	Save, 
	X,
	ChevronRight,
	ChevronDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface Category {
	id: string;
	name: string;
	slug: string;
	image_url?: string | null;
	created_at: string;
	updated_at: string;
	subcategories?: Subcategory[];
}

interface Subcategory {
	id: string;
	name: string;
	slug: string;
	category_id: string;
	created_at: string;
	updated_at: string;
}

interface CategoryManagerProps {
	onCategoryChange?: () => void;
}

export function CategoryManager({ onCategoryChange }: CategoryManagerProps) {
	const { toast } = useToast();
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState<Category[]>([]);
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);
	const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
	const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

	// Charger les catégories et sous-catégories
	const loadCategories = async () => {
		setLoading(true);
		try {
			const res = await fetch('/api/admin/taxonomy', { credentials: 'include' });
			if (res.ok) {
				const data = await res.json();
				
				// Organiser les données avec les sous-catégories groupées par catégorie
				const organizedCategories = data.categories.map((cat: Category) => ({
					...cat,
					subcategories: data.subcategories.filter((sub: Subcategory) => sub.category_id === cat.id)
				}));
				
				setCategories(organizedCategories);
			} else {
				throw new Error('Erreur lors du chargement');
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

	// Sauvegarder une catégorie
	const saveCategory = async (categoryData: Partial<Category>) => {
		try {
			const res = await fetch(
				editingCategory?.id ? `/api/admin/categories/${editingCategory.id}` : '/api/admin/categories',
				{
					method: editingCategory?.id ? 'PATCH' : 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify(categoryData),
				}
			);

			if (!res.ok) throw new Error('Erreur lors de la sauvegarde');

			toast({ 
				title: 'Succès', 
				description: editingCategory ? 'Catégorie mise à jour' : 'Catégorie créée' 
			});

			setEditingCategory(null);
			await loadCategories();
			onCategoryChange?.();
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: 'Impossible de sauvegarder la catégorie', 
				variant: 'error' 
			});
		}
	};

	// Sauvegarder une sous-catégorie
	const saveSubcategory = async (subcategoryData: Partial<Subcategory>) => {
		try {
			const res = await fetch(
				editingSubcategory?.id ? `/api/admin/subcategories/${editingSubcategory.id}` : '/api/admin/subcategories',
				{
					method: editingSubcategory?.id ? 'PATCH' : 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify(subcategoryData),
				}
			);

			if (!res.ok) throw new Error('Erreur lors de la sauvegarde');

			toast({ 
				title: 'Succès', 
				description: editingSubcategory ? 'Sous-catégorie mise à jour' : 'Sous-catégorie créée' 
			});

			setEditingSubcategory(null);
			await loadCategories();
			onCategoryChange?.();
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: 'Impossible de sauvegarder la sous-catégorie', 
				variant: 'error' 
			});
		}
	};

	// Supprimer une catégorie
	const deleteCategory = async (id: string) => {
		if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ? Toutes les sous-catégories et produits associés seront également supprimés.')) {
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
				onCategoryChange?.();
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

	// Supprimer une sous-catégorie
	const deleteSubcategory = async (id: string) => {
		if (!confirm('Êtes-vous sûr de vouloir supprimer cette sous-catégorie ? Tous les produits associés seront également supprimés.')) {
			return;
		}

		try {
			const res = await fetch(`/api/admin/subcategories/${id}`, { 
				method: 'DELETE', 
				credentials: 'include' 
			});

			if (res.ok) {
				toast({ title: 'Succès', description: 'Sous-catégorie supprimée' });
				await loadCategories();
				onCategoryChange?.();
			} else {
				throw new Error('Erreur lors de la suppression');
			}
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: 'Impossible de supprimer la sous-catégorie', 
				variant: 'error' 
			});
		}
	};

	// Basculer l'expansion d'une catégorie
	const toggleCategory = (categoryId: string) => {
		const newExpanded = new Set(expandedCategories);
		if (newExpanded.has(categoryId)) {
			newExpanded.delete(categoryId);
		} else {
			newExpanded.add(categoryId);
		}
		setExpandedCategories(newExpanded);
	};

	// Charger les données au montage
	useEffect(() => {
		loadCategories();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center py-16">
				<LoadingSpinner size="lg" />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* En-tête avec bouton d'ajout */}
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Gestion des Catégories</h2>
				<Button onClick={() => setEditingCategory({} as Category)}>
					<Plus className="h-4 w-4 mr-2" />
					Nouvelle Catégorie
				</Button>
			</div>

			{/* Formulaire de catégorie */}
			{editingCategory && (
				<Card>
					<CardHeader>
						<CardTitle>
							{editingCategory.id ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<CategoryForm
							category={editingCategory}
							onSave={saveCategory}
							onCancel={() => setEditingCategory(null)}
						/>
					</CardContent>
				</Card>
			)}

			{/* Formulaire de sous-catégorie */}
			{editingSubcategory && (
				<Card>
					<CardHeader>
						<CardTitle>
							{editingSubcategory.id ? 'Modifier la sous-catégorie' : 'Nouvelle sous-catégorie'}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<SubcategoryForm
							subcategory={editingSubcategory}
							categories={categories}
							onSave={saveSubcategory}
							onCancel={() => setEditingSubcategory(null)}
						/>
					</CardContent>
				</Card>
			)}

			{/* Liste des catégories */}
			<div className="space-y-4">
				{categories.map((category) => (
					<Card key={category.id}>
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<Button
										variant="ghost"
										size="sm"
										onClick={() => toggleCategory(category.id)}
									>
										{expandedCategories.has(category.id) ? (
											<ChevronDown className="h-4 w-4" />
										) : (
											<ChevronRight className="h-4 w-4" />
										)}
									</Button>
									
									<FolderOpen className="h-5 w-5 text-blue-500" />
									<div>
										<h3 className="font-semibold">{category.name}</h3>
										<p className="text-sm text-muted-foreground">
											Slug: {category.slug}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-2">
									<Badge variant="secondary">
										{category.subcategories?.length || 0} sous-catégorie(s)
									</Badge>
									
									<Button
										variant="outline"
										size="sm"
										onClick={() => setEditingSubcategory({
											id: '',
											name: '',
											slug: '',
											category_id: category.id,
										} as Subcategory)}
									>
										<Plus className="h-4 w-4 mr-2" />
										Sous-catégorie
									</Button>
									
									<Button
										variant="outline"
										size="sm"
										onClick={() => setEditingCategory(category)}
									>
										<Edit className="h-4 w-4 mr-2" />
									</Button>
									
									<Button
										variant="destructive"
										size="sm"
										onClick={() => deleteCategory(category.id)}
									>
										<Trash2 className="h-4 w-4 mr-2" />
									</Button>
								</div>
							</div>
						</CardHeader>

						{/* Sous-catégories */}
						{expandedCategories.has(category.id) && (
							<CardContent className="pt-0">
								<div className="space-y-2">
									{category.subcategories && category.subcategories.length > 0 ? (
										category.subcategories.map((subcategory) => (
											<div
												key={subcategory.id}
												className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
											>
												<div className="flex items-center gap-2">
													<Folder className="h-4 w-4 text-green-500" />
													<div>
														<p className="font-medium">{subcategory.name}</p>
														<p className="text-sm text-muted-foreground">
															Slug: {subcategory.slug}
														</p>
													</div>
												</div>

												<div className="flex items-center gap-2">
													<Button
														variant="outline"
														size="sm"
														onClick={() => setEditingSubcategory(subcategory)}
													>
														<Edit className="h-4 w-4 mr-2" />
													</Button>
													
													<Button
														variant="destructive"
														size="sm"
														onClick={() => deleteSubcategory(subcategory.id)}
													>
														<Trash2 className="h-4 w-4 mr-2" />
													</Button>
												</div>
											</div>
										))
									) : (
										<p className="text-sm text-muted-foreground text-center py-4">
											Aucune sous-catégorie
										</p>
									)}
								</div>
							</CardContent>
						)}
					</Card>
				))}
			</div>
		</div>
	);
}

// Composant formulaire pour les catégories
function CategoryForm({ 
	category, 
	onSave, 
	onCancel 
}: { 
	category: Partial<Category>; 
	onSave: (data: Partial<Category>) => Promise<void>; 
	onCancel: () => void; 
}) {
	const [formData, setFormData] = useState({
		name: category.name || '',
		slug: category.slug || '',
		image_url: category.image_url || '',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name.trim()) return;
		
		// Générer le slug si vide
		if (!formData.slug.trim()) {
			formData.slug = formData.name.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-+|-+$/g, '');
		}

		await onSave(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="name">Nom de la catégorie *</Label>
					<Input
						id="name"
						value={formData.name}
						onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
						placeholder="Nom de la catégorie"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="slug">Slug</Label>
					<Input
						id="slug"
						value={formData.slug}
						onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
						placeholder="slug-categorie"
					/>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="image_url">URL de l'image</Label>
				<Input
					id="image_url"
					value={formData.image_url}
					onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
					placeholder="https://example.com/image.jpg"
					type="url"
				/>
			</div>

			<div className="flex justify-end gap-3">
				<Button type="button" variant="outline" onClick={onCancel}>
					<X className="h-4 w-4 mr-2" />
					Annuler
				</Button>
				<Button type="submit">
					<Save className="h-4 w-4 mr-2" />
					{category.id ? 'Mettre à jour' : 'Créer'}
				</Button>
			</div>
		</form>
	);
}

// Composant formulaire pour les sous-catégories
function SubcategoryForm({ 
	subcategory, 
	categories, 
	onSave, 
	onCancel 
}: { 
	subcategory: Partial<Subcategory>; 
	categories: Category[]; 
	onSave: (data: Partial<Subcategory>) => Promise<void>; 
	onCancel: () => void; 
}) {
	const [formData, setFormData] = useState({
		name: subcategory.name || '',
		slug: subcategory.slug || '',
		category_id: subcategory.category_id || '',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name.trim() || !formData.category_id) return;
		
		// Générer le slug si vide
		if (!formData.slug.trim()) {
			formData.slug = formData.name.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-+|-+$/g, '');
		}

		await onSave(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="subcategory_name">Nom de la sous-catégorie *</Label>
					<Input
						id="subcategory_name"
						value={formData.name}
						onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
						placeholder="Nom de la sous-catégorie"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="subcategory_slug">Slug</Label>
					<Input
						id="subcategory_slug"
						value={formData.slug}
						onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
						placeholder="slug-sous-categorie"
					/>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="category_id">Catégorie parente *</Label>
				<select
					id="category_id"
					value={formData.category_id}
					onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
					className="w-full p-2 border rounded-md"
					required
					aria-label="Sélectionner une catégorie parente"
				>
					<option value="">Sélectionner une catégorie</option>
					{categories.map((cat) => (
						<option key={cat.id} value={cat.id}>
							{cat.name}
						</option>
					))}
				</select>
			</div>

			<div className="flex justify-end gap-3">
				<Button type="button" variant="outline" onClick={onCancel}>
					<X className="h-4 w-4 mr-2" />
					Annuler
				</Button>
				<Button type="submit">
					<Save className="h-4 w-4 mr-2" />
					{subcategory.id ? 'Mettre à jour' : 'Créer'}
				</Button>
			</div>
		</form>
	);
}
