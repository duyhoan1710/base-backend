const Joi = require('joi');

const roomService = require('../../services/room');
const { abort } = require('../../../helpers/error');

const validate = async ({ name }) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    return await schema.validate({ name });
  } catch (error) {
    return abort(400, 'Params Error');
  }
};

const create = async (req, res) => {
  const { name } = req.body;
  const homeId = req.home.id;
  await validate({ name });
  await roomService.create({
    homeId,
    name,
  });
  res.status(201).send();
};

module.exports = create;
