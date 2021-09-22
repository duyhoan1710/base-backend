const express = require('express');

const { device: deviceController } = require('../http/controllers');
const { auth, convertParams } = require('../http/middlewares');

const router = express.Router();

router.post('/rooms/:roomId/devices', auth, convertParams, deviceController.create);
router.get('/rooms/:roomId/devices', auth, convertParams, deviceController.getList);
router.put('/rooms/:roomId/devices/:deviceId', auth, convertParams, deviceController.update);
router.delete('/rooms/:roomId/devices/:deviceId', auth, convertParams, deviceController.remove);

module.exports = router;
