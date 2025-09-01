import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

const booksTable = pgTable("books", {
    id: integer("id").primaryKey().notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 255 }).notNull(),
    year: integer("year").notNull()
});

// will start from tommowrows