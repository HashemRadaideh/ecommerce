import { Order, Prisma, PrismaClient } from "@prisma/client";

import { CACHE_EXPIRATION, redis } from "@/api/utils/redis";

const prisma = new PrismaClient();

export async function addOrder() {
  try {
    // const product = await prisma.product.create({
    //   data: {
    //   },
    // });
    // return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Could not create product");
  }
}

export async function getOrders() {
  const cacheKey = `orders`;

  try {
    const cachedData = await redis.get<Order[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const result = await prisma.order.findMany();

    await redis.setex(cacheKey, CACHE_EXPIRATION, result);

    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch products");
  }
}
