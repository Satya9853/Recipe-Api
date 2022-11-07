const { StatusCodes } = require("http-status-codes");

const ErrorHandlerMiddleware = (error, req, res, next) => {
  console.log(error.errors);
  let custom = {
    message: error.message || "Something went wrong try again later",
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (error.code && error.code === 11000) {
    custom.message = `Duplicate value is entered for ${Object.keys(
      error.keyValue
    )} please enter unique value`;
    custom.statusCode = 400;
  }
  if (error.name === "Validation Error") {
    custom.message = Object.values(error.errors)
      .map((item) => item.message)
      .join(",");
    custom.statusCode = 400;
  }

  if (error.name === "CastError") {
    custom.message = `No item found with id: ${error.value}`;
    custom.statusCode = 404;
  }

  return res.status(custom.statusCode).json({ message: custom.message });
};

module.exports = ErrorHandlerMiddleware;
