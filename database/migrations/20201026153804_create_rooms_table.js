exports.up = async (knex) => {
  await knex.schema.createTable('rooms', (table) => {
    table.increments('id');
    table.string('name', 127).collate('utf8_general_ci');
    table.integer('home_id').unsigned().references('homes.id');
    table.tinyint('is_delete', 1);

    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('rooms');
};
