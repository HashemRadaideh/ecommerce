import express from "express";

import { authMiddleware } from "@/api/middleware";
import { getUsers } from "@/api/models/users";

export const users = express.Router();

users
  .route("/users")
  .get(authMiddleware, async (_req: express.Request, res: express.Response) => {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (error) {
      console.error("Registration failed:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });
