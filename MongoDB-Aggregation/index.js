import express from 'express';
import dotenv from 'dotenv';
import {connectMongoDB} from './connection.js';
import aggregateRoutes from './routes/aggregate.routes.js';

dotenv.config();

connectMongoDB(process.env.MONGO_CONNECTION_URL)


const app = express();

app.use(express.json());

app.use('/', aggregateRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("Today, I am learning mongo DB aggregation");
})

app.listen(PORT, ()=>{ 
    console.log(`Server is running on port ${PORT}`);
})