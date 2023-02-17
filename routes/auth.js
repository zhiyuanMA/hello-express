const express = require('express');
const { register, login, logout } = require('../controllers/auth');
const Joi = require('joi');
const router = express.Router();
const roles = require('../middleware/validate');

router.post('/register', roles({
  name: Joi.string().min(3).max(50).required().error(new Error('invalid user name')),
  password: Joi.string().min(8).required().error(new Error('invalid password')),
  email: Joi.string().email().required().error(new Error('invalid email')),
}), register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;