// Make sure to install the 'pg' package 
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL
  }
});
 
export default db;
