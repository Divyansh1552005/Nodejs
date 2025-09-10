import { sessionsTable, usersTable } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import db from '../db/index.js';


export const authMiddleware = async function (req,res, next){
    // ye middleware har request k saath uski session id ie saari properties chipka dega
  const sessionId = req.headers['session-id'];

  if(!sessionId) return next();

   const [data] = await db.select({
        sessionId: sessionsTable.id,
        id : usersTable.id,
        userId: sessionsTable.userId,
        name: usersTable.name,
        email: usersTable.email
    })
    .from(sessionsTable)
    .rightJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
    .where(eq(sessionsTable.id, sessionId));  

    if(!data) return next();

    req.user = data;

    next();
}

