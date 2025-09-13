"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
	Package, 
	Save, 
	XCircle,
	CheckCircle,
	AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { formatCFA } from "@/lib/utils/price-utils";
import { ImageUpload } from "@/components/ui/ImageUpload";

interface Product {
	id: string;
	name: string;
	description?: string | null;
	priceCents: number;
	oldPriceCents?: number | null;
	imageUrl?: string | null;
	isFeatured: boolean;
	stock: number;
	categoryId: string;
	subcategoryId?: string | null;
	brandId?: string | null;
	rating?: number | null;
}

interface Taxonomy {
	categories: Array<{ id: string; name: string; slug: string }>;
	subcategories: Array<{ id: string; name: string; slug: string; categoryId: string }>;
	brands: Array<{ id: string; name: string; slug: string }>;
}

interface ProductFormProps {
	product?: Product | null;
	taxonomy: Taxonomy | null;
	onSave: (product: Partial<Product>) => Promise<void>;
	onCancel: () => void;
}

export function ProductForm({ product, taxonomy, onSave, onCancel }: ProductFormProps) {
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [formData, setFormData] = useState<Partial<Product>>({
		name: '',
		description: '',
		priceCents: 0,
		oldPriceCents: 0,
		imageUrl: '',
		isFeatured: false,
		stock: 0,
		categoryId: '',
		subcategoryId: null,
		brandId: null,
		rating: 0,
		...product
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	// Filtrer les sous-catégories par catégorie sélectionnée
	const filteredSubcategories = taxonomy?.subcategories.filter(
		sub => sub.categoryId === formData.categoryId
	) || [];

	// Validation du formulaire
	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.name?.trim()) {
			newErrors.name = 'Le nom du produit est requis';
		}

		if (!formData.categoryId) {
			newErrors.categoryId = 'La catégorie est requise';
		}

		if (!formData.priceCents || formData.priceCents <= 0) {
			newErrors.priceCents = 'Le prix doit être supérieur à 0';
		}

		if (!formData.stock || formData.stock < 0) {
			newErrors.stock = 'Le stock ne peut pas être négatif';
		}

		if (formData.oldPriceCents && formData.priceCents && formData.oldPriceCents <= formData.priceCents) {
			newErrors.oldPriceCents = "L'ancien prix doit être supérieur au prix actuel";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Gestion des changements de formulaire
	const handleInputChange = (field: keyof Product, value: any) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		
		// Effacer l'erreur du champ modifié
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: '' }));
		}

		// Réinitialiser la sous-catégorie si la catégorie change
		if (field === 'categoryId') {
			setFormData(prev => ({ ...prev, subcategoryId: null }));
		}
	};



	// Sauvegarder le produit
	const handleSave = async () => {
		if (!validateForm()) {
			toast({ 
				title: 'Erreur de validation', 
				description: 'Veuillez corriger les erreurs dans le formulaire', 
				variant: 'error' 
			});
			return;
		}

		// Afficher le popup de confirmation pour la modification
		if (product) {
			setShowConfirmDialog(true);
			return;
		}

		// Pour la création, sauvegarder directement
		await performSave();
	};

	// Fonction pour effectuer la sauvegarde
	const performSave = async () => {
		setLoading(true);
		try {
			await onSave(formData);
			toast({ 
				title: 'Succès', 
				description: product ? 'Produit mis à jour' : 'Produit créé' 
			});
			setShowConfirmDialog(false);
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: 'Impossible de sauvegarder le produit', 
				variant: 'error' 
			});
		} finally {
			setLoading(false);
		}
	};

	// Calculer le pourcentage de réduction
	const discountPercentage = formData.oldPriceCents && formData.priceCents 
		? Math.round(((formData.oldPriceCents - formData.priceCents) / formData.oldPriceCents) * 100)
		: 0;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Package className="h-5 w-5" />
					{product ? 'Modifier le produit' : 'Créer un nouveau produit'}
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Informations de base */}
				<div className="space-y-4">
					<h3 className="text-lg font-medium">Informations de base</h3>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="name">Nom du produit *</Label>
							<Input
								id="name"
								placeholder="Nom du produit"
								value={formData.name || ''}
								onChange={(e) => handleInputChange('name', e.target.value)}
								className={errors.name ? 'border-red-500' : ''}
							/>
							{errors.name && (
								<p className="text-sm text-red-500 flex items-center gap-1">
									<XCircle className="h-4 w-4" />
									{errors.name}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="category">Catégorie *</Label>
							<Select 
								value={formData.categoryId} 
								onValueChange={(value) => handleInputChange('categoryId', value)}
							>
								<SelectTrigger className={errors.categoryId ? 'border-red-500' : ''}>
									<SelectValue placeholder="Sélectionner une catégorie" />
								</SelectTrigger>
								<SelectContent>
									{taxonomy?.categories.map((category) => (
										<SelectItem key={category.id} value={category.id}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.categoryId && (
								<p className="text-sm text-red-500 flex items-center gap-1">
									<XCircle className="h-4 w-4" />
									{errors.categoryId}
								</p>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							placeholder="Description détaillée du produit..."
							value={formData.description || ''}
							onChange={(e) => handleInputChange('description', e.target.value)}
							rows={4}
						/>
					</div>
				</div>

				<Separator />

				{/* Prix et stock */}
				<div className="space-y-4">
					<h3 className="text-lg font-medium">Prix et stock</h3>
					
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="price">Prix actuel (CFA) *</Label>
							<Input
								id="price"
								type="number"
								placeholder="0"
								value={formData.priceCents || ''}
								onChange={(e) => handleInputChange('priceCents', Number(e.target.value))}
								className={errors.priceCents ? 'border-red-500' : ''}
							/>
							{formData.priceCents && formData.priceCents > 0 && (
								<p className="text-sm text-muted-foreground">
									{formatCFA(formData.priceCents)}
								</p>
							)}
							{errors.priceCents && (
								<p className="text-sm text-red-500 flex items-center gap-1">
									<XCircle className="h-4 w-4" />
									{errors.priceCents}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="oldPrice">Ancien prix (CFA)</Label>
							<Input
								id="oldPrice"
								type="number"
								placeholder="0"
								value={formData.oldPriceCents || ''}
								onChange={(e) => handleInputChange('oldPriceCents', Number(e.target.value))}
								className={errors.oldPriceCents ? 'border-red-500' : ''}
							/>
							{formData.oldPriceCents && formData.oldPriceCents > 0 && (
								<div className="flex items-center gap-2">
									<Badge variant="secondary">
										-{discountPercentage}%
									</Badge>
									<p className="text-sm text-muted-foreground">
										{formatCFA(formData.oldPriceCents)}
									</p>
								</div>
							)}
							{errors.oldPriceCents && (
								<p className="text-sm text-red-500 flex items-center gap-1">
									<XCircle className="h-4 w-4" />
									{errors.oldPriceCents}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="stock">Stock *</Label>
							<Input
								id="stock"
								type="number"
								placeholder="0"
								value={formData.stock || ''}
								onChange={(e) => handleInputChange('stock', Number(e.target.value))}
								className={errors.stock ? 'border-red-500' : ''}
							/>
							{formData.stock !== undefined && (
								<div className="flex items-center gap-2">
									{formData.stock <= 5 ? (
										<Badge variant="destructive" className="text-xs">
											<AlertTriangle className="h-3 w-3 mr-1" />
											Stock faible
										</Badge>
									) : formData.stock <= 20 ? (
										<Badge variant="secondary" className="text-xs">
											Stock moyen
										</Badge>
									) : (
										<Badge variant="default" className="text-xs">
											<CheckCircle className="h-3 w-3 mr-1" />
											Stock OK
										</Badge>
									)}
								</div>
							)}
							{errors.stock && (
								<p className="text-sm text-red-500 flex items-center gap-1">
									<XCircle className="h-4 w-4" />
									{errors.stock}
								</p>
							)}
						</div>
					</div>
				</div>

				<Separator />

				{/* Catégorisation */}
				<div className="space-y-4">
					<h3 className="text-lg font-medium">Catégorisation</h3>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="subcategory">Sous-catégorie</Label>
							<Select 
								value={formData.subcategoryId || 'none'} 
								onValueChange={(value) => handleInputChange('subcategoryId', value === 'none' ? null : value)}
								disabled={!formData.categoryId}
							>
								<SelectTrigger>
									<SelectValue placeholder="Sélectionner une sous-catégorie" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="none">Aucune</SelectItem>
									{filteredSubcategories.map((subcategory) => (
										<SelectItem key={subcategory.id} value={subcategory.id}>
											{subcategory.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="brand">Marque</Label>
							<Select 
								value={formData.brandId || 'none'} 
								onValueChange={(value) => handleInputChange('brandId', value === 'none' ? null : value)}
							>
								<SelectTrigger>
									<SelectValue placeholder="Sélectionner une marque" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="none">Aucune</SelectItem>
									{taxonomy?.brands.map((brand) => (
										<SelectItem key={brand.id} value={brand.id}>
											{brand.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				<Separator />

				{/* Image du produit */}
				<div className="space-y-4">
					<h3 className="text-lg font-medium">Image du produit</h3>
					
					<ImageUpload
						value={formData.imageUrl || null}
						onChange={(url) => handleInputChange('imageUrl', url)}
						onRemove={() => handleInputChange('imageUrl', '')}
						disabled={loading}
						maxFiles={1}
						maxSize={5 * 1024 * 1024} // 5MB
						accept={['image/*']}
					/>
				</div>

				<Separator />

				{/* Options */}
				<div className="space-y-4">
					<h3 className="text-lg font-medium">Options</h3>
					
					<div className="flex items-center space-x-2">
						<Switch
							id="featured"
							checked={formData.isFeatured || false}
							onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
						/>
						<Label htmlFor="featured">Mettre en avant</Label>
					</div>
					
					{formData.isFeatured && (
						<p className="text-sm text-muted-foreground">
							Ce produit sera affiché en vedette sur la page d'accueil
						</p>
					)}
				</div>

				{/* Actions */}
				<div className="flex justify-end gap-3 pt-4">
					<Button variant="outline" onClick={onCancel} disabled={loading}>
						Annuler
					</Button>
					<Button onClick={handleSave} disabled={loading}>
						{loading ? (
							<>
								<LoadingSpinner size="sm" className="mr-2" />
								Sauvegarde...
							</>
						) : (
							<>
								<Save className="h-4 w-4 mr-2" />
								{product ? 'Mettre à jour' : 'Créer'}
							</>
						)}
					</Button>
				</div>
			</CardContent>

			{/* Popup de confirmation pour la modification */}
			{showConfirmDialog && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-md mx-4">
						<h3 className="text-lg font-semibold mb-4">Confirmer la modification</h3>
						<p className="text-gray-600 mb-6">
							Êtes-vous sûr de vouloir modifier ce produit ? Cette action ne peut pas être annulée.
						</p>
						<div className="flex justify-end gap-3">
							<Button 
								variant="outline" 
								onClick={() => setShowConfirmDialog(false)}
								disabled={loading}
							>
								Annuler
							</Button>
							<Button 
								onClick={performSave}
								disabled={loading}
							>
								{loading ? (
									<>
										<LoadingSpinner size="sm" className="mr-2" />
										Modification...
									</>
								) : (
									<>
										<Save className="h-4 w-4 mr-2" />
										Confirmer
									</>
								)}
							</Button>
						</div>
					</div>
				</div>
			)}
		</Card>
	);
}
