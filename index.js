const express = require("express");
const bodyparser = require("body-parser");
const userRoute = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");
const searchRoute = require("./routes/searchRoute");

const app = express();

require("./db/db");

const port = process.env.PORT || 3000;
//Middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//Routes
app.use("/user", userRoute);
app.use("/question", questionRoute);
app.use("/answer", answerRoute);
app.use("/search", searchRoute);

//catching not found errors
app.use((req, res, next) => {
  const err = new Error("Not Found");
  res.statusCode = 404;
  next(err);
});

//catching all errors
app.use((err, req, res, nexr) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  res.status(status).json({ error: { message: error.message } });
});

module.exports = app;
// app.listen(port, () => console.log(`Server started on localhost:${port}`));


