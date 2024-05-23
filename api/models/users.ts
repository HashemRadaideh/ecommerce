import { CACHE_EXPIRATION, redis } from "../utils/redis";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function addUser(
  username: string,
  email: string,
  password: string,
) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
}

export async function getUserByID(id: string) {
  const cacheKey = `userById:${id}`;

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

    await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Could not fetch user by ID");
  }
}

export async function getUserByUsername(username: string) {
  const cacheKey = `userByUsername:${username}`;

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

    await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw new Error("Could not fetch user by username");
  }
}

export async function getUserByEmail(email: string) {
  const cacheKey = `userByEmail:${email}`;

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

    await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(user));

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

    await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(users));

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
  }
}
