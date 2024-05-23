import express from "express";

import { getProducts } from "@/api/models/products";

export const products = express.Router();

products
  .route("/products")
  .get(async (_req: express.Request, res: express.Response) => {
    try {
      const products = await getProducts();
      res.json(products);
    } catch (error) {
      console.error("Failed to get all products", error);
      res.status(500).json({ error: "Failed to get all products" });
    }
  });
