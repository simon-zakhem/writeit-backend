const jwt = require('jsonwebtoken');
const { register, login } = require('../services/auth.service');
require('dotenv').config();

const registerController = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(401).json({ message: 'Missing Data' });
    }

    try {
        const result = await register(username, email, password);

        if (result.status === 200) {
            res.cookie('token', result.token, { httpOnly: true });

            const loginResult = await login(username, password);
            if(loginResult.status === 200){
                res.cookie('token', loginResult.token, { httpOnly: true });
                return res.status(200).json({ loginResult });
            }
        }
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const loginController = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(401).json({ message: 'Missing Data' });
    }

    try {
        const result = await login(username, password);

        if (result.status === 200) {
            res.cookie('token', result.token, { httpOnly: true });
            return res.status(200).json({ result });
        }
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const logoutController = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) }).json('logged out');
}

module.exports = {
    registerController,
    loginController,
    logoutController,
};