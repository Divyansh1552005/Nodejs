import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json()); // middleware ie to use json format

const diary = {}; // later make it database
const emails = new Set(); // to store unique emails

// routes
// 1. Singup - logic - here is my car - please park it and gimme back a token
app.post('/signup', (req, res) => {
    // logic
    const {name, email, password} = req.body;
    if(emails.has(email)){
        return res.status(400).send("Email already registered");
    }
    emails.add(email);
    // create a token - unique identifier for user
    const token = `${Date.now()}`; // later use JWT
    // store user in "database" ie do entry in diary
    diary[token] = {name, email, password};
    

    return res.status(201).json({token});
});


// to take back your car - ie get your data - authentication
app.get('/me', (req, res) => {
    // to take car back you need the token
    const {token} = req.body;  
    if(!token){
        return res.status(400).json({error : "Missing token"})
    }

    if(!token in diary){
         return res.status(400).json({error : "Invalid token"})
    }

    const entry = diary[token];
    return res.json({Data : entry})
});


// private data that will only be visible to person who are logged in
app.post('/private-data', (req,res) => {
    const {token} = req.body;  
    // console.log("poch gye");
    if(!token){
        return res.status(400).json({error : "Missing token"})
    }

    if(!token in diary){
         return res.status(400).json({error : "Invalid token"})
    }

    const entry = diary[token];
    
    return res.json({data : {privateData : "Access Granted"}})
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

