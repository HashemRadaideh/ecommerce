import { PrismaClient } from "@prisma/client";

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

export async function getProducts() {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Could not fetch products");
  }
}
