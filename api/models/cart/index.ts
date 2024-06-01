import { PrismaClient, Product } from "@prisma/client";

import { CACHE_EXPIRATION, redis } from "@/api/utils/redis";

const prisma = new PrismaClient();

export async function addCart(
  user_id: string,
  product_id: string,
  quantity: number,
) {
  try {
    const cart = await prisma.cart.create({
      data: {
        userId: user_id,
        productId: product_id,
        quantity,
      },
    });
    return cart;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw new Error("Could not create cart");
  }
}

export async function getCart(id: string) {
  const cacheKey = `cart:${id}`;

  try {
    const cachedData = await redis.get<Product[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const cart = await prisma.cart.findMany({
      where: {
        userId: id,
      },
      include: {
        product: true,
      },
    });

    // await redis.setex(cacheKey, CACHE_EXPIRATION, cart);

    return cart.map((cartItem) => {
      return {
        product: cartItem.product,
        quantity: cartItem.quantity,
      };
    });
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw new Error("Could not fetch carts");
  }
}

export async function getCarts() {
  try {
    const carts = await prisma.cart.findMany({
      include: {
        user: true,
        product: true,
      },
    });
    return carts;
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw new Error("Could not fetch carts");
  }
}
