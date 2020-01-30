const { User } = require("../model/model");
const bcrypt = require("bcryptjs");
const { hashOperation } = require("../helper/helper");
module.exports = {
  //function for registering as a user
  register: async (req, res, next) => {
    try {
      //check if user already exist
      const { email } = req.body;
      const emailExist = await User.findOne({ email: email });
      if (emailExist) {
        return res
          .status(400)
          .json({ message: "User with email already exists" });
      }

      //registering User
      const user = new User(req.body);
      const { password } = user;
      const hashedpass = await hashOperation(password);
      console.log(hashedpass);
      user.password = hashedpass;
      user.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      next(error);
    }
  },

  //function for getting one or all the users
  index: async (req, res, next) => {
    try {
      let query = {};
      //check if req.params exist
      if (req.params.userId) {
        query = {
          _id: req.params.userId
        };
      }
      const users = await User.find(query);
      res.status(200).json({ payload: { users: users } });
    } catch (error) {
      next(error);
    }
  },

  //function for updateing one users
  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true
      });
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      next(error);
    }
  },

  //function for deleting a users
  deleteUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
};
