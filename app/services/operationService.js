const operationRepository = require('../repositories/operationRepository');

// Service function to create a new operation
async function createOperation(operationData) {
    return operationRepository.createOperation(operationData);
}

// Service function to find an operation by ID
async function getOperationById(id) {
    return operationRepository.getOperationById(id);
}

// Service function to find all operations
async function getAllOperations() {
    return operationRepository.getAllOperations();
}

module.exports = {
    createOperation,
    getOperationById,
    getAllOperations,
};