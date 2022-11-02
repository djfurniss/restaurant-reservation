const asyncErrBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const { read: reservationExists } = require("../reservations/reservations.controller");
const { updateStatus: updateResStatus } = require("../reservations/reservations.service");

// --- validation middleware ---
    const REQUIRED_PROPERTIES = ["table_name", "capacity"];

    const hasValidData = (req, res, next) => {
        // checks to see if the request body has data and if that data has the reservation_id
        if (!req.body.data) {
            next({status: 400, message:"request body data is missing"});
        };
        if (!req.body.data.reservation_id) {
            next({status: 400, message:"reservation_id is missing"});
        };
        next();
    };

    const tableExists = async(req, res, next) => {
        const { table_id } = req.params;
        const foundTable = await service.read(table_id);
        if (foundTable){
            res.locals.table = foundTable;
            next();
        } else next({status: 404, message: `table with id ${table_id} does not exist`});
    };

    // makes sure a table is occupied before removing a reservation assignment
    const isOccupied = (req, res, next) => {
        const { reservation_id } = res.locals.table;
        if (!reservation_id) {
            next({status: 400, message: `table is not occupied`});
        };
        next();
    };

    const canSeatParty = async(req, res, next) => {
    // after validating that the table exists, the table can be accessed through res locals
        const { capacity } = res.locals.table;
        // after using the reservation's validation to check if the reservation exists, the reservation can be found in res.locals
        const { people, status } = res.locals.reservation;
        // if the table is occupied, it cannot seat the party
        if (res.locals.table.reservation_id != null){
            next({status: 400, message: "This table is occupied"});
        };
        // if the party size is too big
        if (people > capacity){
            next({status: 400, message: `Party of ${people} cannot fit at this table's capacity.`});
        };
        if (status === "seated"){
            next({status: 400, message:`reservation is already seated`});
        };
        next();
    };

    const hasProperties = (req, res, next) => {
        const { data = {}} = req.body;
        for (let prop of REQUIRED_PROPERTIES){
            if (!data.hasOwnProperty(prop)){
                next({status: 400, message: `${prop} is required`})
            };
        };
        next();
    };

    const hasValidName = (req, res, next) => {
        const { table_name } = req.body.data
        if (table_name.length < 2){
            next({status: 400, message: "table_name must be at least 2 characters."})
        };
        next();
    };

    const hasValidCapacity = (req, res, next) => {
        const { capacity } = req.body.data

        if (typeof capacity != "number") next({status: 400, message:"capacity must be a number"})
        if (capacity <=0 ) next({status: 400, message: "capacity must be greater than 0"})
        next();
    };

// --- router level middleware ---
    async function list (req, res) {
        const data  = await service.list()
        res.json({ data })
    };

    async function create (req, res) {
        const data = await service.create(req.body.data);
        res.status(201).json({ data })
    };

    async function update (req, res) {
        // the table_id from params goes through verification and is assigned into locals if it's valid and exists
        const { table_id } = res.locals.table
        // the reservation from the request body also goes through verification and is assigned to locals if it's valid and exists
        const { reservation_id } = res.locals.reservation
        // once everything goes through validation, the update service is called
        // await updateResStatus(reservation_id)
        const updatedTable = await service.update(table_id, reservation_id)
        // ? the tests don't make their own api call to /reservation/:reservation_id/status so I had to import the service function from the reservations.service into this one api call to update the reservation's status
        await updateResStatus(reservation_id, "seated");
        // the table is returned with the updated information
        res.json({data: updatedTable})
        // next();
    };

    async function destroy (req, res) {
        const { table_id, reservation_id } = res.locals.table
        await updateResStatus(reservation_id, "finished")
        await service.finishTable(table_id)
        // res.sendStatus(204)
        res.json({data: "done!"})
    };

// --- exports ---
module.exports = {
    list: asyncErrBoundary(list),
    create: [
        hasProperties,
        hasValidName,
        hasValidCapacity,
        asyncErrBoundary(create)
    ],
    update: [
        hasValidData,
        reservationExists,
        asyncErrBoundary(tableExists),
        canSeatParty,
        asyncErrBoundary(update)],
    delete: [
        asyncErrBoundary(tableExists),
        isOccupied,
        asyncErrBoundary(destroy)
    ]
};