require('dotenv/config');
const { drizzle } = require('drizzle-orm/node-postgres');

// You can specify any property from the node-postgres connection options
const db = drizzle({ 
  connection: { 
    connectionString: process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/mydb"
  }
});

module.exports = db;


