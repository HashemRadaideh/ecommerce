import express from "express";
import type { Request, Response } from "express";

import { authMiddleware } from "@/api/middleware";
import { getCategoryByName } from "@/api/models/categories";
import { addProduct, getProductById } from "@/api/models/products";

export const product = express.Router();

product.route("/product").get(async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const products = await getProductById(id as string);
    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to get all products", error);
    res.status(500).json({ error: "Failed to get all products" });
  }
});

product
  .route("/product")
  .post(authMiddleware, async (req: express.Request, res: express.Response) => {
    try {
      const { name, description, category, price, stock_quantity } = req.body;
      const cat = await getCategoryByName(category);
      if (!cat) {
        res.status(500).json({ error: "Invalid category" });
        return;
      }
      addProduct(name, description, price, stock_quantity, cat.id);
      res.status(200);
    } catch (error) {
      console.error("Adding product failed", error);
      res.status(500).json({ error: "Adding product failed" });
    }
  });
