const { constants } = require("../constants");

const validator = (requestProperty, fields) => {
  return (req, res, next) => {
    const data = req[requestProperty]; // req.body can be written as req['body']
    let errors = [];
    fields.forEach((field) => {
      if (data[field] == null || data[field].length === 0) {
        errors.push(`${field} is missing`);
      }
    });

    if (errors.length === fields.length) return next({
      statusCode: constants.VALIDATION_ERROR,
      message: { errors, msg: "All fields are required!" },
    });

    if (errors.length > 0) return next({
      statusCode: constants.VALIDATION_ERROR,
      message: errors,
    });
    
    next();
  }
}

module.exports = {
  validator
};