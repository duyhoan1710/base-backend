function me(req, res) {
  const responseData = {
    id: req.home.id,
    name: req.home.name,
  };

  return res.status(200).send(responseData);
}

module.exports = me;
