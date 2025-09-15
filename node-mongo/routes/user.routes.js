import express from 'express';
import User from '../models/user.model.js'
import {randomBytes, createHmac} from "node:crypto"
import jwt from "jsonwebtoken"
import { ensureAuthenticated } from '../middlewares/auth.middleware.js';
const router = express.Router();


router.post('/Signup', async function(req,res){
    const {name, email, password} = req.body;

    // first we will need to check if a user by that mail exists or not
    const existingUser = await User.findOne({
        email,
    });

    if(existingUser) return res.status(400).json({error : `User with email ${email} already exists!`})

    const salt = randomBytes(256).toString('hex')
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    const user = await User.create({
        name,
        email,
        password : hashedPassword,
        Salt : salt
    })

    // mongo db gives you a unique id known as _id which every document you create has this
    return res.status(201).json({status : 'success' , data : {id : user._id} })

})


router.post('/login', async function (req,res){
    const {email,password} = req.body;

     const existingUser = await User.findOne({
        email,
    });

    if(!existingUser) return res.status(404).json({error : `User with email ${email} does not exists!`})

    
    // validating password
    const salt = existingUser.Salt;
    const hashed = existingUser.password;

    const newHash = createHmac('sha256', salt).update(password).digest('hex');

    if(newHash !== hashed){
        return res.status(400).json({error : `Invalid Password!`});
    }

    const payload = {
        name : existingUser.name,
        _id : existingUser._id,
        email : existingUser.email
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json({
        status : "Success", token
    });



})

router.patch('/', ensureAuthenticated, async (req, res) => {
    const { name } = req.body;

    // req.user is set by authMiddleware (decoded JWT payload)
    const userId = req.user && req.user._id;

    if (!userId) return res.status(401).json({ error: 'Not authenticated' });

    await User.findByIdAndUpdate(userId, { name }, { new: true });

    return res.json({ status: 'Success!' });
});





export default router;
