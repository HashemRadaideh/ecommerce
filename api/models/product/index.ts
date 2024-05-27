import { Prisma, PrismaClient, Product } from "@prisma/client";

import { CACHE_EXPIRATION, redis } from "@/api/utils/redis";

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
  const cacheKey = `${id}`;

  try {
    const cachedData = await redis.get<Product>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    await redis.setex(cacheKey, CACHE_EXPIRATION, product);

    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Could not fetch product by ID");
  }
}

interface ProductPage {
  products: Product[];
  total: number;
}

export async function getProducts(skip: number, take: number, search: string) {
  const cacheKey = `${search}:${skip}:${take}`;

  try {
    const cachedData = await redis.get<ProductPage>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const where: Prisma.ProductWhereInput = {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { category: { name: { contains: search, mode: "insensitive" } } },
        { category: { id: { contains: search, mode: "insensitive" } } },
      ],
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
      }),
      prisma.product.count({ where }),
    ]);

    const result: ProductPage = { products, total };

    await redis.setex(cacheKey, CACHE_EXPIRATION, result);

    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch products");
  }
}

export async function getLatestProducts() {
  const cacheKey = `latest`;

  try {
    const cachedData = await redis.get<Product[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const result = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    await redis.setex(cacheKey, CACHE_EXPIRATION, result);

    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch products");
  }
}
