import { promises as fs } from "fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pool from "../config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initializeDatabase() {
  try {
    const schemaPath = join(__dirname, "schema.sql");
    const schema = await fs.readFile(schemaPath, "utf-8");
    await pool.query(schema);
  } catch (error) {
    console.log(error);
  } finally {
    await pool.end();
  }
}

initializeDatabase();
