
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function(table) {
    table.increments();
    table.string('title').notNullable().unique();
    table.string('cover').notNullable();
    table.timestamps();

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games');

};
