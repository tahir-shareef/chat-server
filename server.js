const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = 6500;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Api Requests
app.get("/", (req, res) => {
  res.send("Hello Tahir !");
});
app.use(
  "/api/user",
  (req, res, next) => {
    console.log(req.url, req.body);
    next();
  },
  require("./routes/userRoutes")
);

//--Connecting Database and Listening Server
connectDB();
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
