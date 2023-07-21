const express = require('express');
const router = express.Router();
const recordController = require('../../controllers/recordController');

// Route to create a new record
router.post('/', recordController.createRecord);

// Route to get a record by ID
router.get('/:id', recordController.getRecordById);

// Route to get all records with pagination and filtering
router.get('/', recordController.getAllRecords);

// Route to soft delete a record by ID
router.delete('/:id', recordController.softDeleteRecord);

module.exports = router;