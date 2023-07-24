const OperationService = require('../services/operationService');

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
    getAllOperations,
};
