const express = require('express');
const router = express.Router();
const perkController = require('../controllers/perkController');

router.post('/', perkController.createPerk);
router.get('/', perkController.getAllPerks);
router.delete('/:id', perkController.deletePerk);

module.exports = router;
