/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
let mongoose = require("mongoose");
const users = require("./users");

let favourSchema = new mongoose.Schema({
    ownerID: {
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cost:{
        type: Number,
        required: true,
    },
    status:{
        type: Number,
        rquired: true,
    },
    city :{
        type: String,
        required: true,
    },
    streetAddress :{
        type: String,
        required: true,
    },
    operatorID :{
        type: String,
        required: false,
    },
    operatorName : {
        type: String,
        required: false
    },
    ownerName : {
        type: String,
        required : true
    },
    timestamp: {
        type: String,
        required: true
    },
    potentialOperators: {
        type: [String],
        required: false
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
    },
    completionTime: {
        type: String,
        required: false
    },
    editTime: {
        type: String,
        required: false
    }

});
module.exports = mongoose.model("Favour", favourSchema, "favour");
