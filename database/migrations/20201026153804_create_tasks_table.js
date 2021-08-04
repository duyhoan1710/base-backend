exports.up = async (knex) => {
  await knex.schema.createTable('tasks', (table) => {
    table.increments('id');
    table.string('title', 127).collate('utf8_general_ci');
    table.string('description').nullable().collate('utf8_general_ci');
    table.tinyint('status');
    table.integer('user_id').unsigned().references('users.id');

    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('tasks');
};
