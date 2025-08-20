import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const { hash } = await import('bcryptjs');
  const demoPasswordHash = await hash('password123', 10);
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'demo@mami-shop.test' },
      update: {},
      create: { email: 'demo@mami-shop.test', name: 'Demo User', password: demoPasswordHash }
    }),
    prisma.user.upsert({
      where: { email: 'alice@mami-shop.test' },
      update: {},
      create: { email: 'alice@mami-shop.test', name: 'Alice' }
    }),
    prisma.user.upsert({
      where: { email: 'bob@mami-shop.test' },
      update: {},
      create: { email: 'bob@mami-shop.test', name: 'Bob' }
    })
  ]);

  const categories = await prisma.$transaction([
    prisma.category.upsert({
      where: { slug: 't-shirts' },
      update: {},
      create: { name: 'T-shirt', slug: 't-shirts', imageUrl: '/images/c-tshirts.jpg' }
    }),
    prisma.category.upsert({
      where: { slug: 'jeans' },
      update: {},
      create: { name: 'Jeans', slug: 'jeans', imageUrl: '/images/c-jeans.jpg' }
    }),
    prisma.category.upsert({
      where: { slug: 'chaussures' },
      update: {},
      create: { name: 'Chaussures', slug: 'chaussures', imageUrl: '/images/c-shoes.jpg' }
    }),
    // Flawless categories
    prisma.category.upsert({
      where: { slug: 'soin-du-visage' },
      update: {},
      create: { name: 'Soin du visage', slug: 'soin-du-visage', imageUrl: '/woman-skincare-smile.png' }
    }),
    prisma.category.upsert({
      where: { slug: 'corps-bain' },
      update: {},
      create: { name: 'Corps & Bain', slug: 'corps-bain', imageUrl: '/woman-spa-products.png' }
    }),
    prisma.category.upsert({
      where: { slug: 'maquillage' },
      update: {},
      create: { name: 'Maquillage', slug: 'maquillage', imageUrl: '/placeholder-15xmv.png' }
    }),
    prisma.category.upsert({
      where: { slug: 'parapharmacie' },
      update: {},
      create: { name: 'Parapharmacie', slug: 'parapharmacie', imageUrl: '/cosmetic-beauty-trends.png' }
    }),
    prisma.category.upsert({
      where: { slug: 'cheveux' },
      update: {},
      create: { name: 'Cheveux', slug: 'cheveux', imageUrl: '/beautiful-hair-care.png' }
    }),
    prisma.category.upsert({
      where: { slug: 'korean-beauty' },
      update: {},
      create: { name: 'Korean Beauty', slug: 'korean-beauty', imageUrl: '/korean-beauty-products.png' }
    }),
  ]);

  const [tshirts, jeans, shoes, soinVisage, corpsBain, maquillage, parapharmacie, cheveux, koreanBeauty] = categories;

  // Marques de parapharmacie et cosmétiques
  const brands = await prisma.$transaction([
    prisma.brand.upsert({ where: { slug: 'avene' }, update: {}, create: { name: 'Avène', slug: 'avene', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'acm-laboratoire' }, update: {}, create: { name: 'ACM Laboratoire', slug: 'acm-laboratoire', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'anua' }, update: {}, create: { name: 'Anua', slug: 'anua', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'beauty-of-joseon' }, update: {}, create: { name: 'Beauty of Joseon', slug: 'beauty-of-joseon', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'bi-oil' }, update: {}, create: { name: 'Bi-Oil', slug: 'bi-oil', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'biocyte' }, update: {}, create: { name: 'Biocyte', slug: 'biocyte', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'biolane' }, update: {}, create: { name: 'Biolane', slug: 'biolane', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'bio-recherche' }, update: {}, create: { name: 'Bio Recherche', slug: 'bio-recherche', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'chateau-rouge' }, update: {}, create: { name: 'Château Rouge', slug: 'chateau-rouge', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'cerave' }, update: {}, create: { name: 'CeraVe', slug: 'cerave', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'ducray' }, update: {}, create: { name: 'Ducray', slug: 'ducray', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'eafit' }, update: {}, create: { name: 'Eafit', slug: 'eafit', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'eucerin' }, update: {}, create: { name: 'Eucerin', slug: 'eucerin', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'granions' }, update: {}, create: { name: 'Granions', slug: 'granions', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'laneige' }, update: {}, create: { name: 'Laneige', slug: 'laneige', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'klorane' }, update: {}, create: { name: 'Klorane', slug: 'klorane', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'la-roche-posay' }, update: {}, create: { name: 'La Roche-Posay', slug: 'la-roche-posay', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'nuhanciam' }, update: {}, create: { name: 'Nuhanciam', slug: 'nuhanciam', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'caudalie' }, update: {}, create: { name: 'Caudalie', slug: 'caudalie', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'mixa' }, update: {}, create: { name: 'Mixa', slug: 'mixa', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'nivea' }, update: {}, create: { name: 'NIVEA', slug: 'nivea', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'nova' }, update: {}, create: { name: 'Nova', slug: 'nova', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'dove' }, update: {}, create: { name: 'Dove', slug: 'dove', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'topicrem' }, update: {}, create: { name: 'Topicrem', slug: 'topicrem', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'uriage' }, update: {}, create: { name: 'Uriage', slug: 'uriage', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'vaseline' }, update: {}, create: { name: 'Vaseline', slug: 'vaseline', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'oxyprolane' }, update: {}, create: { name: 'OXYPROLANE', slug: 'oxyprolane', imageUrl: '/placeholder-logo.svg' } }),
    // Marques génériques pour compatibility
    prisma.brand.upsert({ where: { slug: 'brand-a' }, update: {}, create: { name: 'Brand A', slug: 'brand-a', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'brand-b' }, update: {}, create: { name: 'Brand B', slug: 'brand-b', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'the-ordinary' }, update: {}, create: { name: 'The Ordinary', slug: 'the-ordinary', imageUrl: '/placeholder-logo.svg' } }),
  ]);
  
  // Références aux marques pour les produits (garder la compatibilité)
  const brandAvene = brands.find(b => b.slug === 'avene');
  const brandACM = brands.find(b => b.slug === 'acm-laboratoire');
  const brandAnua = brands.find(b => b.slug === 'anua');
  const brandBeautyOfJoseon = brands.find(b => b.slug === 'beauty-of-joseon');
  const brandBiOil = brands.find(b => b.slug === 'bi-oil');
  const brandBiocyte = brands.find(b => b.slug === 'biocyte');
  const brandBiolane = brands.find(b => b.slug === 'biolane');
  const brandBioRecherche = brands.find(b => b.slug === 'bio-recherche');
  const brandChateauRouge = brands.find(b => b.slug === 'chateau-rouge');
  const brandCerave = brands.find(b => b.slug === 'cerave');
  const brandDucray = brands.find(b => b.slug === 'ducray');
  const brandEafit = brands.find(b => b.slug === 'eafit');
  const brandEucerin = brands.find(b => b.slug === 'eucerin');
  const brandGranions = brands.find(b => b.slug === 'granions');
  const brandLaneige = brands.find(b => b.slug === 'laneige');
  const brandKlorane = brands.find(b => b.slug === 'klorane');
  const brandLRP = brands.find(b => b.slug === 'la-roche-posay');
  const brandNuhanciam = brands.find(b => b.slug === 'nuhanciam');
  const brandCaudalie = brands.find(b => b.slug === 'caudalie');
  const brandMixa = brands.find(b => b.slug === 'mixa');
  const brandNivea = brands.find(b => b.slug === 'nivea');
  const brandNova = brands.find(b => b.slug === 'nova');
  const brandDove = brands.find(b => b.slug === 'dove');
  const brandTopicrem = brands.find(b => b.slug === 'topicrem');
  const brandUriage = brands.find(b => b.slug === 'uriage');
  const brandVaseline = brands.find(b => b.slug === 'vaseline');
  const brandOxyprolane = brands.find(b => b.slug === 'oxyprolane');
  
  // Marques pour compatibilité
  const brandA = brands.find(b => b.slug === 'brand-a');
  const brandB = brands.find(b => b.slug === 'brand-b');
  const brandOrdinary = brands.find(b => b.slug === 'the-ordinary');

  // Sous-catégories de base
  const subcategories = await prisma.$transaction([
    prisma.subcategory.upsert({
      where: { slug: 'tshirts-manches-courtes' },
      update: {},
      create: { name: 'Manches courtes', slug: 'tshirts-manches-courtes', categoryId: tshirts.id }
    }),
    prisma.subcategory.upsert({
      where: { slug: 'jeans-slim' },
      update: {},
      create: { name: 'Slim', slug: 'jeans-slim', categoryId: jeans.id }
    }),
    prisma.subcategory.upsert({
      where: { slug: 'chaussures-running' },
      update: {},
      create: { name: 'Running', slug: 'chaussures-running', categoryId: shoes.id }
    }),
  ]);
  const [scTShort, scJeansSlim, scRun] = subcategories;

  await prisma.product.deleteMany({});

  await prisma.product.createMany({
    data: [
      {
        name: 'T-shirt Classic',
        description: 'T-shirt confortable 100% coton',
        priceCents: 1999,
        oldPriceCents: 2499,
        isFeatured: true,
        rating: 4.2,
        stock: 50,
        imageUrl: '/images/p11-1.jpg',
        categoryId: tshirts.id,
        subcategoryId: scTShort.id,
        brandId: brandA.id,
      },
      {
        name: 'T-shirt Premium',
        description: 'T-shirt premium doux et durable',
        priceCents: 2499,
        oldPriceCents: 2999,
        isFeatured: false,
        rating: 4.6,
        stock: 35,
        imageUrl: '/images/p12-1.jpg',
        categoryId: tshirts.id,
        subcategoryId: scTShort.id,
        brandId: brandB.id,
      },
      {
        name: 'Jeans Slim',
        description: 'Jeans coupe slim',
        priceCents: 3999,
        oldPriceCents: 4599,
        isFeatured: true,
        rating: 4.1,
        stock: 20,
        imageUrl: '/images/p21-1.jpg',
        categoryId: jeans.id,
        subcategoryId: scJeansSlim.id,
        brandId: brandA.id,
      },
      {
        name: 'Jeans Regular',
        description: 'Jeans coupe droite',
        priceCents: 3599,
        oldPriceCents: 3999,
        isFeatured: false,
        rating: 3.9,
        stock: 15,
        imageUrl: '/images/p22-1.jpg',
        categoryId: jeans.id,
        subcategoryId: scJeansSlim.id,
        brandId: brandB.id,
      },
      {
        name: 'Chaussures Running',
        description: 'Chaussures de course légères',
        priceCents: 5499,
        oldPriceCents: 5999,
        isFeatured: true,
        rating: 4.7,
        stock: 10,
        imageUrl: '/images/p31-1.jpg',
        categoryId: shoes.id,
        subcategoryId: scRun.id,
        brandId: brandA.id,
      },
      {
        name: 'Chaussures Casual',
        description: 'Chaussures décontractées au quotidien',
        priceCents: 4999,
        oldPriceCents: 5499,
        isFeatured: false,
        rating: 4.0,
        stock: 25,
        imageUrl: '/images/p32-1.jpg',
        categoryId: shoes.id,
        subcategoryId: scRun.id,
        brandId: brandB.id,
      },
      // Flawless demo products
      {
        name: 'Serum Vitamine C Eclat',
        description: 'Boost d eclat et anti-oxydant pour un teint lumineux.',
        priceCents: 15500,
        oldPriceCents: 18000,
        isFeatured: true,
        rating: 4.8,
        stock: 40,
        imageUrl: '/vitamin-c-serum.png',
        categoryId: soinVisage.id,
        brandId: brandCerave.id,
      },
      {
        name: 'Masque Purifiant a l Argile',
        description: 'Elimine les impuretes et affine le grain de peau.',
        priceCents: 8500,
        oldPriceCents: 10000,
        isFeatured: false,
        rating: 4.7,
        stock: 70,
        imageUrl: '/clay-mask-tube.png',
        categoryId: soinVisage.id,
        brandId: brandAvene.id,
      },
      {
        name: 'Creme Corps Nourrissante',
        description: 'Hydrate intensement pour une peau douce toute la journee.',
        priceCents: 12000,
        isFeatured: true,
        rating: 4.6,
        stock: 60,
        imageUrl: '/nivea-body-cream-jar.png',
        categoryId: corpsBain.id,
        brandId: brandNivea.id,
      },
      {
        name: 'Eau de Parfum Elegance',
        description: 'Sillage floral delicat et raffine.',
        priceCents: 35900,
        isFeatured: false,
        rating: 4.5,
        stock: 22,
        imageUrl: '/chanel-chance-pink-bottle.png',
        categoryId: parapharmacie.id,
        brandId: brandB.id,
      },
      {
        name: 'Niacinamide 10% + Zinc 1%',
        description: 'Serum anti-imperfections, affine le grain de peau.',
        priceCents: 14900,
        oldPriceCents: 16900,
        isFeatured: true,
        rating: 4.9,
        stock: 80,
        imageUrl: '/the-ordinary-niacinamide.png',
        categoryId: soinVisage.id,
        brandId: brandOrdinary.id,
      },
      {
        name: 'Masque Nuit Hydratant',
        description: 'Hydratation longue durée pendant le sommeil.',
        priceCents: 22000,
        isFeatured: false,
        rating: 4.6,
        stock: 30,
        imageUrl: '/laneige-water-mask.png',
        categoryId: koreanBeauty.id,
        brandId: brandLaneige.id,
      },
      {
        name: 'Gel Nettoyant Doux',
        description: 'Nettoie en douceur sans dessécher la peau.',
        priceCents: 9900,
        isFeatured: false,
        rating: 4.4,
        stock: 55,
        imageUrl: '/gentle-face-cleansers.png',
        categoryId: soinVisage.id,
        brandId: brandLRP.id,
      },
      {
        name: 'Palette Maquillage Essentials',
        description: 'Teintes polyvalentes pour un look parfait.',
        priceCents: 25900,
        oldPriceCents: 29900,
        isFeatured: false,
        rating: 4.3,
        stock: 45,
        imageUrl: '/placeholder-9culf.png',
        categoryId: maquillage.id,
        brandId: brandB.id,
      }
    ]
  });

  await Promise.all(
    users.map((u) =>
      prisma.cart.upsert({
        where: { userId: u.id },
        update: {},
        create: { userId: u.id }
      })
    )
  );

  console.log('Seed terminé.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


