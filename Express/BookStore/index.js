const express = require("express")

const app = express()
const port = 3000


// middlewares (plugins)
app.use(express.json()) // to parse JSON bodies

const manga = [
    {
        id: 1,
        title: "Naruto",
        author: "Masashi Kishimoto",
        year: 1999
    },
    {
        id: 2,
        title: "Bleach",
        author: "Kubo Tite",
        year: 2001
    },
    {
        id: 3,
        title: "Attack on Titan",
        author: "Hajime Isayama",
        year: 2009
    },
    {
        id: 4,
        title: "My Hero Academia",
        author: "Kohei Horikoshi",
        year: 2014
    },
    {
        id:5,
        title: "Dr stone",
        author : "idfk",
        year : 2006
    }
]



// Routes
app.get("/book", (req, res)=>{
    res.setHeader("Content-Type", "application/json")
    res.json(manga)
})

app.get('/book/:id', (req,res)=>{
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
})


app.post('/books', (req, res) => {
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
});


app.delete('/books/:id', (req, res) => {
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
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

