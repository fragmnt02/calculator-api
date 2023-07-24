const Operation = require('../models/operation');

// Repository function to find all operations
async function getAllOperations() {
    return Operation.find();
}

// Repository function to find all operations
async function getOperationById(id) {
    return Operation.findById(id);
}

module.exports = {
    getAllOperations,
    getOperationById,
};