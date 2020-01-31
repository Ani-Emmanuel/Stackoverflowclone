const { User, Question } = require("../model/model");

module.exports = {
  //function for get one or all questions
  getQuestion: async (req, res, next) => {
    try {
      query = {};
      //check if req.params exist
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
  askQuestion: async (verify, req, res, next) => {
    try {
      const payload = req.body;
      payload.userId = verify._id;
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
  deleteQuestion: async (verify, req, res, next) => {
    try {
      const { questionId } = req.params;
      await Question.findByIdAndDelete({ _id: questionId });
      res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  //function for updating one question
  updateQuestion: async (verify, req, res, next) => {
    try {
      const { questionId } = req.params;
      let questionUpdate = {},
        payload = req.body;

      //checks and update likes for questions
      if (payload.votequestion == "like") {
        questionUpdate = await Question.findOne({ _id: questionId });
        questionUpdate.votequestion.total =
          Number(questionUpdate.votequestion.total) + 1;
        questionUpdate.votequestion.up_vote.voters.push(verify._id);

        payload.votequestion = questionUpdate.votequestion;
        await Question.findByIdAndUpdate({ _id: questionId }, payload);

        const question = await Question.findOne({ _id: questionId });
        return res.status(200).json({
          message: "Question updated successfully",
          payload: { data: question }
        });
      }

      //checks and update dislikes for questions
      if (payload.votequestion == "dislike") {
        questionUpdate = await Question.findOne({ _id: questionId });
        questionUpdate.votequestion.total =
          Number(questionUpdate.votequestion.total) - 1;
        questionUpdate.votequestion.down_vote.voters.push(verify._id);

        payload.votequestion = questionUpdate.votequestion;
        await Question.findByIdAndUpdate({ _id: questionId }, payload);

        const question = await Question.findOne({ _id: questionId });
        return res.status(200).json({
          message: "Question updated successfully",
          payload: { data: question }
        });
      }

      await Question.findByIdAndUpdate({ _id: questionId }, payload);
      const question = await Question.findOne({ _id: questionId });

      res.status(200).json({
        message: "Question updated successfully",
        payload: { data: question }
      });
    } catch (error) {
      next(error);
    }
  }
};
