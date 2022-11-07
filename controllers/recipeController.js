const {StatusCodes} = require("http-status-codes");
const recipeModel = require("../models/recipeModel");

// create new recipe
exports.createRecipe = async (req, res, next)=> {
    res.status(StatusCodes.OK).json({message:"create Recipe"});

};

// get all recipe
exports.getAllRecipe = async (req, res, next) => {
    const {name, sort, fields} = req.query;
    const queryObject = {};

    //sort query
    let sortQuery;
    sortQuery = sort?.split(",").join(" ");

    // find query
    if(name) queryObject.name = {$regex:name, $options:"i"};

    //fields select query
    let fieldQuery;
    fieldQuery = fields?.split(",").join(" ");
    console.log(fieldQuery);
    const data = await recipeModel.find(queryObject).sort(sortQuery).select(fieldQuery);
    res.status(StatusCodes.OK).json({count:data.length, result:data});};



// get recipe by id
exports.getRecipe = (req, res, next)=>{
    res.status(StatusCodes.OK).json({message:"Get Recipe"});

};

// update recipe by id
exports.updateRecipe = (req,res, next)=>{
    res.status(StatusCodes.OK).json({message:"update Recipe"});

};

// delete recipe by id
exports.deleteRecipe = (req, res, next)=>{
    res.status(StatusCodes.OK).json({message:"delete Recipe"});

};