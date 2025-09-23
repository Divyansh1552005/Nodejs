import db from "../db/index.js";
import { usersTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";


export async function getUserByEmail(email){

    const [existing_user] = await db
    .select({
        id : usersTable.id,
        firstname : usersTable.firstname,
        lastname : usersTable.lastname,
        email : usersTable.email,
    })
    .from(usersTable)
    .where(
        eq(usersTable.email, email)
    )

    return existing_user;
}


export async function createUser(email, firstname, lastname, salt, hashedPassword){

    const user = await db.insert(usersTable).values({
        email,
        firstname,
        lastname,
        salt,
        password : hashedPassword
    }).returning({
        id : usersTable.id
    })

    return user;
}


