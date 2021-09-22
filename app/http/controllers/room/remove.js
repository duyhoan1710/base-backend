const Joi = require('joi');

const roomService = require('../../services/room');
const { abort } = require('../../../helpers/error');

const validate = async ({ roomId }) => {
  try {
    const schema = Joi.object({
      roomId: Joi.number().min(1).required(),
    });
    return await schema.validate({ roomId });
  } catch (error) {
    return abort(400, 'Params Error');
  }
};

const remove = async (req, res) => {
  const { roomId } = req.params;
  const homeId = req.home.id;

  await validate({ roomId });
  await roomService.remove({
    roomId,
    homeId,
  });
  res.status(204).send();
};

module.exports = remove;
