const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  auteur: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;