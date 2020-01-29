const mongoose = require("mongoose");

//Users schema model
const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  middlename: { type: String, rAnswerequired: true },
  email: { type: String, required: true },
  username: { type: String, required: true, max: 12 },
  password: { type: String, required: true }
});

//Questions schema model
const questionSchema = mongoose.Schema({
  title: { type: String, required: true },
  question: { type: String, required: true },
  votequestion: {
    up_vote: {
      total: { type: Number, default: 0 },
      voters: [
        {
          user_id: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }
        }
      ]
    },
    down_vote: {
      total: { type: Number, default: 0 },
      voters: [
        {
          user_id: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }
        }
      ]
    }
  },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  answers: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Answer",
    default: "none"
  }
});

//Answers schema model
const answerSchema = mongoose.Schema({
  body: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true }
});

module.exports = {
  User: mongoose.model("User", userSchema),
  Question: mongoose.model("Question", questionSchema),
  Answer: mongoose.model("Answer", answerSchema)
};
