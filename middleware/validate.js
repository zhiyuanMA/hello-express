const Joi = require('joi');
const { BadRequestError } = require('../errors');

const roles = (data = {}, errMsg = {}, content = 'body') => {
  data.token = Joi.allow();
  const schema = Joi.object(data);
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req[content], data);
      next();
    } catch (error) {
      throw new BadRequestError(error.message ? error.message : errMsg[error.details[0].context.key]);
    }
  };
};

module.exports = roles;