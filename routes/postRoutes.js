const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createPostController, getPostsController, getPostByIdController, updatedPostController, deletePostController, likePostController, unlikePostController } = require('../controllers/post.controller');
const verifyToken = require('./middleware');
const upload = multer({ dest: 'uploads/' });

router.post('/post', upload.single('file'), verifyToken, createPostController);
router.get('/post', getPostsController);
router.get('/post/:id', getPostByIdController);
router.put('/post/:id', upload.single('file'), verifyToken, updatedPostController);
router.delete('/post/:id', deletePostController);
router.post('/post/:id/like', verifyToken, likePostController);
router.post('/post/:id/unlike', verifyToken, unlikePostController);

module.exports = router;