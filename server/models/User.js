const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true
    }
})
module.exports = mongoose.model('User', UserSchema)