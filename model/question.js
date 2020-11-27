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







async store(req, res) {
        req.checkBody('title', 'title is required').notEmpty();
        req.checkBody('description', 'description is required').notEmpty();
        req.checkBody('tag', 'tag is required').notEmpty();

        this.escapeAndTrim(req, 'title description');

        if (this.showValidationErrors(req, res))
            return;

        await this.model.Course.findById(req.body.course_id, async (err, course) => {
            let tag_id = req.body.tag;
            let newStory = new this.model.Story({
                course: course._id,
                title: req.body.title,
                description: req.body.description
            });

              newStory.tag.push(tag_id);

              await newStory.save(err => {
                if (err) throw err;

                // course.story.push(newStory._id);
                // course.save();

                res.json({
                    data: newStory,
                    success: true
                });
            });
        });

    }
