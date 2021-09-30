/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postCode: {
        type: Number,
        required: false,
    },
    username: {
      type: String,
      required: false,
      unique: false,
    },
    city: {
        type: String,
        required: true,
    },
    bio: {
      type: String,
      required: false,
    }
    
  });
  
  module.exports = mongoose.model("User", UserSchema, "user");
  