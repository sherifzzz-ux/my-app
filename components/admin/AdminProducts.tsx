"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Plus, Edit, Trash2, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";

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
}

export function AdminProducts() {
	const { toast } = useToast()
	const [loading, setLoading] = useState(true)
	const [products, setProducts] = useState<Product[]>([])
	const [q, setQ] = useState('')
	const [categoryId, setCategoryId] = useState('all')
	const [subcategoryId, setSubcategoryId] = useState('all')
	const [brandId, setBrandId] = useState('all')
	const [featured, setFeatured] = useState('all')
	const [lowStock, setLowStock] = useState('false')
	const [taxo, setTaxo] = useState<{ categories: any[]; subcategories: any[]; brands: any[] } | null>(null)
	const [editing, setEditing] = useState<Product | null>(null)

	const filtered = useMemo(() => products, [products])

	const loadTaxonomy = async () => {
		const res = await fetch('/api/admin/taxonomy', { credentials: 'include' })
		if (res.ok) setTaxo(await res.json())
	}

	const loadProducts = async () => {
		setLoading(true)
		try {
			const params = new URLSearchParams()
			if (q) params.set('q', q)
			if (categoryId && categoryId !== 'all') params.set('categoryId', categoryId)
			if (subcategoryId && subcategoryId !== 'all') params.set('subcategoryId', subcategoryId)
			if (brandId && brandId !== 'all') params.set('brandId', brandId)
			if (featured) params.set('featured', featured)
			if (lowStock) params.set('lowStock', lowStock)
			const res = await fetch(`/api/admin/products?${params.toString()}`, { credentials: 'include' })
			if (!res.ok) throw new Error('load')
			setProducts(await res.json())
		} catch {
			toast({ title: 'Erreur', description: 'Impossible de charger les produits', variant: 'destructive' })
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadTaxonomy();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		loadProducts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [q, categoryId, subcategoryId, brandId, featured, lowStock])

	const saveProduct = async (payload: Partial<Product>) => {
		try {
			const res = await fetch(editing ? `/api/admin/products/${editing.id}` : '/api/admin/products', {
				method: editing ? 'PATCH' : 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(payload),
			})
			if (!res.ok) throw new Error('save')
			toast({ title: 'Succès', description: editing ? 'Produit mis à jour' : 'Produit créé' })
			setEditing(null)
			loadProducts()
		} catch {
			toast({ title: 'Erreur', description: 'Impossible de sauvegarder', variant: 'destructive' })
		}
	}

	const deleteProduct = async (id: string) => {
		if (!confirm('Supprimer ce produit ?')) return
		const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE', credentials: 'include' })
		if (res.ok) {
			toast({ title: 'Supprimé' })
			loadProducts()
		}
	}

	const exportCsv = async () => {
		const headers = ['id','name','description','priceCents','oldPriceCents','imageUrl','isFeatured','stock','categoryId','subcategoryId','brandId']
		const lines = [headers.join(',')]
		for (const p of products) {
			lines.push(headers.map((h) => JSON.stringify((p as any)[h] ?? '').replace(/^"|"$/g, '')).join(','))
		}
		const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'products.csv'
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<div className="flex justify-between items-center">
						<CardTitle>Gestion des Produits</CardTitle>
						<div className="flex gap-2">
							<Button onClick={exportCsv}><Download className="h-4 w-4 mr-2" />Exporter</Button>
							<label className="inline-flex items-center gap-2 border rounded px-3 py-2 cursor-pointer">
								<Upload className="h-4 w-4" /> Importer CSV
								<input type="file" accept=".csv" className="hidden" />
							</label>
							<Button onClick={() => setEditing({
								id: '', name: '', description: '', priceCents: 0, oldPriceCents: null, imageUrl: '', isFeatured: false, stock: 0, categoryId: '', subcategoryId: null, brandId: null,
							})}><Plus className="h-4 w-4 mr-2" />Ajouter</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{/* Filters */}
					<div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-6">
						<Input placeholder="Recherche..." value={q} onChange={(e) => setQ(e.target.value)} />
						<Select value={categoryId} onValueChange={setCategoryId}>
							<SelectTrigger><SelectValue placeholder="Catégorie" /></SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Toutes</SelectItem>
								{taxo?.categories.map((c) => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}
							</SelectContent>
						</Select>
						<Select value={subcategoryId} onValueChange={setSubcategoryId}>
							<SelectTrigger><SelectValue placeholder="Sous-catégorie" /></SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Toutes</SelectItem>
								{taxo?.subcategories.map((s) => (<SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>))}
							</SelectContent>
						</Select>
						<Select value={brandId} onValueChange={setBrandId}>
							<SelectTrigger><SelectValue placeholder="Marque" /></SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Toutes</SelectItem>
								{taxo?.brands.map((b) => (<SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>))}
							</SelectContent>
						</Select>
						<Select value={featured} onValueChange={setFeatured}>
							<SelectTrigger><SelectValue placeholder="Mise en avant" /></SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Toutes</SelectItem>
								<SelectItem value="true">En avant</SelectItem>
								<SelectItem value="false">Standard</SelectItem>
							</SelectContent>
						</Select>
						<Select value={lowStock} onValueChange={setLowStock}>
							<SelectTrigger><SelectValue placeholder="Stock" /></SelectTrigger>
							<SelectContent>
								<SelectItem value="false">Tous</SelectItem>
								<SelectItem value="true">Stock bas (&lt;= 5)</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* List */}
					<div className="space-y-2">
						{loading ? (
							<div className="py-16 text-center"><LoadingSpinner /></div>
						) : (
							filtered.map((p) => (
								<div key={p.id} className="border rounded p-4 flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="h-12 w-12 bg-muted rounded overflow-hidden">
											{p.imageUrl ? (
												<img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
											) : null}
										</div>
										<div>
											<div className="font-semibold">{p.name}</div>
											<div className="text-sm text-muted-foreground">Prix: {(p.priceCents/100).toFixed(2)} | Stock: {p.stock} {p.isFeatured ? '• En avant' : ''}</div>
										</div>
									</div>
									<div className="flex gap-2">
										<Button variant="outline" size="sm" onClick={() => setEditing(p)}><Edit className="h-4 w-4 mr-2" />Modifier</Button>
										<Button variant="destructive" size="sm" onClick={() => deleteProduct(p.id)}><Trash2 className="h-4 w-4 mr-2" />Supprimer</Button>
									</div>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>

			{/* Edit/Create form */}
			{editing && (
				<Card>
					<CardHeader>
						<CardTitle>{editing.id ? 'Modifier' : 'Créer'} un produit</CardTitle>
					</CardHeader>
					<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Input placeholder="Nom" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
						<Input placeholder="Image URL" value={editing.imageUrl || ''} onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })} />
						<Input placeholder="Prix (CFA)" type="number" value={editing.priceCents} onChange={(e) => setEditing({ ...editing, priceCents: Number(e.target.value) })} />
						<Input placeholder="Ancien prix (CFA)" type="number" value={editing.oldPriceCents ?? 0} onChange={(e) => setEditing({ ...editing, oldPriceCents: Number(e.target.value) })} />
						<Input placeholder="Stock" type="number" value={editing.stock} onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })} />
						<Select value={editing.categoryId} onValueChange={(v) => setEditing({ ...editing, categoryId: v })}>
							<SelectTrigger><SelectValue placeholder="Catégorie" /></SelectTrigger>
							<SelectContent>
								{taxo?.categories.map((c) => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}
							</SelectContent>
						</Select>
						<Select value={editing.subcategoryId ?? 'none'} onValueChange={(v) => setEditing({ ...editing, subcategoryId: v === 'none' ? null : v })}>
							<SelectTrigger><SelectValue placeholder="Sous-catégorie" /></SelectTrigger>
							<SelectContent>
								<SelectItem value="none">Aucune</SelectItem>
								{taxo?.subcategories.map((s) => (<SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>))}
							</SelectContent>
						</Select>
						<Select value={editing.brandId ?? 'none'} onValueChange={(v) => setEditing({ ...editing, brandId: v === 'none' ? null : v })}>
							<SelectTrigger><SelectValue placeholder="Marque" /></SelectTrigger>
							<SelectContent>
								<SelectItem value="none">Aucune</SelectItem>
								{taxo?.brands.map((b) => (<SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>))}
							</SelectContent>
						</Select>
						<div className="col-span-1 md:col-span-2 flex gap-2">
							<Button onClick={() => saveProduct(editing!)}>{editing.id ? 'Mettre à jour' : 'Créer'}</Button>
							<Button variant="outline" onClick={() => setEditing(null)}>Annuler</Button>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	)
}


