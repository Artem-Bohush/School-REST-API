const Group = require('../models/Group');
const errorHandler = require('../helpers/errorHandler');

module.exports.getAll = async (req, res) => {
  try {
    const groups = await Group.find({ school: req.user.id });
    res.status(200).json(groups);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const result = await Group.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      res.status(200).json({ success: true, message: 'The group successfully deleted!' });
    } else {
      res.status(404).json({ success: false, message: 'Such a group was not found in the database!' });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const group = await new Group({
      name: req.body.name,
      school: req.user.id,
    }).save();
    res.status(201).json(group);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async (req, res) => {
  try {
    const updatedGroup = await Group.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedGroup);
  } catch (e) {
    errorHandler(res, e);
  }
};
