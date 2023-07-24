const operationRepository = require('../repositories/operationRepository');

// Service function to find all operations
async function getAllOperations() {
    return operationRepository.getAllOperations();
}

// Service function to find a operation by id
async function getOperationById(operationId) {
    return operationRepository.getOperationById(operationId);
}

module.exports = {
    getAllOperations,
    getOperationById,
};