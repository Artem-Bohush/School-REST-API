const router = require('express').Router();
const p = require('passport');
const controller = require('../../controllers/admin');

router.get('/', p.authenticate('jwt', { session: false }), controller.getInfo);

module.exports = router;
