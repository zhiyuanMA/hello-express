const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { addToCookies, createUserDto } = require('../utils');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  const user = await User.create({ name, email, password });
  const userDto = createUserDto(user);
  addToCookies({ res, user: userDto });
  res.status(StatusCodes.CREATED).json({ user: userDto });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  const userDto = createUserDto(user);
  addToCookies({ res, user: userDto });

  res.status(StatusCodes.OK).json({ user: userDto });

};

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  res.status(StatusCodes.OK).json({ mesage: 'user logged out' });
};

module.exports = {
  login,
  logout,
  register,
}