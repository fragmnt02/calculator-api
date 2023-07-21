const Record = require('../models/record');

// Repository function to create a new record
async function createRecord(recordData) {
    return Record.create(recordData);
}

// Repository function to find a record by ID
async function getRecordById(id) {
    return Record.findById(id);
}

// Repository function to find all records with pagination and filtering
async function getAllRecords({ page, limit, filterOptions }) {
    const query = Record.find();

    if (filterOptions) {
        query.find(filterOptions);
    }

    const totalRecords = await Record.countDocuments(filterOptions);
    query.skip((page - 1) * limit).limit(limit);

    return {
        records: await query.exec(),
        totalRecords,
    };
}

// Repository function to soft delete a record by ID
async function softDeleteRecordById(id) {
    const record = await Record.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return record;
  }

module.exports = {
    createRecord,
    getRecordById,
    getAllRecords,
    softDeleteRecordById,
};


