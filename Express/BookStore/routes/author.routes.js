import express from "express";
import { authorTable } from "../models/index.js";
import { getAllAuthors,createAuthor,deleteAuthor,updateAuthor,getAuthorById,getBooksofAuthor } from "../controllers/author.controller.js";

const router = express.Router();
// Routes

router.get('/', getAllAuthors)

router.get('/:id', getAuthorById)

router.get('/:id/books', getBooksofAuthor)

router.post('/', createAuthor)

router.put('/:id', updateAuthor)

router.delete('/:id', deleteAuthor)


export default router;
// or we can do module.exports = router instead