const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CommentSchema = new Schema({
    content: String,
    postedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    story: {type: Schema.Types.ObjectId, ref: 'Post'}
}, {
    timestamps: true,
})

const CommentModel = model('Comment', CommentSchema);

module.exports = CommentModel;