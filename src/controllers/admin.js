const School = require('../models/School');
const Group = require('../models/Group');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Lesson = require('../models/Lesson');
const Schedule = require('../models/Schedule');
const errorHandler = require('../helpers/errorHandler');

module.exports.getInfo = async (req, res) => {
  Promise.all([
    await School.find(),
    await Group.find(),
    await Teacher.find(),
    await Student.find(),
    await Lesson.find(),
    await Schedule.find(),
  ]).then((info) => {
    res.status(200).json({
      schools: info[0],
      groups: info[1],
      teachers: info[2],
      students: info[3],
      lessons: info[4],
      schedules: info[5],
    });
  }).catch((e) => errorHandler(res, e));
};
