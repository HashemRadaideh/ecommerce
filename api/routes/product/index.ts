import express from "express";
import type { Request, Response } from "express";

import { authorize } from "@/api/middleware/authorize";
import { getCategoryByName } from "@/api/models/category";
import { getLatestProducts } from "@/api/models/product";
import { addProduct, getProductById, getProducts } from "@/api/models/product";

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
  .post(authorize, async (req: Request, res: Response) => {
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

product.route("/products").get(async (req: Request, res: Response) => {
  const skip = parseInt(req.query.skip as string, 10) || 0;
  const take = parseInt(req.query.take as string, 10) || 10;
  const search = (req.query.take as string) || "";

  try {
    const { products, total } = await getProducts(skip, take, search);
    res.status(200).json({ products, total });

    // res.setHeader("Content-Type", "application/json");
    // res.setHeader("Transfer-Encoding", "chunked");

    // res.write('{"products":[');

    // for (const product of products) {
    //   res.write(JSON.stringify(product) + ",");
    // }

    // res.write(`],"total":${total}}`);
    // res.end();
  } catch (error) {
    console.error("Failed to get all products", error);
    res.status(500).json({ error: "Failed to get all products" });
  }
});

product.route("/products/latest").get(async (_req: Request, res: Response) => {
  try {
    const products = await getLatestProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to get all products", error);
    res.status(500).json({ error: "Failed to get all products" });
  }
});
