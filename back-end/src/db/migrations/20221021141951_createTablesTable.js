/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

require("dotenv").config()

exports.up = function (knex) {
    return knex.schema.createTable("tables", (table) => {
      table.increments("table_id").primary();
      table.string("table_name").notNullable();
      table.integer("capacity").notNullable();
      table.integer("reservation_id");
        table.foreign("reservation_id")
        .references("reservation_id")
        .inTable("reservations")
      table.unique(["table_id", "reservation_id"])
      table.timestamps(true, true);
    });
};
  
  exports.down = function (knex) {
    return knex.schema.dropTable("tables");
};