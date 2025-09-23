import express from 'express';
import db  from "../db/index.js";
import { usersTable } from '../models/user.model.js';
import { signupPostRequestBodySchema } from '../validations/req.validation.js';
import { hashPasswordWithSalt } from '../utils/hash.js';
import { getUserByEmail, createUser } from '../services/user.service.js';


const router = express.Router();


router.post("/signup", async (req, res) => {
    // const {firstname, lastname, email, password} = req.body;

    // // basic validation
    // if(!firstname || !lastname || !email || !password) {
    //     return res.status(400).json({message: "All fields are required"});
    // }

    // let us use zod
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

    if(validationResult.error){
        return res.status(400).json({
            error : validationResult.error.format()
        })
    }

    const {firstname, lastname, email, password} = validationResult.data ;

    const existing_user = await getUserByEmail(email);

    if(existing_user){
        return res.status(400).json({
            error : `User with email ${email} already exists!`
        })
    }

    const {salt, password : hashedPassword} = hashPasswordWithSalt(password);


    const [user] = await createUser(email, firstname, lastname, salt, hashedPassword)


    return res.status(201).json({
        data : {userId : user.id}
    })


})


export default router;