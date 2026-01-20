import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DATABASE_URL);

try {
  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  console.log("Database connected successfully...");
} catch (error) {
  console.error("Error connecting to the database:", error);
  throw error;
}

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export default pool;
