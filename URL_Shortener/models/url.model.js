import { integer, pgTable, varchar, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./user.model.js";


export const urlTable = pgTable("urls", {
  id : uuid("id").primaryKey().defaultRandom(),
  
  shortCode: varchar("code", { length: 155 }).notNull().unique(),
  targetUrl: text("target_url").notNull(),
  
    // we also need userid so as to know which user created which url
    userId : uuid("user_id").notNull().references(()=> usersTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()).notNull(),
})

