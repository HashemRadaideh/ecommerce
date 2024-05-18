import { getUserByID } from "./models/users";
import { Role } from "@prisma/client";
import express from "express";
import jwt from "jsonwebtoken";

export const loggingMiddleware = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
) => {
  console.log(
    `[${new Date().toISOString()}] [INFO] ` +
      `${req.ip} ${req.method} ${req.originalUrl}`,
  );
  next();
};

export const errorMiddleware: express.ErrorRequestHandler = (
  err: any,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

const publicPaths = ["/", "/signin", "/signup", "/product"];
const adminPaths = ["/", "/signin", "/signup", "/product"];

export const authMiddleware: express.RequestHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (
    process.env.NODE_ENV !== "production" &&
    (req.ip === "localhost" || req.ip === "127.0.0.1" || req.ip === "[::1]")
  ) {
    console.log("executing");
    next();
  }

  const isPublicPath = publicPaths.includes(req.url);

  // Allow access to public paths
  if (isPublicPath) {
    next();
    return;
  }

  const token = req.cookies.token;
  let isAuthenticated = false;
  let isAdmin = false;

  if (token) {
    try {
      const secret = process.env.SECRET || "secret";

      const payload = jwt.verify(token, secret) as {
        id: string;
        role: Role;
      } & jwt.JwtPayload;

      const user = await getUserByID(payload.id);

      if (user) {
        isAuthenticated = true;
        isAdmin = user.role === Role.ADMIN ? true : false;
      }
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  // If the user is authenticated and is admin, allow access
  if (isAuthenticated && isAdmin) {
    next();
    return;
  }

  // Check if the requested path is for admin access
  const isAdminPath = adminPaths.includes(req.url);

  // If the user is authenticated and the path is not admin-restricted, allow access
  if (isAuthenticated && !isAdmin && !isAdminPath) {
    next();
    return;
  }

  // If the user is not an admin but is trying to access an admin-restricted path, redirect to the home page
  if (isAuthenticated && !isAdmin && isAdminPath) {
    res.status(403);
    return;
  }

  // If the user is not authenticated and the path is not public, redirect to the signin page
  res.status(401);
};
