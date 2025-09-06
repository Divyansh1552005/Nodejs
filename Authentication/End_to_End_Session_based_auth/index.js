import express from 'express';
import userRouter from './routes/user.routes.js'

const app = express();
const PORT = process.env.PORT ?? 3000;
// agar koi port set nhi hai to 3000 pe chlega

app.use(express.json());


app.get('/', (req,res) =>{
    return res.status(200).json({ status : "Shit's working fine"})
})

app.use('/user', userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});


