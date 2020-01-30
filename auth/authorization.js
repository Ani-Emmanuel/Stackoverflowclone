const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../model/model");
const { tokenGen, comparePass } = require("../helper/helper");

module.exports = {
  logIn: async (req, res, next) => {
    try {
      //Checking if the user is registered
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Please create an account to be able to login" });
      }

      //checking if the password is valid
      const hashedPassword = user.password;
      const checkPassword = await comparePass(password, hashedPassword);
      if (!checkPassword) {
        return res.status(400).json({ message: "Incorrect Password" });
      }

      //Generating token and login the loggin the user in
      const token = await tokenGen(user._id);
      res.header("auth-token", token);
      res.status(200).json({
        message: "You are loggedin successfully",
        token: { data: token }
      });
    } catch (error) {
      next(error);
    }
  },

  logOut: async (req, res, next) => {
    try {
      res.header("auth-token", null);
      res.status(200).json({ message: "User loggedOut" });
    } catch (error) {
      next(error);
    }
  }
};
