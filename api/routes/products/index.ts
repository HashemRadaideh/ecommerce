import express from "express";
import type { Request, Response } from "express";

import { getProducts } from "@/api/models/products";

export const products = express.Router();

products.route("/products").get(async (req: Request, res: Response) => {
  const skip = parseInt(req.query.skip as string, 10) || 0;
  const take = parseInt(req.query.take as string, 10) || 10;

  try {
    const { products, total } = await getProducts(skip, take);
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
