import pool from ".";

export interface User {
  id: Buffer;
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
  return pool.query(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, password],
  );
}

export async function getAdminByUsername(username: string) {
  const [rows]: any = await pool.query(
    `SELECT * FROM user WHERE username = ?`,
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
