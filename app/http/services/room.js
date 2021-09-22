const { abort } = require('../../helpers/error');
const { Room } = require('../../models');

exports.create = async ({
  homeId,
  name,
}) => {
  await Room.query().insert({
    home_id: homeId,
    name,
    is_delete: false,
  });
};

exports.update = async ({
  homeId,
  roomId,
  name,
}) => {
  const room = await Room.query().findOne({
    id: roomId,
    is_delete: false,
  });

  if (!room) return abort(400, 'Room is not already exists');
  if (room.home_id !== Number(homeId)) return abort(403, 'Access denied');

  await room.$query()
    .update({
      name,
    });

  return '';
};

exports.getList = async ({ homeId }) => {
  const rooms = await Room.query()
    .select('id', 'name')
    .where({
      home_id: homeId,
      is_delete: false,
    });

  return rooms;
};

exports.remove = async ({ roomId, homeId }) => {
  const room = await Room.query()
    .findOne({
      id: roomId,
      is_delete: false,
    });

  if (!room) return abort(400, 'Room is not already exits');
  if (room.home_id !== homeId) return abort(403, 'Access denied');

  await room.$query()
    .update({
      is_delete: true,
    });

  return '';
};
