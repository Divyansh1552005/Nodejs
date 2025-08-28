
import express from "express";
 
const app = express()
const port = 3000
import bookRouter from "./routes/book.routes.js";

import {loggermiddleware} from "./middlewares/logger.js";

// middlewares (plugins)
app.use(express.json()) // to parse JSON bodies


app.use(loggermiddleware());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`); 
    // return res.json("Boom i am middleware and i will be returning this request basically terminating req response cycle");
    next(); // to pass the request to the next middleware/route handler
});


// routes
app.use('/books',bookRouter)


app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

