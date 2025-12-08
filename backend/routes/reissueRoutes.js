const express = require('express');
const router = express.Router();
const reissueController = require('../controllers/reissueController');

router.post('/', reissueController.createReissueRequest);
router.get('/', reissueController.getAllReissueRequests);
router.patch('/:id', reissueController.updateReissueStatus);
router.delete('/:id', reissueController.deleteReissueRequest);

module.exports = router;
