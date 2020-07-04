const router = require('express').Router();
const p = require('passport');
const controller = require('../../controllers/teacher');

router.get('/', p.authenticate('jwt', { session: false }), controller.getAll);
router.delete('/:id', p.authenticate('jwt', { session: false }), controller.remove);
router.post('/', p.authenticate('jwt', { session: false }), controller.create);
router.patch('/:id', p.authenticate('jwt', { session: false }), controller.update);

module.exports = router;
