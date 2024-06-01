import express from "express";
import type { Request, Response } from "express";
import multer from "multer";

import { authorize } from "@/api/middleware/authorize";
import { getCategoryByName } from "@/api/models/category";
import { getLatestProducts, saveProductImages } from "@/api/models/product";
import { addProduct, getProductById, getProducts } from "@/api/models/product";

const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const filename = `${Date.now()}-${file.originalname}`;
//     cb(null, filename);
//   },
// });

const upload = multer({
  storage,
  // limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, _file, cb) => {
    cb(null, true);
  },
});

export const product = express.Router();

product.route("/product").get(async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const product = await getProductById(id as string);
    res.status(200).json(product);
  } catch (error) {
    console.error("Failed to get the product", error);
    res.status(500).json({ error: "Failed to get the product" });
  }
});

product
  .route("/product")
  .post(
    authorize,
    upload.array("images"),
    async (req: Request, res: Response) => {
      try {
        const { name, description, category, price, stock_quantity } = req.body;
        const images = req.files as Express.Multer.File[];

        const cat = await getCategoryByName(category);
        if (!cat) {
          res.status(404).json({ error: "Category not found" });
          return;
        }

        const product = await addProduct(
          name,
          description,
          parseInt(price, 10),
          parseInt(stock_quantity, 10),
          cat.id,
        );

        if (images && images.length > 0) {
          await saveProductImages(product.id, images);
        }

        res.status(200).json({ message: "Successfully added product" });
      } catch (error) {
        console.error("Adding product failed", error);
        res.status(500).json({ error: "Adding product failed" });
      }
    },
  );

product.route("/products").get(async (req: Request, res: Response) => {
  const skip = parseInt(req.query.skip as string, 10) || 0;
  const take = parseInt(req.query.take as string, 10) || 10;
  const search = (req.query.search as string) || "";

  try {
    const { products, total } = await getProducts(skip, take, search);
    res.status(200).json({ products, total });
  } catch (error) {
    console.error("Failed to get products", error);
    res.status(500).json({ error: "Failed to get products" });
  }
});

product.route("/products/latest").get(async (_req: Request, res: Response) => {
  try {
    const products = await getLatestProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to get latest products", error);
    res.status(500).json({ error: "Failed to get latest products" });
  }
});
