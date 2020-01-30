const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

module.exports = { hashOperation, comparePass, tokenGen, verification };
