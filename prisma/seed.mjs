import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'demo@mami-shop.test' },
      update: {},
      create: { email: 'demo@mami-shop.test', name: 'Demo User' }
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

  await prisma.product.deleteMany({});

  await prisma.product.createMany({
    data: [
      {
        name: 'T-shirt Classic',
        description: 'T-shirt confortable 100% coton',
        priceCents: 1999,
        imageUrl: '/images/p11-1.jpg',
        categoryId: tshirts.id
      },
      {
        name: 'T-shirt Premium',
        description: 'T-shirt premium doux et durable',
        priceCents: 2499,
        imageUrl: '/images/p12-1.jpg',
        categoryId: tshirts.id
      },
      {
        name: 'Jeans Slim',
        description: 'Jeans coupe slim',
        priceCents: 3999,
        imageUrl: '/images/p21-1.jpg',
        categoryId: jeans.id
      },
      {
        name: 'Jeans Regular',
        description: 'Jeans coupe droite',
        priceCents: 3599,
        imageUrl: '/images/p22-1.jpg',
        categoryId: jeans.id
      },
      {
        name: 'Chaussures Running',
        description: 'Chaussures de course légères',
        priceCents: 5499,
        imageUrl: '/images/p31-1.jpg',
        categoryId: shoes.id
      },
      {
        name: 'Chaussures Casual',
        description: 'Chaussures décontractées au quotidien',
        priceCents: 4999,
        imageUrl: '/images/p32-1.jpg',
        categoryId: shoes.id
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


