/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

require("dotenv").config()

exports.up = function(knex) {
  return knex.schema.alterTable("reservations", (table) => {
    table.string("status").notNullable().defaultTo("booked")
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable("reservations", (table) => {
    table.dropColumn("status")
  })
};
