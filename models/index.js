// importing the User and Thought models
const User = require("./User");
const Thought = require("./thought");

// exporting these models as a destructered object for easy access
// since by importing the folder it looks for index.js by default
module.exports = {User, Thought};