const knex = require("../db/connection")

function list(reservation_date){
    return knex("reservations")
    .select("*")
    .where({ reservation_date })
}

function create(newReservation){
    return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then(createdReservation => createdReservation[0])
}

module.exports = {
    list,
    create
};