import {pgTable, varchar, uuid, text, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { authorTable } from "./author.model.js";

const booksTable = pgTable("books", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    description : text("description"),
    authorId: uuid("author_id").references(()=>{
        return authorTable.id
    }),
    
}, (table)=>{
    return {
        titleIndex: index("title_index").using("btree", sql`to_tsvector('english', ${table.title})`)
    };
});

export { booksTable };

// will start from tommorrows
