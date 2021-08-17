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
        required: true,
    },
    username: {
      type: String,
      required: true,
    },
    city: {
        type: String,
        required: true,
    }
    
  });
  
  module.exports = mongoose.model("User", UserSchema, "user");
  