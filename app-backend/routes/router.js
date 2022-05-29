const express = require("express");
const router = express.Router();
const conection = require("./../database/db");
const authController = require("./../controllers/authController");

// ROUTER FOR CONTROLLERS:

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// ROUTER FOR VIEWS:

router.get("/login", (req, res) => {
  // conection()
  // conection.query("SELECT * FROM users;")
  // res.send("Hello, world!");
  res.render("login", {alert: false});
});

router.get("/register", (req, res) => {
  res.render("register", {alert: false});
});

router.get("/home", authController.isAuthenticated, (req, res) => {
  res.render("index", {user: req.user, alert: false});
});

module.exports = router;
