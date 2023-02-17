const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { addToCookies, createUser } = require('../utils');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  let user = await User.create({ name, email, password });
  user = createUser(user);
  addToCookies({ res, user });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {

};

const logout = async (req, res) => {
  res.cookie();
};

module.exports = {
  login,
  logout,
  register,
}