import { Prisma, PrismaClient, Product } from "@prisma/client";

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
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Could not fetch product by ID");
  }
}

export async function getProducts(skip: number, take: number, search: string) {
  try {
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

    // Convert image buffers to base64 strings
    const productsWithBase64Images = products.map((product) => ({
      ...product,
      images: product.images.map((image) => ({
        ...image,
        data: image.data.toString("base64"),
      })),
    }));

    return { products: productsWithBase64Images, total };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch products");
  }
}

export async function getLatestProducts() {
  try {
    const result = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { images: true },
    });

    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch products");
  }
}
