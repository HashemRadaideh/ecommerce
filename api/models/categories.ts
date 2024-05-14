import pool from ".";
import { v4 as uuidv4 } from "uuid";

export interface Category {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export async function addCategory(name: string, description: string) {
  return pool.query(
    `INSERT INTO categories (id, name, description) VALUES (?, ?, ?)`,
    [uuidv4(), name, description],
  );
}

export async function getCategoryByName(name: string) {
  const [rows]: any = await pool.query(
    `SELECT * FROM categories where name = ?`,
    [name],
  );
  return rows[0] as Category | undefined;
}

export async function getCategories() {
  const [rows]: any = await pool.query(`SELECT * FROM categories`);
  return rows as Category[] | undefined;
}
