const router = require('express').Router();
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/lesson');

router.get('/', auth, controller.getAll);
router.get('/teacher/:teacherId', auth, controller.getByTeacherId);
router.get('/group/:groupId', auth, controller.getByGroupId);
router.delete('/:id', auth, controller.remove);
router.post('/', auth, controller.create);
router.patch('/:id', auth, controller.update);

module.exports = router;
