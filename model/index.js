const mongoose = require("mongoose");
const userSchema = require("./user");
const questionSchema = require("./question");
const answerSchema = require("./answer");

module.exports = {
  User: mongoose.model("User", userSchema()),
  Question: mongoose.model("Question", questionSchema()),
  Answer: mongoose.model("Answer", answerSchema())
};
