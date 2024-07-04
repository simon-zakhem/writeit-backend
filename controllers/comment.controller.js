const jwt = require('jsonwebtoken');
require('dotenv').config();
const { createComment, getComments, deleteComment } = require("../services/comment.service");

const createCommentController = async (req, res) => {
    const { content } = req.body;
    const { postId } = req.params;

    if (!content) {
        return res.status(401).json({ message: 'Missing Data' });
    }

    try {
        const user = req.user;
        const commentInfo = await createComment(content, user.id, postId);
        res.json(commentInfo);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCommentsController = async (req, res) => {
    try {
        const comments = await getComments(req.params.postId);
        res.json(comments);
    } catch (error) {
        console.error('Error getting comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteCommentController = async (req, res) => {
    const { id } = req.params;

    try {
        const delComment = await deleteComment(id);
        res.json(delComment);
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createCommentController,
    getCommentsController,
    deleteCommentController,
}