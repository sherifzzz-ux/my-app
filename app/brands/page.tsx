import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default async function BrandsPage() {
	const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });
	return (
		<div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
			<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Marques" }]} className="mb-6" />
			<h1 className="text-xl font-semibold mb-4">Marques</h1>
			<ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{brands.map((b) => (
					<li key={b.id} className="rounded-xl border p-4">
						<Link href={`/catalog?brand=${b.slug}`} className="font-medium hover:underline">
							{b.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}


