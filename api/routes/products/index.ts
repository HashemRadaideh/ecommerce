import express from "express";
import type { Request, Response } from "express";

import { getProducts } from "@/api/models/products";

export const products = express.Router();

products.route("/products").get(async (req: Request, res: Response) => {
  const skip = parseInt(req.query.skip as string, 10) || 0;
  const take = parseInt(req.query.take as string, 10) || 10;

  try {
    const { products, total } = await getProducts(skip, take);
    res.json({ products, total });
  } catch (error) {
    console.error("Failed to get all products", error);
    res.status(500).json({ error: "Failed to get all products" });
  }
});
