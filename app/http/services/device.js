const { Room, Device } = require('../../models');

const { abort } = require('../../helpers/error');
const deviceStatus = require('../../enums/deviceStatus');

exports.create = async ({
  homeId,
  roomId,
  name,
}) => {
  const room = await Room.query().findOne({
    id: roomId,
    is_delete: false,
  });

  if (!room) return abort(400, 'Room is not already exists');
  if (room.home_id !== homeId) return abort(403, 'Access denied');

  await Device.query().insert({
    room_id: roomId,
    name,
    status: deviceStatus.OFF,
    digital_io: 1,
    is_delete: false,
  });

  return '';
};

exports.update = async ({
  homeId,
  roomId,
  deviceId,
  name,
  status,
  digitalIo,
}) => {
  const room = await Room.query()
    .findOne({
      id: roomId,
      is_delete: false,
    });

  if (!room) return abort(400, 'Room is not already exists');
  if (room.home_id !== homeId) return abort(403, 'Access denied');

  const device = await Device.query()
    .findOne({
      id: deviceId,
      is_delete: false,
    });

  if (!device) return abort(400, 'Device is not already exits');
  if (device.room_id !== roomId) return abort(403, 'Access denied');

  await device.$query()
    .update({
      name,
      status,
      digital_io: digitalIo,
    });

  return '';
};

exports.getList = async ({ homeId, roomId }) => {
  const room = await Room.query()
    .findOne({
      id: roomId,
      is_delete: false,
    });

  if (!room) return abort(400, 'Room is not already exists');
  if (room.home_id !== homeId) return abort(403, 'Access denied');

  const devices = await Device.query()
    .select('id', 'name', 'status', 'digital_io')
    .where({
      room_id: roomId,
      is_delete: false,
    });

  return devices;
};

exports.remove = async ({ roomId, homeId, deviceId }) => {
  const room = await Room.query()
    .findOne({
      id: roomId,
      is_delete: false,
    });

  if (!room) return abort(400, 'Room is not already exits');
  if (room.home_id !== homeId) return abort(403, 'Access denied');

  const device = await Device.query()
    .findOne({
      id: deviceId,
      is_delete: false,
    });

  if (!device) return abort(400, 'Device is not already exits');
  if (device.room_id !== roomId) return abort(403, 'Access denied');

  await device.$query()
    .update({
      is_delete: true,
    });

  return '';
};
