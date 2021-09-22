const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.seed = async (knex) => {
  await knex('homes').del();
  await knex('homes').insert([{
    email: 'peter.pan@amela.vn',
    password: await bcrypt.hash('123456', saltRounds),
    name: 'Peter Pan',
  }]);
};
