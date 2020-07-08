const router = require('express').Router();
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/schedule');

router.get('/', auth, controller.getAll);
router.delete('/:id', auth, controller.remove);
router.post('/', auth, controller.create);
router.patch('/:id', auth, controller.update);

module.exports = router;
