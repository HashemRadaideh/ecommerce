import pool from ".";

interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
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

export async function getUser(email: string) {
  const [rows]: any = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  return rows[0] as User | undefined;
}
