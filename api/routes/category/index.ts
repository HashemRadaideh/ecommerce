import express from "express";

import { authMiddleware } from "@/api/middleware";
import { addCategory } from "@/api/models/categories";

export const category = express.Router();

category
  .route("/category")
  .post(authMiddleware, async (req: express.Request, res: express.Response) => {
    try {
      const { name, description } = req.body;
      addCategory(name, description);
    } catch (error) {
      console.error("Adding category failed", error);
      res.status(500).json({ error: "Adding category failed" });
    }
  });
