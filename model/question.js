const mongoose = require("mongoose");

//Questions schema model
function questionSchemas() {
  const questionSchema = mongoose.Schema(
    {
      title: { type: String, required: true },
      question: { type: String, required: true },
      subscribe: { type: Boolean, default: false },
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

  questionSchema.indexes({ title: "text", question: "text" });
}

module.exports = questionSchemas;
