import express from 'express';
import db  from "../db/index.js";
import { usersTable } from '../models/user.model.js';
import { signupPostRequestBodySchema, loginPostRequestBodySchema } from '../validations/req.validation.js';
import { hashPasswordWithSalt } from '../utils/hash.js';
import { getUserByEmail, createUser } from '../services/user.service.js';
import { createUserToken } from '../utils/token.js';


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


router.post("/login", async (req,res) =>{
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);
    
    if(validationResult.error){
        return res.status(400).json({
            error : validationResult.error.format()
        })
    }


    const {email, password} = validationResult.data;

    const user = await getUserByEmail(email);

    if(!user) return res.status(404).json({
        error : "User with email does not exists!"
    })

    const {password : hashedPassword} = hashPasswordWithSalt(password, user.salt);

    if(user.password !== hashedPassword){
        return res.status(400).json({
            error : "invalid password!"
        })
    }

    const token = await createUserToken({id : user.id})

    return res.json({token : token});


})

export default router;