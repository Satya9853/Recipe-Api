// environment
require("dotenv").config();

// for catching async errors
require("express-async-errors");

// connecting to data base
const connectDB = require("./db/connect");

// packege require
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//local import
const ErrorHandlerMiddleware = require("./middlewares/Error-handler");
const NotFoundMiddlware = require("./middlewares/Not-found");
const recipeRouter = require("./routes/recipeRouter");
const authRouter = require("./routes/authRouter");

// required middleware
app.use(bodyParser.json());

// route middleware
app.use("/api/v1/recipe", authRouter);
app.use("/api/v1/recipe", recipeRouter);

// error middleware
app.use(NotFoundMiddlware);
app.use(ErrorHandlerMiddleware);

// start server
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
