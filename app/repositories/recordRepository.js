const Record = require('../models/record');

// Repository function to create a new record
async function createRecord(recordData) {
    return Record.create(recordData);
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
    const record = await Record.findByIdAndUpdate(id, { is_deleted: true }, { new: true });
    return record;
}

// Repository function to get the latest record made by a specific user
const getLatestRecordByUserId = async (userId) => {
    const latestRecord = await Record.findOne({ user_id: userId }).sort({ date: -1 }).exec();
    return latestRecord;
};

module.exports = {
    createRecord,
    getAllRecords,
    softDeleteRecordById,
    getLatestRecordByUserId,
};


