import { PrismaClient } from "@prisma/client";

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
