const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config({ path: path.join(__dirname, './config/.env') });

const { authRoutes } = require('./routes/index');

const app = express();

require('./db/index')();

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server was running on the ${PORT} port ...`));
