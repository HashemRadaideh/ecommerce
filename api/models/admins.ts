import pool from ".";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export interface Admin {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export async function addUser(
  username: string,
  email: string,
  password: string,
) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return pool.query(
    `INSERT INTO admins (id, username, email, password) VALUES (?, ?, ?, ?)`,
    [uuidv4(), username, email, hashedPassword],
  );
}

export async function getAdminByUsername(username: string) {
  const [rows]: any = await pool.query(
    `SELECT * FROM admins WHERE username = ?`,
    [username],
  );
  return rows[0] as Admin;
}

export async function getAdminByEmail(email: string) {
  const [rows]: any = await pool.query(`SELECT * FROM admins WHERE email = ?`, [
    email,
  ]);
  return rows[0] as Admin;
}

export async function getAdmins() {
  const [rows]: any = await pool.query(`SELECT * FROM admins`);
  return rows as Admin[];
}
