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

  const token = FoundUser.createToken();

  res.status(StatusCodes.OK).json({
    user: {
      email: FoundUser.email,
      lastName: FoundUser.lastName,
      location: FoundUser.location,
      name: FoundUser.name,
      token,
    },
  });
};
const register = async (req, res) => {
  console.log(req.body);
  const user = await User.create(req.body);
  const token = user.createToken();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};
const updateUser = async (req, res) => {
  console.log(req.user);
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;
  await user.save();
  const token = user.createToken();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
  console.log(user);
};
module.exports = {
  login,
  register,
  updateUser,
};
