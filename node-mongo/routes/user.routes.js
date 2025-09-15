import express from 'express';

const router = express.Router();

router.post('/Signup', async function(req,res){
    const {name, email, password} = req.body;
    
})


export default router;
