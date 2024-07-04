const express = require('express');
const { registerController, loginController, logoutController } = require('../controllers/auth.controller');
const verifyToken = require('./middleware');
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile', verifyToken, (req, res) => {
    res.json(req.user);
});
router.post('/logout', logoutController);

module.exports = router;