var express = require('express');
var router = express.Router();
var refriController = require('../controllers/RefriController')

/* GET users listing. */
router.get('/:marca', refriController.getOne);
router.get('/', refriController.getAll);

router.post('/', refriController.register);
router.put('/:marca', refriController.update);
router.delete('/:marca', refriController.delete);

module.exports = router;
