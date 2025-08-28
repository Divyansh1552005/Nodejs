const db = require("./db")
const {usersTable} = require("./drizzle/schema")
require("dotenv/config") // what this does is it loads the environment variables from a .env file into process.env

// reading from db
async function getAllUsers() {
  const users = await db.select().from(usersTable)
  console.log(users)
  return users
}

async function createUser(id,name,email) {
  await db.insert(usersTable).values({id,name,email})
}

// createUser(1,"Divyansh","officialdslc1552005@gmail.com")
// createUser(2,"DS","officialds1552005@gmail.com")
getAllUsers()