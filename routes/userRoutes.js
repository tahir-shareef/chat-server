const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  checkfUserExist,
} = require("../controllers/userControler");

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/checkifuser", checkfUserExist);

module.exports = router;
