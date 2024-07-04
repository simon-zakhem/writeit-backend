const { getProfile, followUser, unfollowUser, updateProfile } = require("../services/profile.service");
const fs = require('fs');
require('dotenv').config();

const getProfileController = async (req, res) => {
    const { username } = req.params;

    try {
        const profile = await getProfile(username);
        res.json(profile);
    } catch (error) {
        console.error('Error getting profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const followUserController = async (req, res) => {
    const { username } = req.params;
    const { id } = req.user;

    try {
        const result = await followUser(username, id);
        res.json(result);
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const unfollowUserController = async (req, res) => {
    const { username } = req.params;
    const { id } = req.user;

    try {
        const result = await unfollowUser(username, id);
        res.json(result);
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProfileController = async (req, res) => {
    const { bio } = req.body;
    const { id } = req.user;

    // will use upload.fields([{name: 'profile'}, {name: 'cover'}]) as middleware
    let profilePath = null;
    let coverPath = null;

    if (req.files) {
        if (req.files.profile) {
            const { originalname, path } = req.files.profile[0];
            const parts = originalname.split('.');
            const extension = parts[parts.length - 1];
            profilePath = path + "." + extension;
            fs.renameSync(path, profilePath);
        }
        if (req.files.cover) {
            const { originalname, path } = req.files.cover[0];
            const parts = originalname.split('.');
            const extension = parts[parts.length - 1];
            coverPath = path + "." + extension;
            fs.renameSync(path, coverPath);
        }
    }

    try {
        const updatedProfile = await updateProfile(id, bio, profilePath, coverPath);
        res.json(updatedProfile);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getProfileController,
    followUserController,
    unfollowUserController,
    updateProfileController,
};
