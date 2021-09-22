const deviceService = require('../../services/device');

const getList = async (req, res) => {
  const { roomId } = req.params;
  const homeId = req.home.id;

  const rooms = await deviceService.getList({
    roomId,
    homeId,
  });
  res.status(200).send(rooms);
};

module.exports = getList;
