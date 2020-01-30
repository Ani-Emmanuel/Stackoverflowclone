const Router = require("express").Router();
const questionService = require("../services/questionService");
const { verification } = require("../helper/helper");

//Question Routes
Router.route("/").get(questionService.getQuestion);
Router.route("/create").post(verification, questionService.askQuestion);
Router.route("/:questionId").get(questionService.getQuestion);
Router.route("/:questionId").put(verification, questionService.updateQuestion);
Router.route("/delete/:questionId").delete(
  verification,
  questionService.deleteQuestion
);

module.exports = Router;
