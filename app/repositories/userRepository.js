const User = require('../models/user');

// Repository function to create a new user
async function createUser(userData) {
    return User.create(userData);
}

// Repository function to find a user by ID
async function getUserById(id) {
    return User.findById(id);
}

// Repository function to find a user by username (email)
async function getUserByUsername(username) {
    return User.findOne({ username });
}

// Repository function to find all users with pagination and filtering
async function getAllUsers({ page, limit, filterOptions }) {
    const query = User.find();

    if (filterOptions) {
        query.find(filterOptions);
    }

    const totalUsers = await User.countDocuments(filterOptions);
    query.skip((page - 1) * limit).limit(limit);

    return {
        users: await query.exec(),
        totalUsers,
    };
}

// Repository function to update a user's status
async function updateUserStatus(id, status) {
    return User.findByIdAndUpdate(id, { status }, { new: true });
}

module.exports = {
    createUser,
    getUserById,
    getUserByUsername,
    getAllUsers,
    updateUserStatus,
};