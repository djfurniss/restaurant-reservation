const tables = require("../fixtures/tables");
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
  return knex('tables').insert(tables);
};
