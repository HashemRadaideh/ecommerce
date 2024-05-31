import express from "express";
import type { Request, Response } from "express";

import { getOrders } from "@/api/models/order";

export const orders = express.Router();

orders.route("/orders").get(async (req: Request, res: Response) => {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Failed to get all products", error);
    res.status(500).json({ error: "Failed to get all products" });
  }
});
