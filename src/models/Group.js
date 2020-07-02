const mongoose = require('mongoose');

const { Schema } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  school: {
    ref: 'schools',
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('groups', groupSchema);
