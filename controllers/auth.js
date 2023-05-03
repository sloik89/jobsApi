const { BadRequestError, UnauthenicatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Password or email is empty");
  }
  const FoundUser = await User.findOne({ email: email });
  if (!FoundUser) {
    throw new BadRequestError("User don't exsitst please register firs");
  }
  console.log(FoundUser);
  res.status(200).send("some login route");
};
const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createToken();
  res.status(200).json({ name: user.name, token });
};
module.exports = {
  login,
  register,
};
