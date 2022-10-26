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

function update(reservation_id, status){
    return knex("reservations")
    .update({status})
    .where({reservation_id})
    .returning("*")
    .then(updatedRes => updatedRes[0])
};

module.exports = {
    list,
    create,
    read,
    update,
};