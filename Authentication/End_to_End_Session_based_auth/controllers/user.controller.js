
import db from "../db/index.js";
import { usersTable, sessionsTable } from "../db/schema.js";
import { createHmac, randomBytes} from "node:crypto";
import { eq } from "drizzle-orm";

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

        // now let us create hashed password with the password given by the user
        const user_given_password = createHmac('sha256', user_salt).update(password).digest('hex');

        if(user_given_password !== user_hashed_password){
            return res.status(400).json({
                error : `Invalid Password!`
            })
        }

         const [session] = await db.insert(sessionsTable).values({
            userId: user.id
        }).returning();

        // If password matches, login successful
        return res.json({ 
            message: 'Login successful!',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            sessionId : session.id
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export {userLogin, userSignup, getAllUsers} ;
