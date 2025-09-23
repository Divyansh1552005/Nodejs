
import { integer, pgTable, varchar, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id : uuid("id").primaryKey().defaultRandom(),
  firstname: varchar("first_name", { length: 55 }).notNull(),
  lastname: varchar("last_name", { length: 55 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password : text("password").notNull(),
  salt : text("salt").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()).notNull(),
});


