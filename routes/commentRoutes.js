const express = require('express');
const { createCommentController, getCommentsController, deleteCommentController } = require('../controllers/comment.controller');
const verifyToken = require('./middleware');
const router = express.Router();

router.post('/comment/:postId',verifyToken, createCommentController);
router.get('/comment/:postId', getCommentsController);
router.delete('/comment/:id', deleteCommentController);

module.exports = router;