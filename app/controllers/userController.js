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

// Controller function for user login
async function login(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await UserService.verifyUserLogin(username, password);

        // Generate and send JWT token as part of the response
        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_PASS, { expiresIn: '1h' });

        // Set the HTTP-only cookie containing the access token
        res.cookie('access_token', accessToken, {
            maxAge: 58 * 60 * 1000, // Set the cookie expiration time (58 minutes)
            secure: true, // set to true if your using https or samesite is none
            httpOnly: true, // backend only
            sameSite: 'none' // set to none for cross-request
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
    login,
    logout,
};