const express = require('express');
const router = express.Router();
const callbackController = require('../controllers/callbackController');

router.post('/', callbackController.createCallback);
router.get('/', callbackController.getAllCallbacks);
router.delete('/:id', callbackController.deleteCallback);
router.patch('/:id', callbackController.updateCallback);

module.exports = router;
