let mongoose = require("mongoose");
const users = require("./users");

let favourSchema = new mongoose.Schema({
    ownerID: {
        type: users,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    status:{
        type: Number,
        rquired: true,
    },
    cost:{
        type: Number,
        required: true,
    },
    operatorID :{
        type: users,
        required: true,
    },
    city :{
        type: String,
        required: true,
    },
    streetAddress :{
        type: String,
        required: true,
    },


})