const jwt = require("jsonwebtoken");
const { constants } = require("../constants");

const tokenValidator = async (req, res, next) => {
  let authToken;
  let authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    authToken = authHeader.split(' ')[1];
    
    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return next({
        statusCode: constants.UNAUTHORIZED,
        message: "User is not authorized"
      })
      req.user = decoded.user;
      next();
    })
  } else return next({
    statusCode: constants.UNAUTHORIZED,
    message: "Authorization header missing or invalid"
  })
};

module.exports = {
  tokenValidator,
}