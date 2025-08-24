"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type General = {
	site_name: string;
	currency: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	country: string;
	free_shipping_threshold: number;
}

type ShippingMethod = {
	id: string;
	name: string;
	description: string | null;
	price: number;
	estimated_days_min: number | null;
	estimated_days_max: number | null;
	is_active: boolean;
}

export function AdminSettings() {
	const { toast } = useToast()
	const [loading, setLoading] = useState(true)
	const [general, setGeneral] = useState<General>({ site_name: '', currency: 'XOF', email: '', phone: '', address: '', city: '', country: 'SN', free_shipping_threshold: 0 })
	const [shipping, setShipping] = useState<ShippingMethod[]>([])

	const loadAll = async () => {
		setLoading(true)
		try {
			const [gRes, eRes] = await Promise.all([
				fetch('/api/admin/settings/general', { credentials: 'include' }),
				fetch('/api/admin/settings/ecommerce', { credentials: 'include' })
			])
			if (gRes.ok) setGeneral(await gRes.json())
			if (eRes.ok) {
				const e = await eRes.json()
				setGeneral((prev) => ({ ...prev, free_shipping_threshold: e.free_shipping_threshold ?? prev.free_shipping_threshold }))
				setShipping(e.shipping_methods || [])
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => { loadAll() }, [])

	const saveGeneral = async () => {
		const res = await fetch('/api/admin/settings/general', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(general) })
		if (res.ok) toast({ title: 'Sauvegardé', description: 'Paramètres généraux mis à jour' })
	}

	const saveEcommerce = async () => {
		const res = await fetch('/api/admin/settings/ecommerce', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ free_shipping_threshold: general.free_shipping_threshold }) })
		if (res.ok) toast({ title: 'Sauvegardé', description: 'Paramètres e-commerce mis à jour' })
	}

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Configuration Générale</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input placeholder="Nom du site" value={general.site_name} onChange={(e) => setGeneral({ ...general, site_name: e.target.value })} />
					<Input placeholder="Devise (ex: XOF)" value={general.currency} onChange={(e) => setGeneral({ ...general, currency: e.target.value })} />
					<Input placeholder="Email" value={general.email} onChange={(e) => setGeneral({ ...general, email: e.target.value })} />
					<Input placeholder="Téléphone" value={general.phone} onChange={(e) => setGeneral({ ...general, phone: e.target.value })} />
					<Input placeholder="Adresse" value={general.address} onChange={(e) => setGeneral({ ...general, address: e.target.value })} />
					<Input placeholder="Ville" value={general.city} onChange={(e) => setGeneral({ ...general, city: e.target.value })} />
					<Input placeholder="Pays" value={general.country} onChange={(e) => setGeneral({ ...general, country: e.target.value })} />
					<div className="col-span-1 md:col-span-2">
						<Button onClick={saveGeneral}>Sauvegarder</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Paramètres E-commerce</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input placeholder="Seuil de livraison gratuite (CFA)" type="number" value={general.free_shipping_threshold} onChange={(e) => setGeneral({ ...general, free_shipping_threshold: Number(e.target.value) })} />
					<div className="col-span-1 md:col-span-2">
						<Button onClick={saveEcommerce}>Sauvegarder</Button>
					</div>
					<div className="col-span-1 md:col-span-2">
						<p className="text-sm text-muted-foreground">Méthodes d'expédition configurées: {shipping.length}</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}


