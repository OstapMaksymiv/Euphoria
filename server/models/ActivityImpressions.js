const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const ActivityImpressionsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('ActivityImpressions',ActivityImpressionsSchema)