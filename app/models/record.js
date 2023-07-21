const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  operation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Operation', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  user_balance: { type: Number, required: true },
  operation_response: { type: String },
  date: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, default: false },
});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;