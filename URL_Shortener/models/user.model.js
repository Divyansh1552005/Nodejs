import { integer, pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id : uuid("id").primaryKey().defaultRandom(),
  
});
