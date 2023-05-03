const { UnauthenicatedError } = require("../errors");
const jwt = require("jsonwebtoken");
const authenticationMiddleware = async (req, res, next) => {
  console.log("jestem w authceticaion middleware");
  next();
};
module.exports = authenticationMiddleware;
