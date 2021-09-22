const convertParams = ((req, res, next) => {
  const { params } = req;

  Object.keys(params).forEach((element) => {
    req.params[element] = Number(params[element]);
  });

  next();
});

module.exports = convertParams;
