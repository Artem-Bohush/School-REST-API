const mongoose = require('mongoose');

const { Schema } = mongoose;

const lessonSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  teacher: {
    ref: 'teachers',
    type: Schema.Types.ObjectId,
  },
  group: {
    ref: 'groups',
    type: Schema.Types.ObjectId,
  },
  classroom: {
    type: String,
    required: true,
  },
  lessonNumber: {
    type: Number,
    required: true,
  },
  school: {
    ref: 'schools',
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('lessons', lessonSchema);
