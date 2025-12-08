const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/', messageController.createMessage);
router.get('/', messageController.getAllMessages);
router.delete('/:id', messageController.deleteMessage);
router.patch('/:id', messageController.updateMessage);

module.exports = router;
