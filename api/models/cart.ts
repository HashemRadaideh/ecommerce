import pool from ".";

export interface Cart {
  id: Buffer;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  created_at: Date;
  updated_at: Date;
}

export async function getCarts() {
  const [rows]: any = await pool.query(`SELECT * FROM carts`);
  return rows as Cart[] | undefined;
}
