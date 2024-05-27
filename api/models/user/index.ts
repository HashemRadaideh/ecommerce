import { PrismaClient, Role, User } from "@prisma/client";
import bcrypt from "bcrypt";

import { CACHE_EXPIRATION, redis } from "@/api/utils/redis";

const prisma = new PrismaClient();

export async function addUser(
  username: string,
  email: string,
  password: string,
  role?: string,
) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: role === "Admin" ? Role.ADMIN : Role.USER,
      },
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
}

export async function getUserByID(id: string) {
  const cacheKey = `${id}`;

  try {
    const cachedData = await redis.get<User>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    await redis.setex(cacheKey, CACHE_EXPIRATION, user);

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Could not fetch user by ID");
  }
}

export async function getUserByUsername(username: string) {
  const cacheKey = `username:${username}`;

  try {
    const cachedData = await redis.get<User>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    await redis.setex(cacheKey, CACHE_EXPIRATION, user);

    return user;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw new Error("Could not fetch user by username");
  }
}

export async function getUserByEmail(email: string) {
  const cacheKey = `email:${email}`;

  try {
    const cachedData = await redis.get<User>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    await redis.setex(cacheKey, CACHE_EXPIRATION, user);

    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Could not fetch user by email");
  }
}

export async function getUsers() {
  const cacheKey = "users";

  try {
    const cachedData = await redis.get<User[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const users = await prisma.user.findMany();

    await redis.setex(cacheKey, CACHE_EXPIRATION, users);

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
  }
}
