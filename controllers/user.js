const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  addToCookies,
  checkPermissions,
  createUserDto,
} = require('../utils');

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ users });
};

const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password');
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
  }

  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  const user = await User.findOneAndUpdate({ _id: req.user.userId }, { email, name }, { new: true, runValidators: true });
  const userDto = createUserDto(user);
  addToCookies({ res, user: userDto });
  res.status(StatusCodes.OK).json({ user: userDto });
};

const updatePassword = async (req, res) => {
  const id = req.params.id;
  const { oldPassword, newPassword } = req.body;
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${id}`);
  }

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ message: 'Success! Password Updated.' });
};

module.exports = {
  getAllUsers,
  getUser,
  getCurrentUser,
  updatePassword,
  updateUser,
};