const { User, Question } = require("../model/model");

module.exports = {
  //function for get one or all questions
  getQuestion: async (req, res, next) => {
    try {
      query = {};
      if (req.params.questionId) {
        const { questionId } = req.params;
        query._id = questionId;
      }
      const askedQuestion = await Question.find(query);
      res.status(200).json({ payload: { data: askedQuestion } });
    } catch (error) {
      next(next);
    }
  },

  //function for creating questions
  askQuestion: async (req, res, next) => {
    try {
      const question = new Question(req.body);
      const createQuestion = await question.save();
      res.status(201).json({
        message: "Question created successfully",
        payload: { data: createQuestion }
      });
    } catch (error) {
      next(error);
    }
  },

  //function for deleting one question
  deleteQuestion: async (req, res, next) => {
    try {
      const { questionId } = req.params;
      await Question.findByIdAndDelete({ _id: questionId });
      res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  //function for updating one question
  updateQuestion: async (req, res, next) => {
    try {
      const { questionId } = req.params;
      let questionUpdate = {},
        payload;
      payload = req.body;
      if (payload.votequestion == "like") {
        questionUpdate = await Question.find({ _id: questionId });
        questionUpdate.total = Number(questionUpdate.total) + 1;
        questionUpdate.up_vote.voters.push(userId); //still to impliment the userid
      }
      if (payload.votequestion == "dislike") {
        questionUpdate = await Question.find({ _id: questionId });
        questionUpdate.total = Number(questionUpdate.total) - 1;
        questionUpdate.down_vote.voters.push(userId); //still to impliment the userid
      }
      payload.votequestion = questionUpdate;
      const question = await Question.findByIdAndUpdate(
        { _id: questionId },
        payload
      );
      res.status(200).json({
        message: "Question updated successfully",
        payload: { data: question }
      });
    } catch (error) {
      next(error);
    }
  }
};
