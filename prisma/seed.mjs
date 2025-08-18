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
    })
  ]);

  const [tshirts, jeans, shoes] = categories;

  // Marques de base
  const brands = await prisma.$transaction([
    prisma.brand.upsert({ where: { slug: 'brand-a' }, update: {}, create: { name: 'Brand A', slug: 'brand-a' } }),
    prisma.brand.upsert({ where: { slug: 'brand-b' }, update: {}, create: { name: 'Brand B', slug: 'brand-b' } }),
  ]);
  const [brandA, brandB] = brands;

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


