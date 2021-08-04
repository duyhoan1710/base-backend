const express = require('express');

const { task: taskController } = require('../http/controllers');
const { auth } = require('../http/middlewares');

const router = express.Router();

router.post('/tasks', auth, taskController.create);
router.get('/tasks', auth, taskController.getList);
router.put('/tasks/:taskId', auth, taskController.update);
router.delete('/tasks/:taskId', auth, taskController.remove);

module.exports = router;
