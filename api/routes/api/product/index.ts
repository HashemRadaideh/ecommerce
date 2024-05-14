import express from "express";

import { getCategoryByName } from "@/api/models/categories";
import { addProduct } from "@/api/models/products";

export const product = express.Router();

product
  .route("/api/product")
  .post(async (req: express.Request, res: express.Response) => {
    try {
      const { name, description, category, price, stock_quantity } = req.body;
      const cat = await getCategoryByName(category);
      if (!cat) {
        res.status(500).json({ error: "Invalid category" });
        return;
      }
      addProduct(name, description, price, stock_quantity, cat.id);
    } catch (error) {
      console.error("Adding product failed", error);
      res.status(500).json({ error: "Adding product failed" });
    }
  });
