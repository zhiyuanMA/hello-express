const { UnauthenticatedError, UnauthorizedError } = require('../errors');
const { isValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid');
  }

  try {
    const { name, userId, role } = isValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
  };
};

module.exports = { authorizePermissions, authenticateUser };