const Router = require("express").Router();
const answerService = require("../services/answerService");
const { verification } = require("../helper/helper");

//Answer Routes
Router.route("/").get(answerService.getAnswer);
Router.route("/:answerId").get(answerService.getAnswer);
Router.route("/:questionId").post(verification, answerService.AnswerQuestion);
Router.route("/delete/:answerId").delete(
  verification,
  answerService.deleteAnswer
);
Router.route("/update/:answerId").put(varification, answerService.updateAnswer);

module.exports = Router;
