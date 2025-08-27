
import { manga } from "../models/manga.js";

export const getAllBooks = function(req, res){
    res.setHeader("Content-Type", "application/json")
    res.json(manga)
}

export const getBookById = function(req, res){
    const id = req.params.id;

    if(isNaN(id)){
        res.status(400);
        return res.send("Please enter a valid number");
    }

    const required_manga = manga.find(m => m.id === parseInt(id));


    if(required_manga){
        // res.setHeader("Content-Type", "application/json")
        res.json(required_manga)
    }
    else{
        res.status(404).send("Manga not found")
    }
}

export const createBook = function(req, res) {
    const { title, author, year } = req.body;
    if(title && author && year) {
        const maxId = manga.length > 0 ? Math.max(...manga.map(m => m.id)) : 0;
        const newManga = { id: maxId + 1, title, author, year };
        manga.push(newManga);
        res.status(201).json(newManga);
    } 
    else {
        res.status(400).send("Please provide title, author, and year");
    }
}

export const deleteBook = function(req, res) {
    const id = req.params.id;
    if (isNaN(id)) {
        res.status(400);
        return res.send("Please enter a valid number");
    }
    const index = manga.findIndex(m => m.id === parseInt(id));
    if (index !== -1) {
        const deletedManga = manga[index];
        manga.splice(index, 1);
        res.status(200).send(`Manga with ID ${id} and Title "${deletedManga.title}" deleted`);
    } 
    else {
        res.status(404).send("Manga not found");
    }
}

export const updateBook = function(req, res) {
    const id = req.params.id;
    if (isNaN(id)) {
        res.status(400);
        return res.send("Please enter a valid number");
    }
    
    const index = manga.findIndex(m => m.id === parseInt(id));
    if (index !== -1) {
        const { title, author, year } = req.body;
        if (title) manga[index].title = title;
        if (author) manga[index].author = author;
        if (year) manga[index].year = year;
        
        res.status(200).json(manga[index]);
    } 
    else {
        res.status(404).send("Manga not found");
    }
}