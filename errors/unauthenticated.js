const { StatusCodes } = require('http-status-codes');
const CustomAPIErr = require('./custom-api');

class UnauthenticatedError extends CustomAPIErr {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;