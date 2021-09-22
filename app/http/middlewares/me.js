const { Home } = require('../../models');
const jwt = require('../../helpers/jwt');

async function getHome(req) {
  const authorization = req.headers.authorization || '';
  if (authorization === '') return false;
  if (!authorization.startsWith('Bearer ')) return false;
  const token = authorization.slice(7, authorization.length);
  const payload = await jwt.parse(token);
  if (payload === false) return false;
  const home = await Home.query().findOne({ id: payload.homeId });
  if (!home) return false;
  return home;
}

async function me(req, res, next) {
  const home = await getHome(req);
  req.home = home;
  next();
}

module.exports = me;
