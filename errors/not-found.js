const { StatusCodes } = require('http-status-codes');
const CustomAPIErr = require('./custom-api');

class NotFoundError extends CustomAPIErr {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;