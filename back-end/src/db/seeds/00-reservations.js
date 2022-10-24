const reservations = require("../fixtures/reservations")
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
  return knex("reservations").insert(reservations)
};
