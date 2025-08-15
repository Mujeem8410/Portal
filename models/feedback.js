
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  email: { type: String },
  rating: { type: Number, required: true },
  feedbackText: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
