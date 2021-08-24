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
        type: Number,
        required: false,
    }

});
module.exports = mongoose.model("Favour", favourSchema, "favour");
