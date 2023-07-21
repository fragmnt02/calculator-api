const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// Route to create a new user
router.post('/', userController.createUser);

// Route to get a user by ID
router.get('/:id', userController.getUserById);

// Route to get all users with pagination and filtering
router.get('/', userController.getAllUsers);

// Route to update a user's status
router.put('/:id/status', userController.updateUserStatus);

// Route for user login
router.post('/login', userController.login);

// Route for user logout
router.post('/logout', userController.logout);

module.exports = router;