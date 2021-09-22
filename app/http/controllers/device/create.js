const Joi = require('joi');

const deviceService = require('../../services/device');
const { abort } = require('../../../helpers/error');

const validate = async ({ name, roomId }) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().min(1),
      name: Joi.string().required(),
    });
    return await schema.validate({ name, roomId });
  } catch (error) {
    return abort(400, 'Params Error');
  }
};

const create = async (req, res) => {
  const { name } = req.body;
  const { roomId } = req.params;
  const homeId = req.home.id;

  await validate({ name, roomId });
  await deviceService.create({
    roomId,
    name,
    homeId,
  });
  res.status(201).send();
};

module.exports = create;
