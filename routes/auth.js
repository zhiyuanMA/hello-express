const express = require('express');
const { register, login, logout } = require('../controllers/auth');
const Joi = require('joi');
const router = express.Router();
const roles = require('../middleware/validate');

router.post('/register', roles({
  name: Joi.string().min(3).max(50).required().error(new Error('Invalid user name')),
  password: Joi.string().min(8).required().error(new Error('Invalid password')),
  email: Joi.string().email().required().error(new Error('Invalid email')),
}), register);
router.post('/login', roles({
  email: Joi.string().email().required().error(new Error('Invalid email')),
  password: Joi.string().min(8).required().error(new Error('Invalid password')),
}), login);
router.get('/logout', logout);

module.exports = router;