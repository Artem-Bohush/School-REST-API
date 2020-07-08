const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config({ path: path.join(__dirname, './config/.env') });
require('./db/index')();
const {
  authRoutes,
  lessonRoutes,
  groupRoutes,
  teacherRoutes,
  studentRoutes,
  scheduleRoutes,
  adminRoutes,
} = require('./routes/index');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./middlewares/passport')(passport);

app.use('/api/auth', authRoutes);
app.use('/api/lesson', lessonRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server was running on the ${PORT} port ...`));
