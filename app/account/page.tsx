import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";

export default async function AccountPage() {
	const session = await auth();
	if (!session?.user) {
		return (
			<div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
				<h1 className="text-xl font-semibold mb-4">Mon compte</h1>
				<form action={async () => {
					"use server";
					await signIn();
				}}>
					<button className="rounded-md border px-4 py-2 text-sm">Se connecter</button>
				</form>
			</div>
		);
	}
	return (
		<div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
			<h1 className="text-xl font-semibold mb-4">Mon compte</h1>
			<div className="grid gap-3 md:grid-cols-2">
				<Link href="/orders" className="rounded-md border p-4 text-sm">Commandes</Link>
				<Link href="/addresses" className="rounded-md border p-4 text-sm">Adresses</Link>
				<Link href="/account/details" className="rounded-md border p-4 text-sm">Détails du compte</Link>
				<form action={async () => {
					"use server";
					await signOut();
				}}>
					<button className="rounded-md border px-4 py-2 text-sm">Se déconnecter</button>
				</form>
			</div>
		</div>
	);
}


