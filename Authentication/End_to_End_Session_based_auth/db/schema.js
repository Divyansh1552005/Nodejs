import {pgTable, varchar,uuid,text, timestamp} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password : text("password").notNull(),
  salt : text("salt").notNull(),
  

});


// session management k liye table
export const sessionsTable = pgTable("user_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => usersTable.id), // foreign key reference to users table // also isko unique kar doge taaki ek user ke multiple sessions na bane multiple devices se login karne pe
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
