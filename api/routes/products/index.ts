import express from "express";
import type { Request, Response } from "express";

import { getProducts } from "@/api/models/products";

export const products = express.Router();

products.route("/products").get(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const skip = (page - 1) * limit;

  try {
    const { products, total } = await getProducts(skip, limit);
    res.json({ products, total });
  } catch (error) {
    console.error("Failed to get all products", error);
    res.status(500).json({ error: "Failed to get all products" });
  }
});
