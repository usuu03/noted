/*
 * Filename: authController.js
 * Author: Usu Edeaghe
 * Date: October 1, 2024
 * Description: This file contains ....
 *
 */
const db = require("../database/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password_hash } = req.body;

    const hashedPassword = await bcrypt.hash(password_hash, 10);

    const query =
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?, ?)";

    await db.promise().query(query, [username, email, hashedPassword]);

    res.status(201).json({ message: "Registration successful" });
  } catch {
    console.error("Registration Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error during registration" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password_hash } = req.body;

    const loginQuery = "SELECT * FROM users where username = ?";
    const [results] = await db.promise().query(loginQuery);
  } catch (error) {}
};

module.exports = {
  register,
  login,
};
