const Post = require('../models/Post');

const createPost = async (title, summary, content, cover, authorId) => {
    try {
        const postInfo = await Post.create({
            title,
            summary,
            cover,
            content,
            author: authorId,
        });
        return {status: 200, data: postInfo};
    } catch (error) {
        console.error('Error creating post:', error);
        return {status: 400, message: 'Failed to create post'};
    }
};

const getPosts = async () => {
    try {
        const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20);
        return {status: 200, data: posts};
    } catch (error) {
        console.error('Error getting posts:', error);
        return {status: 400, message: 'Failed to get posts'};
    }
};

const getPostById = async (postId) => {
    try {
        const post = await Post.findById(postId).populate('author', ['username']);
        return {status: 200, data: post};
    } catch (error) {
        console.error('Error getting post by ID:', error);
        return {status: 400, message: 'Failed to get post'};
    }
};

const updatePost = async (postId, title, summary, content, cover, authorId) => {
    try {
        const document = await Post.findById(postId);
        const verifyAuthor = JSON.stringify(document.author) === JSON.stringify(authorId);

        if (!verifyAuthor) {
            return {status: 500, message: 'Internal error while trying to edit post'};
        }

        const updatedPost = await document.updateOne({
            title, summary,
            cover: cover ? cover : document.cover, content
        });

        return {status: 200, data: updatedPost};
    } catch (error) {
        console.error('Error updating post:', error);
        return {status: 400, message: 'Failed to update post'};
    }
};

const deletePost = async (postId) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return {status: 404, message: 'Post not found'};
        }

        return {status: 200, message: 'Post deleted successfully'};
    } catch (error) {
        console.error('Error deleting post:', error);
        return {status: 400, message: 'Failed to delete post'};
    }
};

const likePost = async (postId, userId) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { 
                $push: { likedBy: (userId) },
                $inc: { likes: 1 },
            },
            { new: true }
        );
        return { status: 200, data: updatedPost };
    } catch (error) {
        console.error('Error liking post:', error);
        return { status: 400, message: 'Failed to like post' };
    }
};

const unlikePost = async (postId, userId) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { 
                $pull: { likedBy: (userId) }, 
                $inc: { likes: -1 },
            },
            { new: true }
        );
        return { status: 200, data: updatedPost };
    } catch (error) {
        console.error('Error unliking post:', error);
        return { status: 400, message: 'Failed to unlike post' };
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
};