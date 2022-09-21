const mongoose = require('./db');

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: { type: String },
  start_date: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    default: 30,
  },
  area_of_improvement: {
    type: String,
    required: true,
  },
  dates: [String],
});

module.exports = mongoose.model('Habit', habitSchema);
