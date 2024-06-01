import { Image, Prisma, PrismaClient, Product } from "@prisma/client";

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

export async function saveProductImages(
  productId: string,
  images: Express.Multer.File[],
) {
  try {
    const imagePromises = images.map((image) => {
      return prisma.image.create({
        data: {
          fileName: image.originalname,
          fileType: image.mimetype,
          data: image.buffer,
          productId,
        },
      });
    });

    await Promise.all(imagePromises);
  } catch (error) {
    console.error("Error saving product images:", error);
    throw new Error("Could not save product images");
  }
}

export async function getProductById(id: string) {
  const cacheKey = `${id}`;

  try {
    const cachedData = await redis.get<Product[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    const productWithBase64Images = {
      ...product,
      images: product?.images.map((image) => ({
        ...image,
        data: image.data.toString("base64"),
      })),
    };

    await redis.setex(cacheKey, CACHE_EXPIRATION, productWithBase64Images);

    return productWithBase64Images;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Could not fetch product by ID");
  }
}

interface ProductWithImages extends Product {
  images: Image[];
}

interface PaginatedProducts {
  products: ProductWithImages[];
  total: number;
}

export async function getProducts(skip: number, take: number, search: string) {
  const cacheKey = `${search}:${skip}`;

  try {
    const cachedData = await redis.get<PaginatedProducts>(cacheKey);
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
        include: { images: true },
      }),
      prisma.product.count({ where }),
    ]);

    const productsWithBase64Images = products.map((product) => ({
      ...product,
      images: product.images.map((image) => ({
        ...image,
        data: image.data.toString("base64"),
      })),
    }));

    const result = {
      products: productsWithBase64Images,
      total,
    };
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

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        images: true,
      },
    });

    const productsWithBase64Images = products.map((product) => ({
      ...product,
      images: product.images.map((image) => ({
        ...image,
        data: image.data.toString("base64"),
      })),
    }));

    await redis.setex(cacheKey, CACHE_EXPIRATION, productsWithBase64Images);

    return productsWithBase64Images;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch products");
  }
}
