const express = require("express");
const bodyParser = require("body-parser");
require("mongoose");

const authRouter = require("./routes/aouth.router");

const app = express();
const port = 4000;

app.use(bodyParser.json());


function heathcheck(req, res) {
  res.status(200).json({
    message: "server is running...!",
    code: 200,
    status: "success",
  });
}

app.get("/healthcheck", heathcheck);


app.use("/auth", authRouter); // Use the correct route path

app.listen(port, () => {
  console.log("healthcheck API is running 4000");
});
