import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function addAdmin(
  username: string,
  email: string,
  password: string,
) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const admin = await prisma.admin.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return admin;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw new Error("Could not create admin");
  }
}

export async function getAdminByUsername(username: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        username,
      },
    });
    return admin;
  } catch (error) {
    console.error("Error fetching admin by username:", error);
    throw new Error("Could not fetch admin by username");
  }
}

export async function getAdminByEmail(email: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });
    return admin;
  } catch (error) {
    console.error("Error fetching admin by email:", error);
    throw new Error("Could not fetch admin by email");
  }
}

export async function getAdmins() {
  try {
    const admins = await prisma.admin.findMany();
    return admins;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw new Error("Could not fetch admins");
  }
}
