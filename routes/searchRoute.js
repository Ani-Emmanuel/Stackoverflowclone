const Router = require("express").Router();
const searchService = require("../services/search");

Router.route("/").get(searchService.searchQuery);

module.exports = Router;
