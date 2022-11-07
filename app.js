// environment
require("dotenv").config();

// for catching async errors
require("express-async-errors");

// connecting to data base
const connectDB = require("./db/connect");

// packege require
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const app = express();

//local import
const ErrorHandlerMiddleware = require("./middlewares/Error-handler");
const NotFoundMiddlware = require("./middlewares/Not-found");
const authMiddleware = require("./middlewares/authentication");
const recipeRouter = require("./routes/recipeRouter");
const authRouter = require("./routes/authRouter");

// required middleware
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//Test Route
app.use("/", (req, res, next) => {
  res.send("Recipe Api");
  next();
});

// route middleware
app.use("/api/v1", authRouter);
app.use(authMiddleware);
app.use("/api/v1", recipeRouter);

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
