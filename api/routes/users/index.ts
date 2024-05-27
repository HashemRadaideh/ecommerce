import express from "express";
import type { Request, Response } from "express";

import { authorize } from "@/api/middleware/authorize";
import { getUsers } from "@/api/models/user";

export const users = express.Router();

users.route("/users").get(authorize, async (_req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});
