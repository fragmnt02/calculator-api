const RecordService = require('../services/recordService');

// Controller function to create a new record
async function createRecord(req, res, next) {
    try {
        const recordData = req.body;
        const record = await RecordService.createRecord(recordData);
        res.status(201).json(record);
    } catch (error) {
        next(error);
    }
}

// Controller function to get a record by ID
async function getRecordById(req, res, next) {
    try {
        const { id } = req.params;
        const record = await RecordService.getRecordById(id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json(record);
    } catch (error) {
        next(error);
    }
}

// Controller function to get all records with pagination and filters
async function getAllRecords(req, res, next) {
    try {
        // Extract pagination and filtering parameters from query parameters
        const { page = 1, limit = 10, user_id, operation_id } = req.query;

        const filterOptions = {};
        if (user_id) {
            filterOptions.user_id = user_id;
        }
        if (operation_id) {
            filterOptions.operation_id = operation_id;
        }

        // Call the service to fetch records with pagination and filtering
        const { records, totalRecords } = await RecordService.getAllRecords({
            page: parseInt(page),
            limit: parseInt(limit),
            filterOptions,
        });

        res.json({
            records,
            totalRecords,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalRecords / parseInt(limit)),
        });
    } catch (error) {
        next(error);
    }
}

// Controller function to soft delete a record by ID
async function softDeleteRecord(req, res, next) {
    try {
      const { id } = req.params;
      const deletedRecord = await RecordService.softDeleteRecord(id);
      res.json(deletedRecord);
    } catch (error) {
      next(error);
    }
  }

module.exports = {
    createRecord,
    getRecordById,
    getAllRecords,
    softDeleteRecord,
};