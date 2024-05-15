import pool from ".";
import { v4 as uuidv4 } from "uuid";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: string;
  created_at: Date;
  updated_at: Date;
}

export async function addProduct(
  name: string,
  description: string,
  price: number,
  stock_quantity: number,
  category_id: string,
) {
  return pool.query(
    `INSERT INTO products (id, name, description, price, stock_quantity, category_id) VALUES (?, ?, ?, ?, ?, ?)`,
    [uuidv4(), name, description, price, stock_quantity, category_id],
  );
}

export async function getProducts() {
  const [rows]: any = await pool.query(`SELECT * FROM products`);
  return rows as Product[];
}
