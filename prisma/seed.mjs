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

  // Marques de base
  const brands = await prisma.$transaction([
    prisma.brand.upsert({ where: { slug: 'brand-a' }, update: {}, create: { name: 'Brand A', slug: 'brand-a', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'brand-b' }, update: {}, create: { name: 'Brand B', slug: 'brand-b', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'nivea' }, update: {}, create: { name: 'NIVEA', slug: 'nivea', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'the-ordinary' }, update: {}, create: { name: 'The Ordinary', slug: 'the-ordinary', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'eucerin' }, update: {}, create: { name: 'Eucerin', slug: 'eucerin', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'vichy' }, update: {}, create: { name: 'Vichy', slug: 'vichy', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'la-roche-posay' }, update: {}, create: { name: 'La Roche-Posay', slug: 'la-roche-posay', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'acm' }, update: {}, create: { name: 'ACM', slug: 'acm', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'klorane' }, update: {}, create: { name: 'Klorane', slug: 'klorane', imageUrl: '/placeholder-logo.svg' } }),
    prisma.brand.upsert({ where: { slug: 'revolution' }, update: {}, create: { name: 'Revolution', slug: 'revolution', imageUrl: '/placeholder-logo.svg' } }),
  ]);
  const [brandA, brandB, brandNivea, brandOrdinary, brandEucerin, brandVichy, brandLRP, brandACM, brandKlorane, brandRevolution] = brands;

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
        name: 'Sérum Vitamine C Éclat',
        description: 'Boost d’éclat et anti-oxydant pour un teint lumineux.',
        priceCents: 15500,
        oldPriceCents: 18000,
        isFeatured: true,
        rating: 4.8,
        stock: 40,
        imageUrl: '/vitamin-c-serum.png',
        categoryId: soinVisage.id,
        brandId: brandOrdinary.id,
      },
      {
        name: 'Masque Purifiant à l’Argile',
        description: 'Élimine les impuretés et affine le grain de peau.',
        priceCents: 8500,
        oldPriceCents: 10000,
        isFeatured: false,
        rating: 4.7,
        stock: 70,
        imageUrl: '/clay-mask-tube.png',
        categoryId: soinVisage.id,
        brandId: brandEucerin.id,
      },
      {
        name: 'Crème Corps Nourrissante',
        description: 'Hydrate intensément pour une peau douce toute la journée.',
        priceCents: 12000,
        isFeatured: true,
        rating: 4.6,
        stock: 60,
        imageUrl: '/nivea-body-cream-jar.png',
        categoryId: corpsBain.id,
        brandId: brandNivea.id,
      },
      {
        name: 'Eau de Parfum Élégance',
        description: 'Sillage floral délicat et raffiné.',
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
        description: 'Sérum anti-imperfections, affine le grain de peau.',
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
        brandId: brandB.id,
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
        brandId: brandRevolution.id,
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


