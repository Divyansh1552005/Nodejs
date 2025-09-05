import {authorTable,booksTable } from "../models/index.js";
import { db } from '../db/index.js';
import { eq,ilike } from 'drizzle-orm'; // Import the eq function for equality checks
// ilike is for case insensitive search
import { sql } from "drizzle-orm";


export const getAllAuthors = async function (req,res) {
    const search = req.query.search;
    if(search){
        const authors = await db.select().from(authorTable).where(
            sql`to_tsvector('english', ${authorTable.firstName}) @@ to_tsquery('english', ${search})`
        );
        return res.json(authors);
    }
    try{
        const authors = await db.select().from(authorTable);
        return res.json(authors);
    } catch (error) {
        console.error("Error fetching authors:", error);
        return res.status(500).json({ error: "Failed to fetch authors" });
    }
}

export const getAuthorById = async function (req,res) {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send("Please provide a valid ID");
        }
        // eq means equals
        const author = await db.select().from(authorTable).where(eq(authorTable.id, id)).limit(1);

        if (author.length > 0) {
            res.json(author[0]);
        } else {
            res.status(404).send("Author not found");
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch author" });
    }
}


export const createAuthor = async function (req,res) {

    const { firstName, lastName, email } = req.body;
    if (!firstName || !email) {
        return res.status(400).send("First name and email are required");
    }

    const authorData = { firstName, email };
    if (lastName) authorData.lastName = lastName;

    try{
        const newAuthor = await db.insert(authorTable).values(authorData).returning(
            console.log(`Inserted author with ID: ${authorTable.id}`),
            {
                id: authorTable.id
                // ()=> console.log(`Inserted author with ID: ${authorTable.id}`)
            }
        );
        res.status(201).json(newAuthor);
    } catch (error) {
        console.error("Error creating author:", error);
        res.status(500).json({ error: "Failed to create author" });
    }
}

export const deleteAuthor = async function (req,res) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send("Please provide a valid ID");
        }

        const deletedAuthor = await db.delete(authorTable).where(eq(authorTable.id, id)).returning(
            console.log(`Deleted author with ID: ${authorTable.id}`),
        )

        if (deletedAuthor.length > 0) {
            res.json(deletedAuthor[0]);
        } else {
            res.status(404).send("Author not found");
        }

    } catch (error) {
        console.error("Error deleting author:", error);
        res.status(500).json({ error: "Failed to delete author" });
    }
};

export const updateAuthor = async function (req,res) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send("Please provide a valid ID");
        }

        const { firstName, lastName, email } = req.body;
        if (!firstName && !lastName && !email) {
            return res.status(400).send("Please provide at least one field to update");
        }

        const authorData = {};
        if (firstName) authorData.firstName = firstName;
        if (lastName) authorData.lastName = lastName;
        if (email) authorData.email = email;

        const updatedAuthor = await db.update(authorTable).set(authorData).where(eq(authorTable.id, id)).returning(
            console.log(`Updated author with ID: ${authorTable.id}`),
        )
        if (updatedAuthor.length > 0) {
            res.json(updatedAuthor[0]);
        } else {
            res.status(404).send("Author not found");
        }
        
    } catch (error) {
        console.error("Error updating author:", error);
        res.status(500).json({ error: "Failed to update author" });
    }
};


export const getBooksofAuthor = async function(req,res){
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send("Please provide a valid ID");
        }
        // eq means equals
        const books = await db.select().from(booksTable).where(eq(booksTable.authorId, id));
        
        if (books.length > 0) {
            res.json(books);
        } else {
            res.status(404).send("No books found for this author");
        }
    } catch (error) {
        console.error("Error fetching books for author:", error);
        res.status(500).json({ error: "Failed to fetch books for author" });
    }
};

