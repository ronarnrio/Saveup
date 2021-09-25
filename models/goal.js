const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goalSchema = new Schema({
    name: String,
    description: String,
    cost: String,
    deposit: String
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = {
    Goal,
    goalSchema
} 