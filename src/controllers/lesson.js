const Lesson = require('../models/Lesson');
const errorHandler = require('../helpers/errorHandler');

module.exports.getAll = async (req, res) => {
  try {
    const lessons = await Lesson.find({ school: req.school.id });
    res.status(200).json(lessons);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getByTeacherId = async (req, res) => {
  try {
    const lessons = await Lesson.find({
      school: req.school.id,
      teacher: req.params.teacherId,
    });
    res.status(200).json(lessons);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getByGroupId = async (req, res) => {
  try {
    const lessons = await Lesson.find({
      school: req.school.id,
      group: req.params.groupId,
    });
    res.status(200).json(lessons);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const result = await Lesson.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      res.status(200).json({ success: true, message: 'The lesson successfully deleted!' });
    } else {
      res.status(404).json({ success: false, message: 'Such a lesson was not found in the database!' });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const lesson = await new Lesson({
      topic: req.body.topic,
      teacher: req.body.teacher,
      group: req.body.group,
      classroom: req.body.classroom,
      lessonNumber: req.body.lessonNumber,
      school: req.school.id,
    }).save();
    res.status(201).json(lesson);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async (req, res) => {
  try {
    const updatedLesson = await Lesson.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedLesson);
  } catch (e) {
    errorHandler(res, e);
  }
};
