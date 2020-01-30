const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/stackoverflow";
mongoose.connect(
  DB_URL,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
  () => console.log("DB connected successfully")
);
