import { Category, PrismaClient } from "@prisma/client";

import { CACHE_EXPIRATION, redis } from "../utils/redis";

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
  const cacheKey = `categoryByName:${name}`;

  try {
    const cachedData = await redis.get<Category>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    });

    await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(category));

    return category;
  } catch (error) {
    console.error("Error fetching category by name:", error);
    throw new Error("Could not fetch category by name");
  }
}

export async function getCategories() {
  const cacheKey = "categories";

  try {
    const cachedData = await redis.get<Category[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const categories = await prisma.category.findMany();

    await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(categories));

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Could not fetch categories");
  }
}
