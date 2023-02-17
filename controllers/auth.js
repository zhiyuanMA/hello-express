const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { addToCookies, createUserDto } = require('../utils');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const isExist = await User.findOne({ email });//todo
  if (isExist) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  const user = await User.create({ name, email, password });
  const userDto = createUserDto(user);
  addToCookies({ res, user: userDto });
  res.status(StatusCodes.CREATED).json({ user: userDto });
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