import express from "express";

import { getProducts } from "@/api/models/products";

export const products = express.Router();

products
  .route("/api/products")
  .post(async (_req: express.Request, res: express.Response) => {
    try {
      res.send(await getProducts());
    } catch (error) {
      console.error("Failed to get all products", error);
      res.status(500).json({ error: "Failed to get all products" });
    }
  });
