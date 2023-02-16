const { StatusCodes } = require('http-status-codes');
const CustomAPIErr = require('./custom-api');

class UnauthorizedError extends CustomAPIErr {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;