import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createServiceSupabaseClient } from '@/lib/supabase';
import { z } from 'zod';

export const runtime = 'nodejs';

// Schéma de validation pour une ligne de produit CSV
const ProductCsvSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, 'Le nom est requis'),
	description: z.string().optional(),
	price_cents: z.coerce.number().min(0, 'Le prix doit être positif'),
	old_price_cents: z.coerce.number().min(0).optional(),
	image_url: z.string().url().optional().or(z.literal('')),
	is_featured: z.enum(['Oui', 'Non', 'oui', 'non', 'true', 'false', '1', '0']).optional(),
	stock: z.coerce.number().min(0, 'Le stock doit être positif'),
	category_id: z.string().min(1, 'La catégorie est requise'),
	subcategory_id: z.string().optional(),
	brand_id: z.string().optional(),
});

// Type pour le produit après validation et conversion
type ValidatedProduct = Omit<z.infer<typeof ProductCsvSchema>, 'is_featured'> & {
	is_featured: boolean;
};

export async function POST(request: NextRequest) {
	try {
		// Vérifier l'authentification
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		// Vérifier les permissions admin
		const supabase = createServiceSupabaseClient();
		const { data: role } = await supabase.rpc('get_user_role', { _user_id: session.user.id });
		if (role !== 'admin') {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		// Récupérer le fichier CSV
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
		}

		if (!file.name.endsWith('.csv')) {
			return NextResponse.json({ error: 'Le fichier doit être au format CSV' }, { status: 400 });
		}

		// Lire le contenu du fichier
		const text = await file.text();
		const lines = text.split('\n').filter(line => line.trim());

		if (lines.length < 2) {
			return NextResponse.json({ error: 'Le fichier CSV doit contenir au moins un en-tête et une ligne de données' }, { status: 400 });
		}

		// Parser l'en-tête
		const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
		const dataLines = lines.slice(1);

		// Valider et traiter chaque ligne
		const products = [];
		const errors = [];

		for (let i = 0; i < dataLines.length; i++) {
			const line = dataLines[i];
			if (!line.trim()) continue;

			try {
				// Parser la ligne CSV (gestion des virgules dans les champs)
				const values = parseCsvLine(line);
				
				if (values.length !== headers.length) {
					errors.push(`Ligne ${i + 2}: Nombre de colonnes incorrect (${values.length} au lieu de ${headers.length})`);
					continue;
				}

				// Créer l'objet produit
				const productData: any = {};
				headers.forEach((header, index) => {
					productData[header] = values[index]?.trim() || '';
				});

				// Valider avec Zod
				const validatedProduct = ProductCsvSchema.parse(productData);

				// Convertir les valeurs booléennes
				const isFeatured = validatedProduct.is_featured ? 
					['oui', 'true', '1'].includes(validatedProduct.is_featured.toLowerCase()) : 
					false;

				// Créer l'objet final avec le bon type
				const finalProduct: ValidatedProduct = {
					id: validatedProduct.id,
					name: validatedProduct.name,
					description: validatedProduct.description,
					price_cents: validatedProduct.price_cents,
					old_price_cents: validatedProduct.old_price_cents,
					image_url: validatedProduct.image_url,
					stock: validatedProduct.stock,
					category_id: validatedProduct.category_id,
					subcategory_id: validatedProduct.subcategory_id,
					brand_id: validatedProduct.brand_id,
					is_featured: isFeatured
				};

				// Convertir les prix en centimes si nécessaire
				if (finalProduct.price_cents < 1000) {
					finalProduct.price_cents *= 100; // Supposer que c'est en euros
				}

				if (finalProduct.old_price_cents && finalProduct.old_price_cents < 1000) {
					finalProduct.old_price_cents *= 100;
				}

				products.push(finalProduct);
			} catch (error) {
				if (error instanceof z.ZodError) {
					errors.push(`Ligne ${i + 2}: ${error.issues.map(e => e.message).join(', ')}`);
				} else {
					errors.push(`Ligne ${i + 2}: Erreur de parsing`);
				}
			}
		}

		// Si il y a des erreurs, les retourner
		if (errors.length > 0) {
			return NextResponse.json({ 
				error: 'Erreurs de validation', 
				details: errors,
				validProducts: products.length 
			}, { status: 400 });
		}

		// Insérer les produits dans la base de données
		const { data: insertedProducts, error: insertError } = await supabase
			.from('products')
			.upsert(products, { 
				onConflict: 'id',
				ignoreDuplicates: false 
			})
			.select();

		if (insertError) {
			console.error('Erreur lors de l\'insertion:', insertError);
			return NextResponse.json({ 
				error: 'Erreur lors de l\'insertion en base de données',
				details: insertError.message 
			}, { status: 500 });
		}

		return NextResponse.json({
			message: 'Import réussi',
			imported: products.length,
			products: insertedProducts
		});

	} catch (error) {
		console.error('Erreur lors de l\'import:', error);
		return NextResponse.json({ 
			error: 'Erreur interne du serveur',
			details: error instanceof Error ? error.message : 'Erreur inconnue'
		}, { status: 500 });
	}
}

// Fonction pour parser une ligne CSV en gérant les virgules dans les champs
function parseCsvLine(line: string): string[] {
	const values: string[] = [];
	let current = '';
	let inQuotes = false;
	
	for (let i = 0; i < line.length; i++) {
		const char = line[i];
		
		if (char === '"') {
			inQuotes = !inQuotes;
		} else if (char === ',' && !inQuotes) {
			values.push(current);
			current = '';
		} else {
			current += char;
		}
	}
	
	values.push(current);
	return values.map(v => v.trim().replace(/^"|"$/g, ''));
}
