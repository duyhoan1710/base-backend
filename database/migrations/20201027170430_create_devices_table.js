exports.up = async (knex) => {
  await knex.schema.createTable('devices', (table) => {
    table.increments('id');
    table.string('name', 127).collate('utf8_general_ci');
    table.tinyint('status', 1);
    table.integer('digital_io');
    table.integer('room_id').unsigned().references('rooms.id');
    table.tinyint('is_delete', 1);

    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('devices');
};
