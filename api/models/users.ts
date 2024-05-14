import pool from ".";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export interface User {
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
    `INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)`,
    [uuidv4(), username, email, hashedPassword],
  );
}

export async function getUserByUsername(username: string) {
  const [rows]: any = await pool.query(
    `SELECT * FROM users WHERE username = ?`,
    [username],
  );
  return rows[0] as User | undefined;
}

export async function getUserByEmail(email: string) {
  const [rows]: any = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  return rows[0] as User | undefined;
}

export async function getUsers() {
  const [rows]: any = await pool.query(`SELECT * FROM users`);
  return rows as User[] | undefined;
}
