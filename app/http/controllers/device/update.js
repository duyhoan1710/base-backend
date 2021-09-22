const Joi = require('joi');

const deviceService = require('../../services/device');
const {
  abort,
} = require('../../../helpers/error');
const deviceStatus = require('../../../enums/deviceStatus');

const validate = async ({
  deviceId,
  name,
  status,
  digitalIo,
  roomId,
}) => {
  try {
    const schema = Joi.object({
      deviceId: Joi.number().min(1),
      name: Joi.string(),
      status: Joi.valid(deviceStatus.getValues()),
      digitalIo: Joi.number().min(1),
      roomId: Joi.number().min(1),
    });
    return await schema.validate({
      deviceId,
      name,
      status,
      digitalIo,
      roomId,
    });
  } catch (error) {
    return abort(400, 'Params Error');
  }
};

const update = async (req, res) => {
  const {
    name,
    status,
    digitalIo,
  } = req.body;
  const {
    roomId,
    deviceId,
  } = req.params;
  const homeId = req.home.id;

  await validate({
    deviceId,
    name,
    status,
    digitalIo,
    roomId,
  });
  await deviceService.update({
    deviceId,
    name,
    status,
    digitalIo,
    roomId,
    homeId,
  });
  res.status(204).send();
};

module.exports = update;
