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
    required: true,
  },
  group: {
    ref: 'groups',
    type: Schema.Types.ObjectId,
    required: true,
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
    required: true,
  },
});

module.exports = mongoose.model('lessons', lessonSchema);
