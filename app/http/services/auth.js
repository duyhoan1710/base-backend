const bcrypt = require('bcrypt');
const { generate } = require('../../helpers/jwt');

const { Home } = require('../../models');
const { abort } = require('../../helpers/error');

exports.signIn = async ({ email, password }) => {
  const home = await Home.query()
    .findOne('email', email);
  if (!home || !(await bcrypt.compare(password, home.password))) return abort(400, 'email or password is incorrect');
  const accessToken = await generate({ homeId: home.id });
  return { accessToken };
};

exports.signUp = async ({
  email,
  password,
  name,
}) => {
  if (await Home.emailExists(email)) return abort(400, 'Email is already exist');
  const salt = parseInt(process.env.SALT_ROUNDS, 10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await Home.query()
    .insert({
      email,
      password: hashPassword,
      name,
    });
  const result = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
  return result;
};
