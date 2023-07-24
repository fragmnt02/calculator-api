const casual = require('casual');

const recordRepository = require('../repositories/recordRepository');

// Service function to create a new record
async function createRecord(operation, userId, response) {
    const lastRecord = await recordRepository.getLatestRecordByUserId(userId);
    const user_balance = (!lastRecord?.user_balance && lastRecord?.user_balance !== 0 ? 100 : lastRecord?.user_balance) - operation.cost;
    if (user_balance < 0) {
        throw new Error("You don't have enough coins to make this action");
    }
    return recordRepository.createRecord({
        operation_id: operation._id,
        user_id: userId,
        amount: 1,
        user_balance,
        operation_response: response,
    });
}

// Service function to find all records with pagination and filtering
async function getAllRecords({ page, limit, filterOptions }) {
    return recordRepository.getAllRecords({ page, limit, filterOptions });
}

// Service function to soft delete a record by ID
async function softDeleteRecord(id) {
    return recordRepository.softDeleteRecordById(id);
}

// Service function to soft delete a record by ID
async function calculateResponse(operation, operand1, operand2) {
    let result = null;
    const o1 = parseInt(operand1 ?? 0, 10);
    const o2 = parseInt(operand2 ?? 0, 10);
    switch (operation.type) {
        case 'addition':
            result = o1 + o2;
            break;
        case 'subtraction':
            result = o1 - o2;
            break;
        case 'multiplication':
            result = o1 * o2;
            break;
        case 'division':
            result = o1 / o2;
            break;
        case 'square root':
            result = o1 ** 2
            break;
        default:
            // random string
            result = casual.text;
            break;
    }
    return result;
}

module.exports = {
    createRecord,
    getAllRecords,
    softDeleteRecord,
    calculateResponse,
};