const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/error-index");

const auth = async (req, res, next) => {
  // check headers
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid 1");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(payload.userId).select("-password");
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid 2");
  }
};

module.exports = auth;
