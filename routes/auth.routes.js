const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Vista de login
router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/logout", (req, res) => {
  res.redirect("/auth/login"); // solo redirige (ya que no usas cookies)
});

// Login para EJS (formulario)
router.post("/login", authController.loginWeb);

router.get("/register", (req, res) => {
  res.render("auth/register");
});

// Login para API/Postman
router.post("/api/login", authController.loginApi);

router.post("/register", authController.register);
router.get("/usuarios", authController.findAll);

module.exports = router;
