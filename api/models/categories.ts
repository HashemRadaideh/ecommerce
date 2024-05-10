import pool from ".";

export interface Category {
  id: Buffer;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  created_at: Date;
  updated_at: Date;
}

export async function getCategories() {
  const [rows]: any = await pool.query(`SELECT * FROM categories`);
  return rows as Category[] | undefined;
}
