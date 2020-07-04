const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config({ path: path.join(__dirname, './config/.env') });

const { authRoutes, lessonRoutes, groupRoutes, teacherRoutes, studentRoutes, scheduleRoutes } = require('./routes/index');

const app = express();

require('./db/index')();

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require('./middlewares/passport')(passport);

app.use('/api/auth', authRoutes);
app.use('/api/lesson', lessonRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/schedule', scheduleRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server was running on the ${PORT} port ...`));
