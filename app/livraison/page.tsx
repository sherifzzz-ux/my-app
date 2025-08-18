import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function LivraisonPage() {
	return (
		<div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
			<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Livraison" }]} className="mb-6" />
			<h1 className="text-xl font-semibold mb-4">Livraison</h1>
			<div className="prose prose-zinc max-w-none">
				<p>
					Livraison en moins de 24h à Dakar (hors dimanches et jours fériés). Pour les régions, délai indicatif 24–72h.
				</p>
				<ul>
					<li>Frais selon zone et poids</li>
					<li>Suivi disponible sur demande</li>
					<li>Emballage soigné</li>
				</ul>
			</div>
		</div>
	);
}


