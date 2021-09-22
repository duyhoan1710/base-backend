function auth(req, res, next) {
  if (!req.home) {
    return res.status(401).send({
      error: 'You must be logged in',
    });
  }

  return next();
}

module.exports = auth;
