const { BadRequestError, UnauthenicatedError } = require("../errors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Password or email is empty");
  }
  const FoundUser = await User.findOne({ email: email });
  if (!FoundUser) {
    throw new UnauthenicatedError("User don't exsitst please register firs");
  }
  const isPasswordValid = await FoundUser.comparePassword(password);
  if (!isPasswordValid) {
    throw new UnauthenicatedError("Password is incorrent");
  }
  console.log(isPasswordValid);
  const token = FoundUser.createToken();

  res.status(StatusCodes.OK).json({ user: FoundUser.name, token });
};
const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createToken();
  res.status(200).json({ user: user.name, token });
};
module.exports = {
  login,
  register,
};
