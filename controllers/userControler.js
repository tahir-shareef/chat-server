const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkifUser = async (query, extended) => {
  const userExists = await User.findOne(query);
  if (extended) return userExists;
  return userExists !== null;
};

const registerUser = async (req, res) => {
  const { name, userName, password } = req.body;
  //   trying to register a user
  if (name && userName && password) {
    const userExists = await checkifUser({ userName });
    if (userExists) {
      res.status(400).json({ error: "user already exists" });
    } else {
      try {
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Finally create a user
        await User.create({
          name,
          userName,
          password: hashedPassword,
          profileImage:
            "https://i.pinimg.com/originals/28/a4/70/28a470426182529c6a58593f69eb1117.jpg",
        }).then((user) => {
          // sending response after registered
          const userTOsend = JSON.parse(JSON.stringify(user));
          delete userTOsend.password;
          res.json({ user: userTOsend, token: generateToken(user._id) });
        });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  } else {
    res.status(400).json({ error: "incomplete fields " });
  }
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  if (userName && password) {
    // finding user
    const user = await checkifUser({ userName }, true);

    if (user) {
      // checking password
      const passwordMatch = await bcrypt.compare(password, user.password);
      // removing password field
      const userTOsend = JSON.parse(JSON.stringify(user));
      delete userTOsend.password;
      if (passwordMatch) {
        // here user can login
        res.json({
          user: userTOsend,
          token: generateToken(user._id),
        });
      } else {
        res
          .status(400)
          .json({ error: "sorry you've entered incorrect password !" });
      }
    } else {
      res.status(400).json({ error: "user doesn't exists" });
    }
  } else {
    res.status(401).json({ error: "incomplete fields " });
  }
};

const canRegister = async (req, res) => {
  const { userName } = req.params;
  const userExists = await checkifUser({ userName });
  res.json({ canRegister: !userExists });
};

const getMe = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await checkifUser({ _id: userId }, true);
    if (user) {
      const userTOsend = JSON.parse(JSON.stringify(user));
      delete userTOsend.password;
      res.json({ user: userTOsend });
    } else {
      res.status(400).json({ error: "user doesn't exists" });
    }
  } catch (e) {
    res.status(400).json({ error: "invalid user request !" });
  }
};

const generateToken = (id) => {
  const jwt_secrete = "secrete123";
  const token = jwt.sign({ id }, jwt_secrete, { expiresIn: "30d" });
  return token;
};

module.exports = { registerUser, loginUser, canRegister, getMe };
