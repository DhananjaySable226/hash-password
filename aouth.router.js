
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");


const AouthService = require("../service/aouth.service");
const User = require("../model/aouth.schema");


const authRoute = express.Router();

authRoute.use(bodyParser.json());



authRoute.post("/register", async (req, res) => {
  try {
    const userObject = req.body;
    const name = userObject.name;
    const password = userObject.password;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name: name,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      id: user._id,
      message: "User registered successfully",
      name: name,
      data: hashedPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRoute.post("/login", async (req, res) => {
  const userObject = req.body;
  const name = userObject.name;

  const password = userObject.password;

  const user = await AouthService.login(name, password);

  if (user == null) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "not found",
    });
  } else {
    res.status(200).json({
      status: "success",
      code: 200,
      message: "fetch successfully",
      data: user,
    });
  }
});

authRoute.put("/update/:id", async (req, res) => {
  try {
    const result = await AouthService.updateData(req.params.id, req.body);
    res.status(200).json({
      status: 200,
      massage: "updated successfull",
      success: true,
    });
    console.log(result);
  } catch (err) {
    res.status(500).json({
      code: 500,
      success: false,
      massage: err,
    });
  }
});

authRoute.delete("/delete/:id", async (req, res) => {
  const result = await AouthService.deleteData(req.params.id);
  console.log(result);
  res.status(200).json({
    data: result,
    massage: "data deleted",
    code: 200,
    success: true,
  });
});

authRoute.put("/put/:id", async (req, res) => {
  try {
    const result = await AouthService.updateCollection(req.params.id, req.body);

    res.status(200).json({
      status: 200,
      massage: "updated successfull",
      success: true,
    });
    console.log(result);
  } catch (err) {
    res.status(500).json({
      code: 500,
      success: false,
      massage: err,
    });
  }
});

module.exports = authRoute;
