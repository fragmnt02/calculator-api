const jwt = require('jsonwebtoken');

const UserService = require('../services/userService');

// Controller function to create a new user
async function createUser(req, res, next) {
    try {
        const userData = req.body;
        const user = await UserService.createUser(userData);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

// Controller function to get a user by ID
async function getUserById(req, res, next) {
    try {
        const { id } = req.params;
        const user = await UserService.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
}

// Controller function to get all users with pagination and filters
async function getAllUsers(req, res, next) {
    try {
        // Extract pagination and filtering parameters from query parameters
        const { page = 1, limit = 10, status } = req.query;

        const filterOptions = {};
        if (status) {
            filterOptions.status = status;
        }

        // Call the service to fetch users with pagination and filtering
        const { users, totalUsers } = await UserService.getAllUsers({
            page: parseInt(page),
            limit: parseInt(limit),
            filterOptions,
        });

        res.json({
            users,
            totalUsers,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalUsers / parseInt(limit)),
        });
    } catch (error) {
        next(error);
    }
}

// Controller function to update user status
async function updateUserStatus(req, res, next) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedUser = await UserService.updateUserStatus(id, status);
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
}

// Controller function for user login
async function login(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await UserService.verifyUserLogin(username, password);

        // Generate and send JWT token as part of the response
        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_PASS, { expiresIn: '1h' });

        // Set the HTTP-only cookie containing the access token
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: 58 * 60 * 1000, // Set the cookie expiration time (58 minutes)
        });

        res.json({ user });
    } catch (error) {
        next(error);
    }
}

// Controller function for user logout
async function logout(_, res, next) {
    try {
        // Clear the 'access_token' cookie by setting its expiration date to the past
        res.clearCookie('access_token');
        res.json({ message: 'Logout successful' });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUserStatus,
    login,
    logout,
};