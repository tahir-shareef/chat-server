const User = require("../models/userModel");

const getChats = async (req, res) => {
  const allUsers = await User.find().select("-password");
  res.json({ chats: allUsers });
};

module.exports = { getChats };
