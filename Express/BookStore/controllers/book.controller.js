
import { booksTable, authorTable } from "../models/index.js";
import { db } from '../db/index.js';
import { eq,ilike } from 'drizzle-orm'; // Import the eq function for equality checks
// ilike is for case insensitive search
import { sql } from "drizzle-orm";

export const getAllBooks = async function(req, res) {
    const search = req.query.search;
    if(search){
        const books = await db.select().from(booksTable).where(
            sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`
        );
        return res.json(books);
    }
    try {
        res.setHeader("Content-Type", "application/json");
        const books = await db.select().from(booksTable);
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
}

export const getBookById = async function(req, res) {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send("Please provide a valid ID");
        }
        // eq means equals
        const book = await db.select().from(booksTable).where(eq(booksTable.id, id)).limit(1).leftJoin(authorTable, eq(booksTable.authorId, authorTable.id))

        if (book.length > 0) {
            res.json(book[0]);
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch book" });
    }
}

export const createBook = async function(req, res) {
    try {
        const { title, description, authorId } = req.body;
        if (title) {
            const bookData = { title };
            if (description) bookData.description = description;
            if (authorId) bookData.authorId = authorId;
            
            const newBook = await db.insert(booksTable).values(bookData).returning(
                {
                    id: booksTable.id
                }
            );
            
            res.status(201).json(newBook[0]);
        } else {
            res.status(400).send("Please provide title");
        }
    } catch (error) {
        console.error("Create book error:", error);
        res.status(500).json({ error: "Failed to create book", details: error.message });
    }
}

export const deleteBook = async function(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send("Please provide a valid ID");
        }

        const deletedBook = await db.delete(booksTable).where(eq(booksTable.id, id)).returning();
        
        if (deletedBook.length > 0) {
            res.status(200).json({ message: `Book with ID ${id} and Title "${deletedBook[0].title}" deleted` });
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete book" });
    }
}

export const updateBook = async function(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send("Please provide a valid ID");
        }
        
        const { title, description, authorId } = req.body;
        const updateData = {};
        
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (authorId) updateData.authorId = authorId;
        
        if (Object.keys(updateData).length === 0) {
            return res.status(400).send("Please provide at least one field to update");
        }
        
        const updatedBook = await db.update(booksTable)
            .set(updateData)
            .where(eq(booksTable.id, id))
            .returning();
        
        if (updatedBook.length > 0) {
            res.status(200).json(updatedBook[0]);
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update book" });
    }
}