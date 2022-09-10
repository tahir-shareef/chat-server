const express = require("express");
const app = express();
const port = 6500;

app.get("/", (req, res) => {
  res.send("Hello Tahir !");
});

app.use("/api/user", require("./routes/userRoutes"));

// Listening Server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
