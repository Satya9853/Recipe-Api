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
  const data = await recipeModel
    .find(queryObject)
    .sort(sortQuery)
    .select(fieldQuery);
  res.status(StatusCodes.OK).json({ count: data.length, result: data });
};

// get recipe by User_id
exports.getAllUserRecipe = async (req, res, next) => {
  const {
    user: { _id: userId },
    query: { name, sort, fields },
  } = req;

  let queryObject = {};

  // search by userId
  queryObject.createdBy = userId;

  //  search object by name
  if (name) queryObject.name = { $regex: name, $options: "i" };

  //sort query
  let sortQuery;
  sortQuery = sort?.split(",").join(" ");

  // fields select query
  let fieldQuery;
  fieldQuery = fields?.split(",").join(" ");

  const recipe = await recipeModel
    .find(queryObject)
    .sort(sortQuery)
    .select(fieldQuery);
  if (!recipe) {
    throw new NotFoundError(`No recipe found with userId ${userId}`);
  }
  res.status(StatusCodes.OK).json({ recipe });
};

exports.getRecipe = async (req, res, next) => {
  const {
    user: { _id: userId },
    params: { recipeId },
  } = req;

  const recipe = await recipeModel.findOne({
    _id: recipeId,
    createdBy: userId,
  });

  if (!recipe) {
    throw new NotFoundError(`No Recipe with id ${recipeId}`);
  }
  res.status(StatusCodes.OK).json(recipe);
};

// update recipe by id
exports.updateRecipe = async (req, res, next) => {
  const {
    user: { _id: userId },
    params: { recipeId },
    body: { name, ingredients, steps },
  } = req;
  if (name === "" || ingredients === "" || steps === "") {
    throw new BadRequestError("Please Provide Valid name, ingredients, steps");
  }

  const recipe = await recipeModel.findByIdAndUpdate(
    {
      _id: recipeId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!recipe) {
    throw new NotFoundError(`No Recipe with id ${recipeId}`);
  }
  res.status(StatusCodes.OK).json(recipe);
};

// delete recipe by id
exports.deleteRecipe = async (req, res, next) => {
  const {
    user: { _id: userId },
    params: { recipeId },
  } = req;

  const recipe = await recipeModel.findOneAndRemove({
    _id: recipeId,
    createdBy: userId,
  });

  if (!recipe) {
    throw new NotFoundError(`No Recipe with id ${recipeId}`);
  }
  res.status(StatusCodes.OK).json(recipe);
};
