const knex = require("../db/connection")

function list(reservation_date){
    return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .orderBy("reservation_time")
};

function create(newReservation){
    return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then(createdReservation => createdReservation[0])
};

function read(reservation_id){
    return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .returning("*")
    .then(foundRes => foundRes[0])
};

module.exports = {
    list,
    create,
    read
};