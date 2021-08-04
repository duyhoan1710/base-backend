const Joi = require('joi');

const taskService = require('../../services/task');
const { abort } = require('../../../helpers/error');

const validate = async ({ taskId }) => {
  try {
    const schema = Joi.object({
      taskId: Joi.number().min(1).required(),
    });
    return await schema.validate({ taskId });
  } catch (error) {
    return abort(400, 'Params Error');
  }
};

const remove = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;

  await validate({ taskId });
  await taskService.remove({
    taskId,
    userId,
  });
  res.status(204).send();
};

module.exports = remove;
