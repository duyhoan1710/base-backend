const Joi = require('joi');

const deviceService = require('../../services/device');
const { abort } = require('../../../helpers/error');

const validate = async ({ roomId, deviceId }) => {
  try {
    const schema = Joi.object({
      deviceId: Joi.number().min(1).required(),
      roomId: Joi.number().min(1).required(),
    });
    return await schema.validate({ roomId, deviceId });
  } catch (error) {
    return abort(400, 'Params Error');
  }
};

const remove = async (req, res) => {
  const { roomId, deviceId } = req.params;
  const homeId = req.home.id;

  await validate({ roomId, deviceId });
  await deviceService.remove({
    roomId,
    deviceId,
    homeId,
  });
  res.status(204).send();
};

module.exports = remove;
