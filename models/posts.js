import pool from "../config/database.js";

export const getAllPosts = async () => {
  const query = `SELECT u.username, p.title, p.body, p.created_at 
     FROM users AS u INNER JOIN posts AS p 
     ON u.id = p.user_id;`;
  const { rows } = await pool.query(query);
  return rows;
};

export const createPost = async (user_id, title, body) => {
  const query = `INSERT INTO posts(user_id, title, body) values ($1,$2,$3);`;
  await pool.query(query, [user_id, title, body]);
};
