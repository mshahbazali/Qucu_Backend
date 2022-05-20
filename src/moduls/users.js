const mongoose = require("mongoose")
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: false
    },
    email: {
        type: String,
        unique: false,
        trim: true,

    },
    password: {
        type: String,
        unique: false,
        trim: true,

    }
})

const Users = new mongoose.model("users", usersSchema)

module.exports = Users