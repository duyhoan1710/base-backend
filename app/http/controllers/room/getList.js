const roomService = require('../../services/room');

const getList = async (req, res) => {
  const homeId = req.home.id;
  const rooms = await roomService.getList({
    homeId,
  });
  res.status(200).send(rooms);
};

module.exports = getList;
