const {drizzle} = require("drizzle-orm/node-postgres")


// connection to db
// postgress://<username>:<password>@<host>:<port>/<database_name>
const { Pool } = require("pg");


// connection to db
// postgress://<username>:<password>@<host>:<port>/<database_name>
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/mydb"
});

const db = drizzle(pool);

module.exports = db;

module.exports = db;


