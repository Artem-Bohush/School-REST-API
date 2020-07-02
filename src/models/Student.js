const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  group: {
    ref: 'groups',
    type: Schema.Types.ObjectId,
  },
  school: {
    ref: 'schools',
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('students', studentSchema);
