import express from "express";
import { getAllBooks, getBookById, createBook, deleteBook, updateBook } from "../controllers/book.controller.js";
const router = express.Router();

// Routes

router.get('/', getAllBooks)

router.get('/:id', getBookById)

router.post('/', createBook)

router.put('/:id', updateBook)

router.delete('/:id', deleteBook)


export default router;
// or we can do module.exports = router i