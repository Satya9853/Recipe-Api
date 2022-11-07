const UserModel = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
} = require("../errors/error-index");

exports.register = async (req, res, next) => {
  const user = await UserModel.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please Provide email and password");
  }

  //find user in our data base
  const user = await UserModel.findOne({ email });
  // check if user exist in our database
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  //check if password is matching
  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Incorrect Password");
  }

  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, id: user._id }, token });
};
