import express from 'express';
import { userLogin, userSignup, getAllUsers, updateName, getUserInfoWithSessionId } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/', getAllUsers);

// get user data jiska session active hai, given hamare paas uski session id hai ie vo header mein bhejega id
router.get('/test', getUserInfoWithSessionId)

// user wanna update his name
router.patch('/', updateName)

// signup route
router.post('/signup', userSignup); 

// login route
router.post('/login', userLogin);


export default router;
