"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProductForm } from "./ProductForm";
import { ProductList } from "./ProductList";

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
	category?: { name: string };
	subcategory?: { name: string };
	brand?: { name: string };
}

interface Taxonomy {
	categories: Array<{ id: string; name: string; slug: string }>;
	subcategories: Array<{ id: string; name: string; slug: string; categoryId: string }>;
	brands: Array<{ id: string; name: string; slug: string }>;
}

export function AdminProducts() {
	const { toast } = useToast();
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState<Product[]>([]);
	const [taxonomy, setTaxonomy] = useState<Taxonomy | null>(null);
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);
	const [viewingProduct, setViewingProduct] = useState<string | null>(null);

	// Charger la taxonomie
	const loadTaxonomy = async () => {
		try {
			const res = await fetch('/api/admin/taxonomy', { credentials: 'include' });
			if (res.ok) {
				const data = await res.json();
				setTaxonomy(data);
			} else {
				throw new Error('Erreur lors du chargement de la taxonomie');
			}
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: 'Impossible de charger la taxonomie', 
				variant: 'error' 
			});
		}
	};

	// Charger les produits
	const loadProducts = async () => {
		setLoading(true);
		try {
			const res = await fetch('/api/admin/products', { credentials: 'include' });
			if (!res.ok) throw new Error('Erreur lors du chargement des produits');
			
			const data = await res.json();
			setProducts(data);
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: 'Impossible de charger les produits', 
				variant: 'error' 
			});
		} finally {
			setLoading(false);
		}
	};

	// Sauvegarder un produit
	const saveProduct = async (productData: Partial<Product>) => {
		try {
			// Transformer les données pour correspondre à l'API
			const apiData = {
				name: productData.name,
				description: productData.description,
				priceCents: productData.priceCents,
				oldPriceCents: productData.oldPriceCents,
				imageUrl: productData.imageUrl,
				isFeatured: productData.isFeatured,
				stock: productData.stock,
				categoryId: productData.categoryId,
				subcategoryId: productData.subcategoryId,
				brandId: productData.brandId,
				rating: productData.rating,
			};

			const res = await fetch(
				editingProduct?.id ? `/api/admin/products/${editingProduct.id}` : '/api/admin/products', 
				{
					method: editingProduct?.id ? 'PUT' : 'POST', // CORRIGÉ : PATCH → PUT
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify(apiData),
				}
			);

			if (!res.ok) {
				const errorData = await res.json().catch(() => ({}));
				throw new Error(errorData.error || 'Erreur lors de la sauvegarde');
			}

			toast({ 
				title: 'Succès', 
				description: editingProduct ? 'Produit mis à jour' : 'Produit créé' 
			});

			setEditingProduct(null);
			await loadProducts();
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: error instanceof Error ? error.message : 'Impossible de sauvegarder le produit', 
				variant: 'error' 
			});
			throw error;
		}
	};

	// Supprimer un produit
	const deleteProduct = async (id: string) => {
		if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.')) {
			return;
		}

		try {
			const res = await fetch(`/api/admin/products/${id}`, { 
				method: 'DELETE', 
				credentials: 'include' 
			});

			if (res.ok) {
				toast({ title: 'Succès', description: 'Produit supprimé' });
				await loadProducts();
			} else {
				throw new Error('Erreur lors de la suppression');
			}
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: 'Impossible de supprimer le produit', 
				variant: 'error' 
			});
		}
	};

	// Exporter en CSV
	const exportCsv = async () => {
		try {
			const headers = [
				'ID', 'Nom', 'Description', 'Prix (CFA)', 'Ancien Prix (CFA)', 
				'Image URL', 'En avant', 'Stock', 'Catégorie ID', 'Sous-catégorie ID', 'Marque ID'
			];
			
			const csvContent = [
				headers.join(','),
				...products.map(product => [
					product.id,
					`"${product.name}"`,
					`"${product.description || ''}"`,
					product.priceCents,
					product.oldPriceCents || '',
					product.imageUrl || '',
					product.isFeatured ? 'Oui' : 'Non',
					product.stock,
					product.categoryId,
					product.subcategoryId || '',
					product.brandId || ''
				].join(','))
			].join('\n');

			const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
			const link = document.createElement('a');
			const url = URL.createObjectURL(blob);
			link.setAttribute('href', url);
			link.setAttribute('download', `produits_${new Date().toISOString().split('T')[0]}.csv`);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			toast({ title: 'Succès', description: 'Export CSV terminé' });
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: 'Erreur lors de l\'export CSV', 
				variant: 'error' 
			});
		}
	};

	// Importer depuis CSV
	const importCsv = async (file: File) => {
		try {
			const formData = new FormData();
			formData.append('file', file);

			const res = await fetch('/api/admin/products/import', {
				method: 'POST',
				credentials: 'include',
				body: formData,
			});

			if (res.ok) {
				toast({ title: 'Succès', description: 'Import CSV terminé' });
				await loadProducts();
			} else {
				throw new Error('Erreur lors de l\'import');
			}
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: 'Erreur lors de l\'import CSV', 
				variant: 'error' 
			});
		}
	};

	// Voir un produit
	const viewProduct = (id: string) => {
		setViewingProduct(id);
		// TODO: Implémenter la vue détaillée du produit
		// Pour l'instant, on peut rediriger vers la page publique du produit
		window.open(`/product/${id}`, '_blank');
	};

	// Corriger les images manquantes
	const fixImages = async () => {
		try {
			const res = await fetch('/api/admin/fix-images', {
				method: 'POST',
				credentials: 'include',
			});

			if (!res.ok) throw new Error('Erreur lors de la correction des images');
			
			const data = await res.json();
			
			toast({ 
				title: 'Succès', 
				description: `${data.results?.length || 0} images corrigées`,
			});
			
			// Recharger les produits pour voir les changements
			await loadProducts();
		} catch (error) {
			toast({ 
				title: 'Erreur', 
				description: 'Impossible de corriger les images', 
				variant: 'error' 
			});
		}
	};

	// Charger les données au montage
	useEffect(() => {
		loadTaxonomy();
		loadProducts();
	}, []);

	// Si on est en mode édition, afficher le formulaire
	if (editingProduct !== null) {
		return (
			<ProductForm
				product={editingProduct}
				taxonomy={taxonomy}
				onSave={saveProduct}
				onCancel={() => setEditingProduct(null)}
			/>
		);
	}

	return (
		<div className="space-y-6">
			<ProductList
				products={products}
				taxonomy={taxonomy}
				loading={loading}
				onEdit={setEditingProduct}
				onDelete={deleteProduct}
				onView={viewProduct}
				onExport={exportCsv}
				onImport={importCsv}
				onFixImages={fixImages}
			/>
		</div>
	);
}


