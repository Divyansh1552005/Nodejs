import {pgTable, varchar, uuid, text } from "drizzle-orm/pg-core";
import { authorTable } from "./author.model.js";

const booksTable = pgTable("books", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    description : text("description"),
    authorId: uuid("author_id").references(()=>{
        return authorTable.id
    }),
    
});

export { booksTable };

// will start from tommowrows
