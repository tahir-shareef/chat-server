const protect = (req, res, next) => {
  console.log("no protection bro ");
  next();
};
module.exports = protect;
