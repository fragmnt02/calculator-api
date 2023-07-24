const User = require('../models/user');

// Repository function to create a new user
async function createUser(userData) {
    return User.create(userData);
}

// Repository function to find a user by username (email)
async function getUserByUsername(username) {
    return User.findOne({ username });
}

module.exports = {
    createUser,
    getUserByUsername,
};