//simple express server
const express = require("express");
const app = express();
const port = 3001;
//resolve CORS error
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get("/", (req, res) => res.send("Hello World!"));

app.use(express.json())

app.use("/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
