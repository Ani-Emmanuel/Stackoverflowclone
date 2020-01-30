const Router = require("express").Router();
const userService = require("../services/userService");
const { logIn, logOut } = require("../auth/authorization");

//User Routes
Router.route("/").get(userService.index);
Router.route("/:userId").get(userService.index);
Router.route("/create").post(userService.register);
Router.route("/update/:userId").put(userService.updateUser);
Router.route("/delete/:userId").delete(userService.deleteUser);
Router.route("/login").post(logIn);
Router.route("/logout").post(logOut);

module.exports = Router;
