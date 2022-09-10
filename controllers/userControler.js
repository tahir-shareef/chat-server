const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  //   trying to register a user
  if (name && email && password) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ error: "user already exists" });
    } else {
      // Finally create a user
      try {
        await User.create({
          name,
          email,
          password,
        });
        res.json(name + " registered !");
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  } else {
    res.status(400).json({ error: "incomplete fields " });
  }
};

const loginUser = (req, res) => {
  const { name, email } = req.body;
  if (name && email) {
    res.json(name + " doing register !!!");
  } else {
    res.status(401).json({ error: "incomplete fields " });
  }
};

const checkfUserExist = (req, res) => {
  const { email } = req.body;
  if (true) {
    res.json({ userExist: true });
  } else {
    res.status(400).json({ userExist: false });
  }
};

module.exports = { registerUser, loginUser, checkfUserExist };
