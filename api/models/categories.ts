import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addCategory(name: string, description: string) {
  try {
    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    return category;
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Could not create category");
  }
}

export async function getCategoryByName(name: string) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    });
    return category;
  } catch (error) {
    console.error("Error fetching category by name:", error);
    throw new Error("Could not fetch category by name");
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Could not fetch categories");
  }
}
