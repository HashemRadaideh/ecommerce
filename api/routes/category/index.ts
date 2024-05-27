import express from "express";
import type { Request, Response } from "express";

import { authorize } from "@/api/middleware/authorize";
import { addCategory, getCategories } from "@/api/models/category";

export const category = express.Router();

category
  .route("/category")
  .post(authorize, async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      addCategory(name, description);
      res.status(200);
    } catch (error) {
      console.error("Adding category failed", error);
      res.status(500).json({ error: "Adding category failed" });
    }
  });

category.route("/categories").get(async (_req: Request, res: Response) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Failed to get all categories", error);
    res.status(500).json({ error: "Failed to get all categories" });
  }
});
