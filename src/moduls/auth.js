const joi = require("joi")
const mongoose = require("mongoose")
const authSchema = mongoose.model("auth", mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    password: { type: String },
    verify: { type: String },
    otp: {
        type: String,
        unique: false,
    },

}))
exports.authSchema = authSchema;