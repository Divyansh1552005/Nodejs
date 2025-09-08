import express from 'express';
import { userLogin, userSignup, getAllUsers } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/', getAllUsers);

router.post('/signup', userSignup); 

router.post('/login', userLogin);


export default router;
