/*
 * Filename: database.js
 * Author: Usu Edeaghe
 * Date: October 1, 2024
 * Description: This file contains ....
 *
 */
const mysql2 = require("mysql2");

const db = mysql2.createConnection({
  host: "localhost", // Your database host
  user: "root", // Your database username
  password: "$uperDragon13", // Your database password
  database: "noted", // Your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the database");
  }
});

module.exports = db;
