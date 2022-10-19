const reservations = require("../fixtures/reservations")
exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
  return knex("reservations").insert(reservations)
};
