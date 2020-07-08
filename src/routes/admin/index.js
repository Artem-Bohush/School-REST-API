const router = require('express').Router();
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/admin');

router.get('/', auth, controller.getInfo);

module.exports = router;
