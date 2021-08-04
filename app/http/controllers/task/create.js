const Joi = require('joi');

const taskService = require('../../services/task');
const { abort } = require('../../../helpers/error');

const validate = async ({ title, description }) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().allow(''),
    });
    return await schema.validate({ title, description });
  } catch (error) {
    return abort(400, 'Params Error');
  }
};

const create = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  await validate({ title, description });
  await taskService.create({
    userId,
    title,
    description,
  });
  res.status(201).send();
};

module.exports = create;
