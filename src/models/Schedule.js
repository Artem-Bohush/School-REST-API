const mongoose = require('mongoose');

const { Schema } = mongoose;

const scheduleSchema = new Schema({
  schedule: {
    type: Object,
    required: true,
  },
  school: {
    ref: 'schools',
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('schedules', scheduleSchema);
