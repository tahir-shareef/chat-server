const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.send("Tahir doing login !!!");
});

module.exports = router;
