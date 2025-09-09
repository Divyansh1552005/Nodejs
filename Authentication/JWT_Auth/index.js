import express from 'express';
import userRouter from './routes/user.routes.js'
import { sessionsTable, usersTable } from './db/schema.js';
import { eq } from 'drizzle-orm';
import db from './db/index.js';
import jwt from "jsonwebtoken"

const app = express();
const PORT = process.env.PORT ?? 3000;
// agar koi port set nhi hai to 3000 pe chlega

app.use(express.json());

app.use(async function (req,res,next){
  try{
  // ye middleware har request k saath uski session id ie saari properties chipka dega
  const tokenHeader = req.headers['authorization'];
  // header authorization : bearer <Token>

  if(!tokenHeader) return next(); // if no token header that means user aint logged in

  // it should always start with Bearer
  if(!tokenHeader.startsWith('Bearer')){
    return res.status(400).json({
      error : "Auth header must start with bearer"
    })
  }

  // split the header so as to remove bearer to get token
  const token = tokenHeader.split(' ')[1]

  // decode the token ie verify if sahi hai ya nahi token
  const decoded = jwt.verify(token, process.env.JWT_SECRET)



    req.user = decoded;
    next();
}catch{
  next()
};

})

app.get('/', (req,res) =>{
    return res.status(200).json({ status : "Shit's working fine"})
})

app.use('/user', userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});


