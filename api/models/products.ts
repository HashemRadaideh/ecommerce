import pool from ".";

export interface Product {
  id: Buffer;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  created_at: Date;
  updated_at: Date;
}

export async function getProducts() {
  const [rows]: any = await pool.query(`SELECT * FROM products`);
  return rows as Product[] | undefined;
}
