import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  
  for (const p of products) {
    if (p.images.length > 0 && (p.images[0].length > 200 || p.images[0].includes('cloudinary'))) {
      console.log(`Product: ${p.name}`);
      console.log(`Image length: ${p.images[0].length}`);
      console.log(`Image starts with: ${p.images[0].substring(0, 100)}...`);
    }
  }
}

main().finally(() => prisma.$disconnect());
