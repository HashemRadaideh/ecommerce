import express from "express";

import { getUsers } from "@/api/models/users";

export const users = express.Router();

users
  .route("/api/users")
  .get(async (_req: express.Request, res: express.Response) => {
    try {
      const users = await getUsers();
      res.json(users);
    } catch (error) {
      console.error("Registration failed:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });
