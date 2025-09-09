import express from 'express';
import userRouter from './routes/user.routes.js'
import { sessionsTable, usersTable } from './db/schema.js';
import { eq } from 'drizzle-orm';
import db from './db/index.js';

const app = express();
const PORT = process.env.PORT ?? 3000;
// agar koi port set nhi hai to 3000 pe chlega

app.use(express.json());

app.use(async function (req,res,next){
  // ye middleware har request k saath uski session id ie saari properties chipka dega
  const sessionId = req.headers['session-id'];

  if(!sessionId) return next();

   const [data] = await db.select({
        sessionId: sessionsTable.id,
        id : usersTable.id,
        userId: sessionsTable.userId,  // Fixed typo: usedId -> userId
        name: usersTable.name,
        email: usersTable.email
    })
    .from(sessionsTable)
    .rightJoin(usersTable, eq(sessionsTable.userId, usersTable.id))  // Fixed JOIN syntax
    .where(eq(sessionsTable.id, sessionId));  // Fixed WHERE clause

    if(!data) return next();

    req.user = data;

    next();
})

app.get('/', (req,res) =>{
    return res.status(200).json({ status : "Shit's working fine"})
})

app.use('/user', userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});


