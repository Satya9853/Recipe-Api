const recipeController = require("../controllers/recipeController");

const express = require("express");

const router = express.Router();

router
  .route("/")
  .post(recipeController.createRecipe)
  .get(recipeController.getAllRecipe);

router.route("/user/recipe").get(recipeController.getAllUserRecipe);

router
  .route("/user/recipe/:recipeId")
  .get(recipeController.getRecipe)
  .patch(recipeController.updateRecipe)
  .delete(recipeController.deleteRecipe);

module.exports = router;
