const { Strategy, ExtractJwt } = require('passport-jwt');

const School = require('../models/School');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const school = await School.findById(payload.schoolId).select('email id');
        if (school) {
          done(null, school);
        } else {
          done(null, false);
        }
      } catch (e) {
        console.log(e);
      }
    }),
  );
};
