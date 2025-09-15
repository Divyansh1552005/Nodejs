import express from 'express';
import { connectMongoDB } from './connection.js';
import 'dotenv/config'

const app = express();
const PORT = 3000;

connectMongoDB(process.env.MONGO_CONNECTION_URL).then(()=> console.log("Mongo DB Connected!!"));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, ()=> console.log(`Server is running on PORT ${PORT}`))
