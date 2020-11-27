const mongoose = require("mongoose");

//Users schema model
function userSchemas() {
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

  //creating index for search in the schemas
  userSchema.indexes({
    firstname: "text",
    lastname: "text",
    middlename: "text",
    email: "text"
  });
}

module.exports = userSchemas;
