import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

const booksTable = pgTable("books", {
    id: integer("id").primaryKey().notNull().unique(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 255 }).notNull(),
    year: integer("year").notNull()
});
