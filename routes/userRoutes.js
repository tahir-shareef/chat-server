const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  canRegister,
  getMe,
} = require("../controllers/userControler");

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/canregister/:userName", canRegister);

router.get("/getme/:userId", getMe);

module.exports = router;
