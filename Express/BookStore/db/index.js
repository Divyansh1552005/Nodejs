import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
// this is for the database connection ie drizzle ko postgres se connect karne vaaste zaruri hunda si

export const db = drizzle(process.env.DATABASE_URL);

