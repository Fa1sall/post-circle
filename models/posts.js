import pool from "../config/database.js";

export const getPosts = async (offset, limit) => {
  const query = `SELECT u.username, p.title, p.body, p.created_at 
     FROM users AS u INNER JOIN posts AS p 
     ON u.id = p.user_id
     ORDER BY p.created_at DESC
     LIMIT $1 OFFSET $2;`;
  const { rows } = await pool.query(query, [offset, limit]);
  return rows;
};

export const getTotalPosts = async () => {
  const query = `SELECT COUNT(*) FROM posts;`;
  const { rows } = await pool.query(query);
  return parseInt(rows[0].count, 10);
};

export const createPost = async (user_id, title, body) => {
  const query = `INSERT INTO posts(user_id, title, body) values ($1,$2,$3);`;
  await pool.query(query, [user_id, title, body]);
};
