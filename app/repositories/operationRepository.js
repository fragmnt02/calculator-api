const Operation = require('../models/operation');

// Repository function to create a new operation
async function createOperation(operationData) {
    return Operation.create(operationData);
}

// Repository function to find an operation by ID
async function getOperationById(id) {
    return Operation.findById(id);
}

// Repository function to find all operations
async function getAllOperations() {
    return Operation.find();
}

module.exports = {
    createOperation,
    getOperationById,
    getAllOperations,
};