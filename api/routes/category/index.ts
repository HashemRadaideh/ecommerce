import express from "express";
import type { Request, Response } from "express";

import { authMiddleware } from "@/api/middleware";
import { addCategory } from "@/api/models/categories";

export const category = express.Router();

category
  .route("/category")
  .post(authMiddleware, async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      addCategory(name, description);
      res.status(200);
    } catch (error) {
      console.error("Adding category failed", error);
      res.status(500).json({ error: "Adding category failed" });
    }
  });
