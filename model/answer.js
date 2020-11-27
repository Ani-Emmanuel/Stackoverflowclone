const mongoose = require("mongoose");

//Answers schema model
function answerSchemas() {
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

  answerSchema.indexes({ body: "text" });
}

module.exports = answerSchemas;
