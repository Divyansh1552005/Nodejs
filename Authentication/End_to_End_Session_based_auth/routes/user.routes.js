import express from 'express';
import { userLogin, userSignup, getAllUsers } from '../controllers/user.controller.js';
const router = express.Router();
import { sessionsTable, usersTable } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import db from '../db/index.js';
import { error } from 'console';

router.get('/', getAllUsers);

// get user data jiska session active hai, given hamare paas uski session id hai ie vo header mein bhejega id
router.get('/test', async (req,res) =>{
//     req.headers - Contains all HTTP headers sent with the request
// ['session-id'] - Looks for a specific header named "session-id"
// The value gets stored in the sessionsId variable

    // const sessionsId = req.headers['session-id'];

    // if(!sessionsId){
    //     return res.status(401).json({
    //         Error : 'You are not logged in'
    //     })
    // }

    // const [data] = await db.select({
    //     id: sessionsTable.id,
    //     userId: sessionsTable.userId,  // Fixed typo: usedId -> userId
    //     name: usersTable.name,
    //     email: usersTable.email
    // })
    // .from(sessionsTable)
    // .rightJoin(usersTable, eq(sessionsTable.userId, usersTable.id))  // Fixed JOIN syntax
    // .where(eq(sessionsTable.id, sessionsId));  // Fixed WHERE clause

    // if(!data){
    //     return res.status(401).json({
    //         Error : 'You are not logged in'
    //     })
    // }

    // return res.status(201).json({data});


    // we have written a better code
    // baat aisi thhi ki let user is logged in and he wanna update his name, ab hame baar baar updation route mein check karna pdta ki user exists or not isse acha hamne pehle hi middleware se check karke uska data mangwa liya

    const user = req.user;

    if(!user){
        return res.status(401).json({error : 'You are not logged in!'})
    }

    return res.json({user});
})



// user wanna update his name
router.patch('/', async (req,res) =>{
    // ab agar iske baad hame dekhna ho active user then we can create a middleware coz we dont wanna repeat the code of /test
    // the middleware will fetch the session and forward it to the route
    // this middleware will do db operation

    const user = req.user;

    if(!user){
        return res.status(401).json({
            error : "you are not logged in"
        })
    }

    const { name } = req.body;
    
    if (!name) {
            return res.status(400).json({
                error: "Name is required"
            });
    }
    await db.update(usersTable).set({name})
    .where(eq(usersTable.id, user.id))


    return res.status(201).json({status : 'success'});

})
router.post('/signup', userSignup); 

router.post('/login', userLogin);


export default router;
