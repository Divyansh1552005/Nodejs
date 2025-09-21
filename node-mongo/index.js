import express from 'express';
import { connectMongoDB } from './connection.js';
import 'dotenv/config'
import { authMiddleware } from './middlewares/auth.middleware.js';
import UserRouter from "./routes/user.routes.js"



const app = express();
const PORT = process.env.PORT ?? 3000;

connectMongoDB(process.env.MONGO_CONNECTION_URL).then(()=> console.log("Mongo DB Connected!!"));

app.use(express.json());
app.use(authMiddleware);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/user', UserRouter);


app.listen(PORT, ()=> console.log(`Server is running on PORT ${PORT}`))
