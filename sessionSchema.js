const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
  },
);

module.exports = mongoose.model('session', sessionSchema);
