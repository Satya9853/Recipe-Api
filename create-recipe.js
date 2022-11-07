require("dotenv").config();
const connectDB = require("./db/connect");
const model = require("./models/recipeModel");
const data = require("./recipes.json");

const connect = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await model.deleteMany();
    await model.create(data);
    console.log("Sucess");
    process.exit(1);
  } catch (error) {
    console.log(error);
  }
};

connect();
