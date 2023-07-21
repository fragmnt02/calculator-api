const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
    type: { type: String, required: true, unique: true },
    cost: { type: Number, required: true },
});

const Operation = mongoose.model('Operation', operationSchema);

module.exports = Operation;