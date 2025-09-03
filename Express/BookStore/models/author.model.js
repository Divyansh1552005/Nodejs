import { integer, pgTable, varchar, uuid, text } from "drizzle-orm/pg-core";

const authorTable = pgTable("authors", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull()
});

export { authorTable };
