const { StatusCodes } = require('http-status-codes');
const CustomAPIErr = require('./custom-api');

class BadRequestError extends CustomAPIErr {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;