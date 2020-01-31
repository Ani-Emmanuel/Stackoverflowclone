const { User, Question, Answer } = require("../model/model");

module.exports = {
  searchQuery: async (req, res, next) => {
    try {
      const { type, search } = req.query;

      //searching in the user schema
      if (type == "user") {
        // console.log("hello world");
        const users = await User.find({
          $text: { $search: search }
        });

        return res.status(200).json({ payload: { data: users } });
      }

      //searching in the question schema
      if (type == "question") {
        console.log("hello world");
        const question = await Question.find({
          $text: { $search: search }
        });

        return res.status(200).json({ payload: { data: question } });
      }

      //Searching in the answer schema
      if (type == "anwser") {
        const anwser = await Answer.find({
          $text: { $search: search }
        });

        return res.status(200).json({ payload: { data: anwser } });
      }

      res.status(404).json({
        message:
          "please use the correct formate {'type' to specify whether question, user or answer and 'search' to specify what you are searching for}"
      });
    } catch (error) {
      next(error);
    }
  }
};
