const { createPost, getPostById, getPosts, updatePost, deletePost, likePost, unlikePost } = require("../services/post.service");
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

const createPostController = async (req, res) => {
    const { title, summary, content } = req.body;

    // will use upload.single('file') as middleware
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    const newPath = path + "." + extension;
    fs.renameSync(path, newPath);

    if (!title || !summary || !content) {
        return res.status(401).json({ message: 'Missing Data' });
    }
    
    try {
        const user = req.user;
        const postInfo = await createPost(title, summary, content, newPath, user.id);
        res.json(postInfo);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPostsController = async (req, res) => {
    try {
        const posts = await getPosts();
        res.json(posts);
    } catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getPostByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await getPostById(id);
        res.json(post);
    } catch (error) {
        console.error('Error getting post by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updatedPostController = async (req, res) => {
    const { title, summary, content, cover } = req.body;
    const { id } = req.params;

    // will use upload.single('file') as middleware
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];
        newPath = path + "." + extension;
        fs.renameSync(path, newPath);
    }

    try {
        const user = req.user;
        const updatedPost = await updatePost(id, title, summary, content, newPath, user.id);
        res.json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deletePostController = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteMessage = await deletePost(id);
        res.json(deleteMessage);
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const likePostController = async (req, res) => {
    const { id } = req.params;
    const { userid } = req.user;

    try {
        const result = await likePost(id, userid);
        res.json(result);
    } catch (error) {
        console.error('Error in likePostController:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const unlikePostController = async (req, res) => {
    const { id } = req.params;
    const {userid} = req.user;

    try {
        const result = await unlikePost(id, userid);
        res.json(result);
    } catch (error) {
        console.error('Error in unlikePostController:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
 
module.exports = { 
    createPostController,
    getPostsController,
    getPostByIdController,
    updatedPostController,
    deletePostController,
    likePostController,
    unlikePostController,
};
