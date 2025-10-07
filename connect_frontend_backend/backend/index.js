import express from "express";
// import cors from "cors";
import multer from "multer";

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());
// app.use(cors({ origin: 'http://localhost:5173' }));


// app.get("/", (req, res) => {
//     res.json({
//         message: "Hello from backend"
//     })
// });

// get a list of 5 jokes
app.get("/api/jokes", (req, res) => {
    const jokes = [
        {
            id: 1,
            title: "Programming Joke",
            content: "Why do programmers prefer dark mode? Because light attracts bugs!"
        },
        {
            id: 2,
            title: "Coffee Joke",
            content: "How does a programmer fix a broken coffee machine? They turn it off and on again!"
        },
        {
            id: 3,
            title: "Array Joke",
            content: "Why did the developer go broke? Because he used up all his cache!"
        },
        {
            id: 4,
            title: "JavaScript Joke",
            content: "Why do Java developers wear glasses? Because they can't C#!"
        },
        {
            id: 5,
            title: "Backend Joke",
            content: "There are only 10 types of people in the world: those who understand binary and those who don't."
        }
    ];
    
    res.json(jokes);
})


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // unique name
  }
});


const upload = multer({ storage: storage, 
    limits : {fileSize : 1024 * 1024}   // 1 MB limit
 });

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully', file: req.file });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

