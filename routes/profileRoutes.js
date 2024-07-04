const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getProfileController, followUserController, unfollowUserController, updateProfileController } = require('../controllers/profile.controller');
const verifyToken = require('./middleware');
const upload = multer({ dest: 'uploads/' });

router.get('/profile/:username', getProfileController);
router.post('/profile/:username/follow', verifyToken, followUserController);
router.post('/profile/:username/unfollow', verifyToken, unfollowUserController);
router.put('/profile', upload.fields([{ name: 'profile' }, { name: 'cover' }]), verifyToken, updateProfileController);

module.exports = router;