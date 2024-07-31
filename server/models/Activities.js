const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitiesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true 
    },
    text: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    first_img: {
        type: String,
        required: true
    },
    second_img: {
        type: String,
        required: true 
    },
    third_img: {
        type: String,
        required: true  
    }

});

module.exports = mongoose.model('Activities', ActivitiesSchema);
