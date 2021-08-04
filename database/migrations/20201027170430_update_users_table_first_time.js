exports.up = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.integer('task_count');
  });
};

exports.down = async () => {
};
