exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").unsigned().primary();
    table.string("email");
    table.string("password");
    table.string("facebookID");
    table.string("accessToken");
    table.string("google_id");
    table.timestamps(false, true); //date time type (unless true first, only time stamp.)
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
