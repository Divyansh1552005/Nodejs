
import db from "../db/index.js";
import { usersTable, sessionsTable } from "../db/schema.js";
import { createHmac, randomBytes} from "node:crypto";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes for testing


const getAllUsers = async function (req,res){
    try {
        // Get all users (excluding password and salt for security)
        const users = await db.select({
            name: usersTable.name,
            email: usersTable.email
        }).from(usersTable);
        
        res.json({ 
            message: 'All users retrieved successfully',
            users: users,
            count: users.length
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
}

const userSignup = async function (req,res){
    try {
        const {name, email, password} = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Name, email, and password are all required!"
            });
        }

        const existingUsers = await db.select().from(usersTable)
        .where(eq(usersTable.email, email));

        if(existingUsers.length > 0) return res.status(400).json({
            error : `user with email ${email} already exists!`
        })
        
        const salt = randomBytes(32).toString('hex')
        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

        const user = await db.insert(usersTable).values({
            name,
            email,
            // dont directly store plain a password
            password: hashedPassword,
            salt,
        }).returning({
            id: usersTable.id,
            name: usersTable.name
        })

        res.status(201).json({ message: `User has been created successfully`, user: user[0] });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const userLogin = async function (req,res){
    try {
        const {email, password} = req.body;
        
        // check if user has provided email or not
        if(!email || !password){
            return res.status(400).json({
                error : "Email and password both are required!"
            })
        }
        // now let's check if user exists or not

        const users = await db.select().from(usersTable).where(eq(email, usersTable.email)).limit(1);

        if(users.length === 0){
            return res.status(400).json({
                error : `User with email ${email} does not exists!`
            })
        }

        const user = users[0];
        const user_hashed_password = user.password;
        const user_salt = user.salt;
        const role = user.role;

        // now let us create hashed password with the password given by the user
        const user_given_password = createHmac('sha256', user_salt).update(password).digest('hex');

        if(user_given_password !== user_hashed_password){
            return res.status(400).json({
                error : `Invalid Password!`
            })
        }

        // information we wanna store in the token

        const payload = {
            id : user.id,
            name : user.name,
            email : user.email,
            role : role
        }

        // we are signing the token with a secret key
        // this key should be kept secret and secure
        // ideally it should be stored in environment variables
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '1h'});

    
        
        return res.json({
            message: 'Login successful!',
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const updateName = async (req,res) =>{
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

}

// Todo - token expiration par logout , session cleanup etc - see from claude if you cannot do it

export {userLogin, userSignup, getAllUsers, updateName} ;
