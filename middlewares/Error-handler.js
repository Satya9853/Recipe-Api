const { StatusCodes } = require("http-status-codes");

const ErrorHandlerMiddleware = (error, req, res, next) => {
  console.log(error);
  let custom = {
    message: error.message || "Something went wrong try again later",
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };
  return res.status(custom.statusCode).json({ message: custom.message });
};

module.exports = ErrorHandlerMiddleware;
