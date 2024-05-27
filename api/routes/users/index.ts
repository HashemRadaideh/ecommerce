import express from "express";
import type { Request, Response } from "express";

import { authMiddleware } from "@/api/middleware";
import { getUsers } from "@/api/models/users";

export const users = express.Router();

users
  .route("/users")
  .get(authMiddleware, async (_req: Request, res: Response) => {
    try {
      const users = await getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Registration failed:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });
