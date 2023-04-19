//import mysql from "mysql2";
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "employee_db",
});

db.connect(function (err) {
  if (err) throw err;
});

// export default db;
module.exports = db;
