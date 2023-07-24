const RecordService = require('../services/recordService');
const OperationService = require('../services/operationService');

// Controller function to create a new record
async function createRecord(req, res, next) {
    try {
        const operation = await OperationService.getOperationById(req.body.operation_id);
        const response = await RecordService.calculateResponse(operation, req.body.operand1, req.body.operand2);
        const record = await RecordService.createRecord(operation, req.userId, response);
        res.status(201).json(record);
    } catch (error) {
        if (error.message === "You don't have enough coins to make this action") {
            res.status(400).json({ message: error.message });
            return;
        }
        next(error);
    }
}

// Controller function to get all records with pagination and filters
async function getAllRecords(req, res, next) {
    try {
        // Extract pagination and filtering parameters from query parameters
        const { page = 1, size = 10, operation_id } = req.query;

        const filterOptions = {};

        filterOptions.user_id = req.userId;

        if (operation_id) {
            filterOptions.operation_id = operation_id;
        }

        // Call the service to fetch records with pagination and filtering
        const { records, totalRecords } = await RecordService.getAllRecords({
            page: parseInt(page),
            limit: parseInt(size),
            filterOptions,
        });

        res.json({
            records,
            totalRecords,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalRecords / parseInt(size)),
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
    getAllRecords,
    softDeleteRecord,
    createRecord,
};