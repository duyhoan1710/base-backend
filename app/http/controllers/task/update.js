const Joi = require('joi');

const taskService = require('../../services/task');
const { abort } = require('../../../helpers/error');
const taskStatus = require('../../../enums/taskStatus');

const validate = async ({ title, description, status }) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().allow(''),
      status: Joi
        .valid(
          taskStatus.getValues(),
        ),
    });
    return await schema.validate({ title, description, status });
  } catch (error) {
    return abort(400, 'Params Error');
  }
};

const update = async (req, res) => {
  const { title, description, status } = req.body;
  const { taskId } = req.params;
  const userId = req.user.id;

  await validate({ title, description, status });
  await taskService.update({
    taskId,
    userId,
    title,
    description,
    status,
  });
  res.status(204).send();
};

module.exports = update;
