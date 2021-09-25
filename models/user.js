const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = require('./goal').goalSchema

const userSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
    githubId: String,
    facebookId: String,
    goals: [goalSchema]
})

module.exports = mongoose.model('User', userSchema)