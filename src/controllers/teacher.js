const Teacher = require('../models/Teacher');
const Lesson = require('../models/Lesson');
const errorHandler = require('../helpers/errorHandler');

module.exports.getAll = async (req, res) => {
  try {
    const teachers = await Teacher.find({ school: req.school.id });
    res.status(200).json(teachers);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const result = await Teacher.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      await Lesson.deleteMany({ group: req.params.id });
      res.status(200).json({ success: true, message: 'The teacher successfully deleted!' });
    } else {
      res.status(404).json({ success: false, message: 'Such a teacher was not found in the database!' });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const teacher = await new Teacher({
      name: req.body.name,
      surname: req.body.surname,
      school: req.school.id,
    }).save();
    res.status(201).json(teacher);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedTeacher);
  } catch (e) {
    errorHandler(res, e);
  }
};
