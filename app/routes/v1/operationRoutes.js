const express = require('express');
const router = express.Router();
const operationController = require('../../controllers/operationController');

// Route to create a new operation
router.post('/', operationController.createOperation);

// Route to get an operation by ID
router.get('/:id', operationController.getOperationById);

// Route to get all operations
router.get('/', operationController.getAllOperations);

module.exports = router;