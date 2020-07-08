const Schedule = require('../models/Schedule');
const errorHandler = require('../helpers/errorHandler');

module.exports.getAll = async (req, res) => {
  try {
    const schedules = await Schedule.find({ school: req.school.id });
    res.status(200).json(schedules);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const result = await Schedule.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      res.status(200).json({ success: true, message: 'The schedule successfully deleted!' });
    } else {
      res.status(404).json({ success: false, message: 'Such a schedule was not found in the database!' });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const schedule = await new Schedule({
      schedule: req.body.schedule,
      school: req.school.id,
    }).save();
    res.status(201).json(schedule);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedSchedule);
  } catch (e) {
    errorHandler(res, e);
  }
};
