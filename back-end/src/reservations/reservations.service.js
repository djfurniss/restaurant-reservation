const knex = require("../db/connection")

function list(){
    return knex("reservations")
    .select("*")
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
}