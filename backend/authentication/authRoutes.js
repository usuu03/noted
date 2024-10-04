/*
 * Filename: authRoutes.js
 * Author: Usu Edeaghe
 * Date: October 1, 2024
 * Description: This file contains ....
 *
 */
const express = require("express");
const router = express.Router();
const auth = require("./authController");

router.post("/login", auth.login);
router.post("/register", auth.register);

module.exports = router;
