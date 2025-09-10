import express from 'express';
import userRouter from './routes/user.routes.js'
import { sessionsTable, usersTable } from './db/schema.js';
import { eq } from 'drizzle-orm';
import db from './db/index.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

const app = express();
const PORT = process.env.PORT ?? 3000;
// agar koi port set nhi hai to 3000 pe chlega


// MIDDLEWARES
app.use(express.json());

app.use(authMiddleware)


// Final routing
app.get('/', (req,res) =>{
    return res.status(200).json({ status : "Shit's working fine"})
})

app.use('/user', userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});


