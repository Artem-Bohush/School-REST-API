const mongoose = require('mongoose');

const Role = require('../models/Role');
const School = require('../models/School');
const roles = require('../config/roles');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB Atlas successfully connected!');

    const r = await Role.find({});
    if (!r.length) {
      new Role({ name: roles.ADMIN }).save((err, adminRole) => {
        if (err) throw err;
        console.log('Admin role successfully created!');
        new School({
          name: 'admin',
          email: 'admin@gmail.com',
          password: 'admin123',
          role: adminRole._id,
        }).save((e) => {
          if (e) throw e;
        });
      });
      new Role({ name: roles.USER }).save((e) => {
        if (e) throw e;
        console.log('User role successfully created!');
      });
    }
  } catch (error) {
    console.log(error);
  }
};
