const express = require('express');
const router = express.Router();
const operationController = require('../../controllers/operationController');

// Route to get all operations
router.get('/', operationController.getAllOperations);

module.exports = router;