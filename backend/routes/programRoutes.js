const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

router.post('/', programController.upload.single('image'), programController.createProgram);
router.get('/', programController.getAllPrograms);
router.get('/:id', programController.getProgramById);
router.delete('/:id', programController.deleteProgram);
router.put('/:id', programController.upload.single('image'), programController.updateProgram);

module.exports = router;
