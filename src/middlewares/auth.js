const jwt = require('jsonwebtoken');

const School = require('../models/School');
const Role = require('../models/Role');
const roles = require('../config/roles');
const errorHandler = require('../helpers/errorHandler');

module.exports = async (req, res, next) => {
  let payload;
  try {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).send('unauthorized');
  }

  try {
    const school = await School.findById(payload.schoolId).select('id role');
    const role = await Role.findById({ _id: school.role }).select('name');
    if (req.originalUrl.includes('admin') && role.name === roles.USER) {
      res.status(403).send('forbidden');
    } else {
      req.school = { id: school.id };
    }
  } catch (error) {
    errorHandler(res, error);
  }

  next();
};
