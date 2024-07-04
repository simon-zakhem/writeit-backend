const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);

const register = async (username, email, password) => {
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return {status: 400, message: 'Username or Email already exists!'};
        }

        const hashedPassword = bcrypt.hashSync(password, salt);
        const userFile = await User.create({ username, email, password: hashedPassword });

        const token = jwt.sign({ id: userFile._id, username: userFile.username }, process.env.SECRET_KEY, {});
        return {status: 200, data: userFile, token};
    } catch (error) {
        console.error('Error during registration:', error);
        return {status: 500, message: 'Server Registration Error'};
    }
};

const login = async (username, password) => {
    try {
        const userFile = await User.findOne({ username });

        if (!userFile) {
            return {status: 401, message: 'Username is incorrect!'};
        }

        const isValidPassword = bcrypt.compareSync(password, userFile.password);

        if (!isValidPassword) {
            return {status: 401, message: 'Password is incorrect!'};
        }
        const token = jwt.sign({ id: userFile._id, username: userFile.username }, process.env.SECRET_KEY, {});
        return {status: 200, data: userFile, token};
    } catch (error) {
        console.error('Error during login:', error);
        return {status: 500, message: 'Authentication failed'};
    }
};

module.exports = {
    register,
    login,
};
