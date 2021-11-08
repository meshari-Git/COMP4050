/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
require('dotenv').config()
const mongoose = require("mongoose");
const { mongoURI } = require("./config/keys");

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');


let URI = mongoURI


// Init gfs
let gfs;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  
mongoose.connection
.once("open", () => {
  // console.log("Connected to database: ", URI)
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
})
.on("error", (err) => console.log(err));

const UserSchema = require("./models/users");
const FavourSchema = require("./models/favours");

const getGFS = () => {
  return gfs
}

module.exports = {
  UserSchema,
  FavourSchema,
  getGFS
}
