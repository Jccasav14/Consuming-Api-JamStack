const { Pool } = require("pg");

const pool = new Pool({
  user: "jamstack",
  host: "db",          
  database: "jamstack_db",
  password: "jamstack123",
  port: 5432,
});

module.exports = pool;
