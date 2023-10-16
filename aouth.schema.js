const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/rahul").then(() => {
  console.log("conected to database");
});


const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});

module.exports = mongoose.model("user", userSchema);
