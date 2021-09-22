const express = require('express');

const { room: roomController } = require('../http/controllers');
const { auth, convertParams } = require('../http/middlewares');

const router = express.Router();

router.post('/rooms', auth, convertParams, roomController.create);
router.get('/rooms', auth, convertParams, roomController.getList);
router.put('/rooms/:roomId', auth, convertParams, roomController.update);
router.delete('/rooms/:roomId', auth, convertParams, roomController.remove);

module.exports = router;
