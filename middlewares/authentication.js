const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/unauthenticated-error");

const auth = async (req, res, next) => {
  // check headers
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(payload.userId).select("-password");
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
