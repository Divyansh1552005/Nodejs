
import express from "express"
import db from '../db/index.js'
import { usersTable } from "../db/schema.js";
import { ensureAuthenticated, restrictToRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

const adminRestrictMiddleware = restrictToRole("admin");
// admin should be able to get all information about users
// applyed to each route of admin
router.use(ensureAuthenticated)
router.use(adminRestrictMiddleware)


router.get('/users', async (req,res) =>{
    // first we need to check logged in hai ya nahi jo ki ab upar ensureAthunteiccated kar raha hai
    const users = await db.select({
        id : usersTable.id,
        name : usersTable.name,
        email : usersTable.email
    }).from(usersTable);
    return res.status(200).json({users})
})


export default router;
