const Joi = require('joi');

const roomService = require('../../services/room');
const { abort } = require('../../../helpers/error');

const validate = async ({ name, roomId }) => {
  try {
    const schema = Joi.object({
      roomId: Joi.number().min(1),
      name: Joi.string().required(),
    });
    return await schema.validate({ name, roomId });
  } catch (error) {
    return abort(400, 'Params Error');
  }
};

const update = async (req, res) => {
  const { name } = req.body;
  const { roomId } = req.params;
  const homeId = req.home.id;

  await validate({ name, roomId });
  await roomService.update({
    roomId,
    name,
    homeId,
  });
  res.status(204).send();
};

module.exports = update;
