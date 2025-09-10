import {pgTable, varchar,uuid,text, timestamp} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password : text("password").notNull(),
  salt : text("salt").notNull(),
});

// Note: Don't make userId unique if you want to allow multiple sessions per user
// If you want only one session per user, add: .unique()
// userId: uuid("user_id").notNull().references(() => usersTable.id).unique(),

// session management k liye table
export const sessionsTable = pgTable("user_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => usersTable.id), // foreign key reference to users table // also isko unique kar doge taaki ek user ke multiple sessions na bane multiple devices se login karne pe
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // expiresAt : timestamp("expires_at").notNull(),
  // // Optional: Add last accessed time to track activity
  // lastAccessedAt: timestamp("last_accessed_at").defaultNow().notNull()
});
