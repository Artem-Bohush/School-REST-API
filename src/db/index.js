const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Atlas successfully connected!'))
    .catch((err) => console.log(err));
};
