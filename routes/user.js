const express = require('express');
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');
const { getAllUsers, getUser, getCurrentUser, updatePassword, updateUser } = require('../controllers/user');

router.route('/all').get(authenticateUser, authorizePermissions, getAllUsers);
router.route('/me').get(authenticateUser, getCurrentUser);
router.route('/:id').get(authenticateUser, getUser);

router.route('/').patch(authenticateUser, updateUser);
router.route('/newPassword').patch(authenticateUser, updatePassword);

module.exports = router;