const express = require("express");
const router = express.Router();
const { getChats } = require("../controllers/chatsController");

const dummyprotect = require("../middlewares/authentication");

router.get("/getchats", dummyprotect, getChats);

module.exports = router;
