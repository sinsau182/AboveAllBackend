// error.js
const httpStatus = require('http-status');

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 *
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false) {
    super(message, status, isPublic);
  }
}

/**
 * Class for required error
 *
 * @class RequiredError
 */
class RequiredError {
  static makePretty(errors) {
    return errors.reduce((obj, error) => {
      const nObj = obj;
      nObj[error.field] = error.messages[0].replace(/"/g, '');
      return nObj;
    }, {});
  }

  static makeValidationsPretty(errors) {
    return errors.reduce((obj, error) => {
      const nObj = obj;
      return { ...nObj, ...error };
    }, {});
  }
}

module.exports = {
  APIError,
  RequiredError
};
