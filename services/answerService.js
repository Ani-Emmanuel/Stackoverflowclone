const { Answer, Question, User } = require("../model/model");
const { emailSubscription } = require("../helper/helper");

module.exports = {
  AnswerQuestion: async (verify, req, res, next) => {
    try {
      const { questionId } = req.params;
      const payload = req.body;
      payload.questionId = questionId;
      payload.userId = verify._id;

      const answer = new Answer(payload);
      const question = await Question.findById({ _id: questionId }); //getting the particular question to answer
      question.answerId.push(answer._id); //updating the answerId field in the question schema
      await question.save();
      const answered = await answer.save();

      //check to know if the user that asked the question subscribed for email notification and send email
      if (question.subscribe) {
        const { userId } = question //Getting the ID of the user that asked the question 
        const user = await User.findById({_id: userId}) //Finding the User by Its ID
        emailSubscription(user);
      }

      res.status(201).json({
        message: "Thank you for you answer",
        payload: { data: answered }
      });
    } catch (error) {
      next(error);
    }
  },

  deleteAnswer: async (verify, req, res, next) => {
    try {
      const { answerId } = req.params;
      await Answer.findByIdAndDelete({ _id: answerId });
      res.status(200).json({ message: "Answer deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  updateAnswer: async (verify, req, res, next) => {
    try {
      const { answerId } = req.params;
      const payload = req.body;
      const updatedAnswer = await Answer.findByIdAndUpdate(
        { _id: answerId },
        payload
      );
      res.status(200).json({
        message: "Answer updated successfully",
        payload: { data: updatedAnswer }
      });
    } catch (error) {
      next(error);
    }
  },

  getAnswer: async (req, res, next) => {
    try {
      query = {};
      if (req.params.answerId) {
        const { answerId } = req.params;
        query._id = answerId;
      }
      const answer = await Answer.find(query);
      res.status(200).json({ payload: { data: answer } });
    } catch (error) {
      next(error);
    }
  }
};
