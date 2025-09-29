import pool from "../config/database.js";

export async function getUsers() {
  const res = await pool.query("SELECT * FROM users;");
  console.log(res);
}

export async function createUser(first_name, last_name, username, password) {
  const query = `
    INSERT INTO users(first_name,last_name,username,password)
    values ($1,$2,$3,$4);
    `;
  const res = await pool.query(query, [
    first_name,
    last_name,
    username,
    password,
  ]);

  console.log(res.rows);
}
