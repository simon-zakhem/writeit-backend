const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: {type: String, required: true, min: 4, unique: true},
    email: {type: String, required: true, min: 4, unique: true},
    password: {type: String, required: true, min: 4},
    bio: {type: String, required: false},
    profile: {type: String, required: false},
    cover: {type: String, required: false},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    following: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;