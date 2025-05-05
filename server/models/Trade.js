const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  date: Date,
  symbol: String,
  entry: Number,
  exit: Number,
  result: Number,
  strategy: String,
  notes: String,
  account: String // ✅ Add this
});

module.exports = mongoose.model('Trade', tradeSchema);
