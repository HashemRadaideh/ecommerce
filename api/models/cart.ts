import pool from ".";
import { v4 as uuidv4 } from "uuid";

export interface Cart {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export async function addCart(
  user_id: string,
  product_id: string,
  quantity: number,
) {
  return pool.query(
    `INSERT INTO carts (id, user_id, product_id, quantity) VALUES (?, ?, ?, ?)`,
    [uuidv4(), user_id, product_id, quantity],
  );
}

export async function getCarts() {
  const [rows]: any = await pool.query(`SELECT * FROM carts`);
  return rows as Cart[] | undefined;
}
