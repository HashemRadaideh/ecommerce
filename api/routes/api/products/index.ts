import { addProduct } from "@/api/models/products";
import express from "express";

export const products = express.Router();

products
  .route("/api/products")
  .post(async (req: express.Request, res: express.Response) => {
    try {
        const { name, description, category, price, stock_quantity } = req.body;
        addProduct(name, description, category, price, stock_quantity);
    } 
    catch (error) {
        console.error("Adding product failed", error);
        res.status(500).json({ error: "Adding product failed" });
      }
  });
