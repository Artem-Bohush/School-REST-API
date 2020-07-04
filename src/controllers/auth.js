const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const School = require('../models/School');
const errorHandler = require('../helpers/errorHandler');

module.exports.login = async (req, res) => {
  try {
    const candidate = await School.findOne({ email: req.body.email });

    if (candidate) {
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
      if (passwordResult) {
        const token = jwt.sign({
          email: candidate.email,
          schoolId: candidate._id,
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

        res.status(200).json({ success: true, token: `Bearer ${token}` });
      } else {
        res.status(401).json({ success: false, message: 'Password mismatch!' });
      }
    } else {
      res.status(404).json({ success: false, message: 'User with such email was not found!' });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.register = async (req, res) => {
  try {
    const candidate = await School.findOne({ email: req.body.email });

    if (candidate) {
      res.status(409).json({ success: false, message: `The email ${req.body.email} is already taken!` });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const { password } = req.body;
      const school = new School({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(password, salt),
      });
      await school.save();
      res.status(201).json(school);
    }
  } catch (e) {
    errorHandler(res, e);
  }
};
