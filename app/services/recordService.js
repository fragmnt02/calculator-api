const recordRepository = require('../repositories/recordRepository');

// Service function to create a new record
async function createRecord(recordData) {
    return recordRepository.createRecord(recordData);
}

// Service function to find a record by ID
async function getRecordById(id) {
    return recordRepository.getRecordById(id);
}

// Service function to find all records with pagination and filtering
async function getAllRecords({ page, limit, filterOptions }) {
    return recordRepository.getAllRecords({ page, limit, filterOptions });
}

// Service function to soft delete a record by ID
async function softDeleteRecord(id) {
    return recordRepository.softDeleteRecordById(id);
}

module.exports = {
    createRecord,
    getRecordById,
    getAllRecords,
    softDeleteRecord,
};