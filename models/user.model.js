const mongoose = require('mongoose');
// or
// import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        minLength : 10,
        lowercase : true
    },
    userType : {
        type : String,
        required : true,
        default : "CUSTOMER",
        enum : ["CUSTOMER", "ADMIN"]
    }
}, {timestamps : true});

// Define the collection name where it will be stored

module.exports = mongoose.model("User", userSchema);