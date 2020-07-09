const Student = require('../models/Student');
const errorHandler = require('../helpers/errorHandler');

module.exports.getAll = async (req, res) => {
  try {
    const students = await Student.find({ school: req.school.id });
    res.status(200).json(students);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getByGroupId = async (req, res) => {
  try {
    const students = await Student.find({
      school: req.school.id,
      group: req.params.groupId,
    });
    res.status(200).json(students);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const result = await Student.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      res.status(200).json({ success: true, message: 'The student successfully deleted!' });
    } else {
      res.status(404).json({ success: false, message: 'Such a student was not found in the database!' });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const student = await new Student({
      name: req.body.name,
      surname: req.body.surname,
      group: req.body.group,
      school: req.school.id,
    }).save();
    res.status(201).json(student);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedStudent);
  } catch (e) {
    errorHandler(res, e);
  }
};
