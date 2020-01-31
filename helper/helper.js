const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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

//function for generating jsonwebtoken using user Id
const tokenGen = async id => {
  const token = await jwt.sign({ _id: id }, process.env.SECRET);
  return token;
};

//middleware that verify token
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

//Scribe for Email
const emailSubscription = async document => {
  const { email } = document;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
      user: process.env.email, // like : abc@gmail.com
      pass: process.env.password // like : pass@123
    }
    //   host: "localhost",
    //   port: 25,
    //   tls: {
    //     rejectUnauthorized: false
    //   }
  });

  const config = {
    from: "noreply@domain.com",
    to: `${email}`,
    subject: "Some one answered your question",
    html: "<p>Login to your account to check the answer</p>"
  };

  transporter.sendMail(config).catch(e => {
    console.log(e);
  });
};

module.exports = { hashOperation, comparePass, tokenGen, verification, emailSubscription };
