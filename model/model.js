const mongoose = require("mongoose");

//Users schema model
const userSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    middlename: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

//Questions schema model
const questionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    question: { type: String, required: true },
    votequestion: {
      total: { type: Number, default: 0 },
      up_vote: {
        voters: [

          { type: mongoose.SchemaTypes.ObjectId, ref: "User", default: null }
        ]
      },
      down_vote: {
        voters: [

          { type: mongoose.SchemaTypes.ObjectId, ref: "User", default: null }

        ]
      }
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true
    },
    answerId: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Answ er",
        default: "none"
      }
    ]
  },
  { timestamps: true }
);

//Answers schema model
const answerSchema = mongoose.Schema(
  {
    body: { type: String, required: true, required: true },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true
    },
    questionId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Question",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = {
  User: mongoose.model("User", userSchema),
  Question: mongoose.model("Question", questionSchema),
  Answer: mongoose.model("Answer", answerSchema)
};
