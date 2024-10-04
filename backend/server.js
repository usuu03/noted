/*
 * Filename: server.js
 * Author: Usu Edeaghe
 * Date: October 1, 2024
 * Description: This file contains ....
 *
 */
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// const db = require("./database/database");

//Routes
const authRoutes = require("./authentication/authRoutes");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
