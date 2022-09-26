const express = require("express");
const router = express.Router();
const {
  getChats,
  getchatuser,
  sendMessage,
} = require("../controllers/chatsController");

const protect = require("../middlewares/authentication");

router.get("/getchats", protect, getChats);

router.get("/getuser/:id", protect, getchatuser);

router.post("/sendmessage/:recieverId", protect, sendMessage);

module.exports = router;
