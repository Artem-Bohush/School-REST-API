const mongoose = require('mongoose');

const { Schema } = mongoose;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  school: {
    ref: 'schools',
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('teachers', teacherSchema);
