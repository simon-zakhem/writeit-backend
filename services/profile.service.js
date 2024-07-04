const User = require('../models/User');

const getProfile = async (username) => {
    return await User.findOne({ username })
        .populate('posts')
        .populate('followers')
        .populate('following');
};

const followUser = async (username, userId) => {
    const userToFollow = await User.findOne({ username });
    const currentUser = await User.findById(userId);

    if (!userToFollow || !currentUser) {
        throw new Error('User not found');
    }

    if (currentUser.following.includes(userToFollow._id)) {
        throw new Error('Already following this user');
    }

    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);

    await currentUser.save();
    await userToFollow.save();

    return { message: 'Followed successfully' };
};

const unfollowUser = async (username, userId) => {
    const userToUnfollow = await User.findOne({ username });
    const currentUser = await User.findById(userId);

    if (!userToUnfollow || !currentUser) {
        throw new Error('User not found');
    }

    if (!currentUser.following.includes(userToUnfollow._id)) {
        throw new Error('Not following this user');
    }

    currentUser.following.pull(userToUnfollow._id);
    userToUnfollow.followers.pull(currentUser._id);

    await currentUser.save();
    await userToUnfollow.save();

    return { message: 'Unfollowed successfully' };
};

const updateProfile = async (userId, bio, profilePath, coverPath) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    if (bio) {
        user.bio = bio;
    }
    if (profilePath) {
        user.profile = profilePath;
    }
    if (coverPath) {
        user.cover = coverPath;
    }

    await user.save();
    return user;
};

module.exports = {
    getProfile,
    followUser,
    unfollowUser,
    updateProfile,
};
