const OperationService = require('../services/operationService');

// Controller function to create a new operation
async function createOperation(req, res, next) {
    try {
        const operationData = req.body;
        const operation = await OperationService.createOperation(operationData);
        res.status(201).json(operation);
    } catch (error) {
        next(error);
    }
}

// Controller function to get an operation by ID
async function getOperationById(req, res, next) {
    try {
        const { id } = req.params;
        const operation = await OperationService.getOperationById(id);
        if (!operation) {
            return res.status(404).json({ message: 'Operation not found' });
        }
        res.json(operation);
    } catch (error) {
        next(error);
    }
}

// Controller function to get all operations
async function getAllOperations(_, res, next) {
    try {
        const operations = await OperationService.getAllOperations();
        res.json(operations);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createOperation,
    getOperationById,
    getAllOperations,
};
