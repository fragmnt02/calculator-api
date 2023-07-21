const bcrypt = require('bcrypt');

const userRepository = require('../repositories/userRepository');

// Service function to create a new user
async function createUser(userData) {
    // Generate a salt to use for password hashing
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the user's password using the generated salt
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = await userRepository.createUser({ ...userData, password: hashedPassword });
    return {
        username: user.username,
        status: user.status,
        id: user._id,
    };
}

// Service function to find a user by ID
async function getUserById(id) {
    const user = await userRepository.getUserById(id);
    return {
        username: user.username,
        status: user.status,
        id: user._id,
    };
}

// Service function to find a user by username (email)
async function getUserByUsername(username) {
    const user = await userRepository.getUserByUsername(username);
    return {
        username: user.username,
        status: user.status,
        id: user._id,
    };
}

// Service function to find all users with pagination and filtering
async function getAllUsers({ page, limit, filterOptions }) {
    const response = await userRepository.getAllUsers({ page, limit, filterOptions });
    return {
        ...response,
        users: response.users.map(u => ({
            username: u.username,
            status: u.status,
            id: u._id,
        })),
    };
}

// Service function to update a user's status
async function updateUserStatus(id, status) {
    const user = await userRepository.updateUserStatus(id, status);
    return {
        username: user.username,
        status: user.status,
        id: user._id,
    };
}

// Service function to verify user login
async function verifyUserLogin(username, password) {
    const user = await userRepository.getUserByUsername(username);

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Incorrect password');
    }

    return {
        username: user.username,
        status: user.status,
        id: user._id,
    };
}

module.exports = {
    createUser,
    getUserById,
    getUserByUsername,
    getAllUsers,
    updateUserStatus,
    verifyUserLogin,
};