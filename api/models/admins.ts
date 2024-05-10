import pool from ".";

export interface Admin {
  id: Buffer;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export async function addAdmin(
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
    `SELECT * FROM admins WHERE username = ?`,
    [username],
  );
  return rows[0] as Admin | undefined;
}

export async function getAdminByEmail(email: string) {
  const [rows]: any = await pool.query(`SELECT * FROM admins WHERE email = ?`, [
    email,
  ]);
  return rows[0] as Admin | undefined;
}

export async function getAdmins() {
  const [rows]: any = await pool.query(`SELECT * FROM admins`);
  return rows as Admin[] | undefined;
}
