const express = require('express')  
const database = require('../database')
const User = database.UserSchema;
const Favour = database.FavourSchema;

const apiRouter = express.Router()






module.exports = apiRouter