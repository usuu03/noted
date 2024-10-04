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
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";

    await db.promise().query(query, [username, email, hashedPassword]);

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
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
    const [results] = await db.promise().query(loginQuery, [username]);

    if (results.length === 0) {
      return res.status(400).json({ message: "User not Found" });
    }

    //Getting the first user
    const user = results[0];

    // Check the password using bcrypt
    const match = await bcrypt.compare(password_hash, user.password_hash);

    if (match) {
      const token = jwt.sign(
        { userId: user.userId },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).json({ message: "Login successful", token, user });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login Error:", error);

    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: `Login Unsuccessful: ${error.message}` });
    }
  }
};

module.exports = {
  register,
  login,
};
