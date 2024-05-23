import { CACHE_EXPIRATION, redis } from "../utils/redis";
import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export async function addProduct(
  name: string,
  description: string,
  price: number,
  stock_quantity: number,
  category_id: string,
) {
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stockQuantity: stock_quantity,
        categoryId: category_id,
      },
    });
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Could not create product");
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Could not fetch product by ID");
  }
}

export async function getProducts(skip: number, take: number) {
  const cacheKey = `products:${skip}:${take}`;

  try {
    const cachedData = await redis.get<{ products: Product[]; total: number }>(
      cacheKey,
    );
    if (cachedData) {
      return cachedData;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take,
      }),
      prisma.product.count(),
    ]);

    const result = { products, total };

    await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(result));

    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch products");
  }
}
