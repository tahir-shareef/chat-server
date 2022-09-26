const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      const user = await userModel.findById(decoded.id).select("-password");
      if (typeof user === "object") {
        req.user = user;
        next();
      } else {
        res.status(401).json({ error: "Token user not exists !" });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Token not autorized !" });
    }
  } else {
    res.status(401).json({ error: "Token not provided" });
  }
};

module.exports = protect;
