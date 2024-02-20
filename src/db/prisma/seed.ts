import { PrismaClient } from '@prisma/client';
import data from './data.json';

const prismaClient = new PrismaClient();

const startTime = Date.now();
async function seed() {
  const products = data.products;
  for (const product of products) {
    await prismaClient.product.upsert({
      where: { id: Number(product.id) },
      update: {},
      create: {
        id: Number(product.id),
        name: product.goodsnm.trim(),
        imgSrc: product.img_i,
        deliveryType: '로켓배송',
        onlineStock: 9999,
        originalPrice: product.standard_price,
        price: product.price,
        brand: {
          connectOrCreate: {
            where: { id: product.brand.id },
            create: {
              id: Number(product.brand.id),
              nameKr: product.brand.kr_name.trim(),
              nameEn: product.brand.name.trim(),
            },
          },
        },
      },
    });
  }

  const endTime = Date.now();
  console.log(`Seeding completed in ${(endTime - startTime) / 1000} seconds.`);
}

seed();
