const Comment = require('../models/Comment');

const createComment = async (content, userid, postid) => {
    try{
        const commentInfo = await Comment.create({
            content,
            postedBy: userid,
            story: postid,
        });
        return {status: 200, data: commentInfo};
    } catch(err){
        console.error('Error creating comment:', err);
        return {status: 400, message: 'Failed to create comment'};
    }
}

const getComments = async (postId) => {
    try {
        const comments = await Comment.find({story: postId}).populate('postedBy', 'username').sort({ createdAt: -1 }).limit(20);
        return {status: 200, data: comments};
    } catch (error) {
        console.error('Error getting comments:', error);
        return {status: 400, message: 'Failed to get comments'};
    }
}

const deleteComment = async (commentId) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return {status: 404, message: 'Comment not found'};
        }

        return {status: 200, message: 'Comment deleted successfully'};
    } catch (error) {
        console.error('Error deleting comment:', error);
        return {status: 400, message: 'Failed to delete comment'};
    }
}; 

module.exports = {
    createComment,
    getComments,
    deleteComment,
}