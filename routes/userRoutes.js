const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  canRegister,
} = require("../controllers/userControler");

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/canregister/:userName", canRegister);

module.exports = router;
