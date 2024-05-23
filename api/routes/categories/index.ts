import express from "express";
import type { Request, Response } from "express";

import { getCategories } from "@/api/models/categories";

export const categories = express.Router();

categories.route("/categories").get(async (_req: Request, res: Response) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Failed to get all categories", error);
    res.status(500).json({ error: "Failed to get all categories" });
  }
});
