const express = require('express');
const p = require('passport');
const controller = require('../../controllers/auth');

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.delete('/remove', p.authenticate('jwt', { session: false }), controller.remove);

module.exports = router;
