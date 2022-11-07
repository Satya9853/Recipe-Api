const { StatusCodes } = require("http-status-codes");
const recipeModel = require("../models/recipeModel");
const { BadRequestError, NotFoundError } = require("../errors/error-index");

// create new recipe
exports.createRecipe = async (req, res, next) => {
  req.body.createdBy = req.user._id;
  const recipe = await recipeModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ recipe });
};

// get all recipe
exports.getAllRecipe = async (req, res, next) => {
  const { name, sort, fields } = req.query;
  const queryObject = {};

  //sort query
  let sortQuery;
  sortQuery = sort?.split(",").join(" ");

  // find query
  if (name) queryObject.name = { $regex: name, $options: "i" };

  //fields select query
  let fieldQuery;
  fieldQuery = fields?.split(",").join(" ");
  console.log(fieldQuery);
  const data = await recipeModel
    .find(queryObject)
    .sort(sortQuery)
    .select(fieldQuery);
  res.status(StatusCodes.OK).json({ count: data.length, result: data });
};

// get recipe by User_id
exports.getAllUserRecipe = async (req, res, next) => {
  console.log(req.user);
  const {
    user: { _id: userId },
    params: { userId: params_userId },
  } = req;

  if (userId != params_userId) {
    throw new BadRequestError("Invalid User id");
  }
  const recipe = await recipeModel.find({ createdBy: userId });
  if (!recipe) {
    throw new NotFoundError(`No recipe found with userId ${userId}`);
  }
  res.status(StatusCodes.OK).json({ recipe });
};

exports.getRecipe = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ message: "get Recipe Recipe" });
};

// update recipe by id
exports.updateRecipe = (req, res, next) => {
  res.status(StatusCodes.OK).json({ message: "update Recipe" });
};

// delete recipe by id
exports.deleteRecipe = (req, res, next) => {
  res.status(StatusCodes.OK).json({ message: "delete Recipe" });
};
