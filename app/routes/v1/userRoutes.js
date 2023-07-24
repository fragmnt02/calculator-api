const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// Route to create a new user
router.post('/', userController.createUser);

// Route for user login
router.post('/login', userController.login);

// Route for user logout
router.get('/logout', userController.logout);

module.exports = router;