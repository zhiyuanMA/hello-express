const { UnauthorizedError } = require('../errors');

const checkPermissions = (reqUser, ownerId) => {
  if (reqUser.role === 'admin') {
    return;
  }

  if (reqUser.userId === ownerId.toString()) {
    return;
  }

  throw new UnauthorizedError('Not authorized to access this route');
};

module.exports = checkPermissions;