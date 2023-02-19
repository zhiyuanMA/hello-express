const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');
const { getAllUsers, getUser, getCurrentUser, updatePassword, updateUser } = require('../controllers/user');
const roles = require('../middleware/validate');

router.get('/all', authenticateUser, authorizePermissions('admin'), getAllUsers);
router.get('/me', authenticateUser, getCurrentUser);
router.get('/:id', authenticateUser, authorizePermissions('admin'), getUser);

router.patch('/', authenticateUser, roles({
  email: Joi.string().email().error(new Error('Invalid email')),
  name: Joi.string().min(3).max(50).error(new Error('Invalid user name')),
}), updateUser);
router.patch('/newPassword', authenticateUser, roles({
  oldPassword: Joi.string().min(8).required().error(new Error('Invalid password')),
  newPassword: Joi.string().min(8).required().error(new Error('Invalid password')),
}), updatePassword);

module.exports = router;