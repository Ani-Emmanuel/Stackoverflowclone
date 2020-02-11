const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Question } = require("../model/model");

//function for hashing password before storing
const hashOperation = async password => {
  const hash = await bcrypt.genSalt(10);
  const hashedpass = await bcrypt.hash(password, hash);
  return hashedpass;
};

//function for comparing user password with database password
const comparePass = async (password, hashedpass) => {
  const passwordChecker = await bcrypt.compare(password, hashedpass);
  return passwordChecker;
};

//function for generating jsonwebtoken using user ID
const tokenGen = async id => {
  const token = await jwt.sign({ _id: id }, process.env.SECRET);
  return token;
};

//middleware that verify token then passes the payload down through next
const verification = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ message: "You have to login to perform this action" });
  }
  try {
    const verify = jwt.verify(token, process.env.SECRET);
    if (verify) next(verify);
  } catch (error) {
    next(error);
  }
};

//upvote and downvote function
const upvote_or_downvote = async (req, res, verify, payload) => {
  let questionUpdate = {};
  const { questionId } = req.params;

  //checks and update upvote for questions
  if (payload.votequestion == "upvote") {
    questionUpdate = await Question.findOne({ _id: questionId });

    //check and remove the ID of the voter if they have already voted down
    if (questionUpdate.votequestion.down_vote.voters.indexOf(verify._id) > -1) {
      const index = questionUpdate.votequestion.down_vote.voters.indexOf(
        verify._id
      );
      questionUpdate.votequestion.down_vote.voters.splice(index, 1);
    }

    questionUpdate.votequestion.total =
      Number(questionUpdate.votequestion.total) + 1; //Updating the total vote count
    questionUpdate.votequestion.up_vote.voters.push(verify._id); //Adding the ID of the user that upvoted

    payload.votequestion = questionUpdate.votequestion; //Update the payload votequestion document
    await Question.findByIdAndUpdate({ _id: questionId }, payload);

    const question = await Question.findOne({ _id: questionId });
    return res.status(200).json({
      message: "Question updated successfully",
      payload: { data: question }
    });
  }

  //checks and update downvote for questions
  if (payload.votequestion == "downvote") {
    questionUpdate = await Question.findOne({ _id: questionId });

    //check and remove the ID of the voter if they have already voted up
    if (questionUpdate.votequestion.up_vote.voters.indexOf(verify._id) > -1) {
      const index = questionUpdate.votequestion.up_vote.voters.indexOf(
        verify._id
      );
      questionUpdate.votequestion.up_vote.voters.splice(index, 1);
    }

    questionUpdate.votequestion.total =
      Number(questionUpdate.votequestion.total) - 1; //Updating the total count
    questionUpdate.votequestion.down_vote.voters.push(verify._id); //Adding the ID of the user that down voted

    payload.votequestion = questionUpdate.votequestion; // Updating the payload votequestion document
    await Question.findByIdAndUpdate({ _id: questionId }, payload);

    const question = await Question.findOne({ _id: questionId });
    return res.status(200).json({
      message: "Question updated successfully",
      payload: { data: question }
    });
  }
};

//Scribe for Email
const emailSubscription = async document => {
  const { email } = document;
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL, // like : abc@gmail.com
      pass: process.env.PASSWORD // like : pass@123
    }
  });

  const config = {
    from: `${process.env.EMAIL}`,
    to: `${email}`,
    subject: "Some one answered your question",
    html: "<p>Login to your account to check the answer</p>"
  };

  transporter.sendMail(config).catch(e => {
    console.log(e);
  });
};

module.exports = {
  hashOperation,
  comparePass,
  tokenGen,
  verification,
  emailSubscription,
  upvote_or_downvote
};
