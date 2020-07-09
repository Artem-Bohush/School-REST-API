const express = require('express');
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/auth');

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.delete('/remove', auth, controller.remove);

module.exports = router;
