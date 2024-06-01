import { Role } from "@prisma/client";
import express from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { authorize } from "@/api/middleware/authorize";
import { addCart, getCart } from "@/api/models/cart";
import { getUserByID } from "@/api/models/user";

export const cart = express.Router();

cart.route("/cart").get(authorize, async (req: Request, res: Response) => {
  const id = (req.query.id as string) || "";

  try {
    const cart = await getCart(id);
    res.status(200).json(cart);
  } catch (error) {
    console.error("Adding category failed", error);
    res.status(500).json({ error: "Adding category failed" });
  }
});

cart.route("/cart").post(authorize, async (req: Request, res: Response) => {
  try {
    const { token, product, quantity } = req.body;

    let user;
    if (token) {
      try {
        const secret = process.env.SECRET || "secret";

        const payload = jwt.verify(token, secret) as {
          id: string;
          role: Role;
        } & jwt.JwtPayload;

        user = await getUserByID(payload.id);
      } catch (error) {
        console.error("Token verification failed:", error);
      }
    }

    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    addCart(user.id, product.id, quantity);
    res.status(200).json({ message: "Successfully added category" });
  } catch (error) {
    console.error("Adding category failed", error);
    res.status(500).json({ error: "Adding category failed" });
  }
});
