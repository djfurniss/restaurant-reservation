const service = require("./reservations.service");
const asyncErrBoundary = require("../errors/asyncErrorBoundary");
const moment = require("moment");

// --- validation middleware ---
const requiredProperties = [
  "first_name", 
  "last_name", 
  "mobile_number", 
  "reservation_date", 
  "reservation_time", 
  "people"
];

  //makes sure req.body.data has all of the required properties
const hasProperties = (req, res, next) => {
  const { data = {} } = req.body;
  
  for (let property of requiredProperties){
    if (!data.hasOwnProperty(property)){
      next({status:400, message: `${property} is required`});
    };
  };
  next();
};

const hasValidNames = (req, res, next) => {
    const { first_name, last_name } = req.body.data;
    if (!first_name.trim()){
      next({status: 400, message: "first_name is invalid"});
    };
    if (!last_name.trim()){
      next({status: 400, message: "last_name is invalid"});
    };
    next();
};

const hasValidPartySize = (req, res, next) => {
    let { people } = req.body.data
    if (typeof people != "number"){
        next({status: 400, message: "people property must be a number"});
    }
    if (people <= 0){
      next({status: 400, message: "people property must be greater than 0."});
    }
    next();
};

const hasValidMobileNumber = (req, res, next) => {
    const { mobile_number } = req.body.data;
    if (!mobile_number.trim()){
      next({status: 400, message: "mobile_number must not be empty"});
    };
    next();
};

const hasValidResDate = (req, res, next) => {
    const { reservation_date } = req.body.data;
    const pattern = /\d{4}-\d{2}-\d{2}/;
    if (!pattern.test(reservation_date)){
      next({status: 400, message: "reservation_date is not a valid date"});
    };
    // if the date is before the current day, send an error message
    const today = moment().format('YYYY-MM-DD')
    if ( reservation_date < today){
      next({status: 400, message: "Please schedule a reservation at a future date."})
    };
    //if the day is Tuesday, send an error message
    const reservationDay = moment(reservation_date).format("dddd")
    if (reservationDay === "Tuesday"){
      next({status: 400, message: "We are closed on Tuesdays, please select another day."})
    };

    next();
};

const hasValidResTime = (req, res, next) => {
    const { reservation_time } = req.body.data;
    const pattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!pattern.test(reservation_time)){
      next({status: 400, message: "reservation_time is not a valid time"});
    };

    if (reservation_time < "10:30" || reservation_time > "21:30"){
      next({status: 400, message: "Reservation must be between 10:30 AM and 9:30 PM"});
    };

    const today = moment().format("YYYY-MM-DD");
    const currentTime = moment().format("HH:mm"); // ==> 00:00 - 23:59 range
    if (req.body.data.reservation_date === today  && reservation_time < currentTime){
      next({status: 400, message: "Please select a future time for today"});
    }
    next();
};

const isBooked = (req, res, next) => {
  const { data } = req.body
  if (data.status && data.status !== "booked"){
    next({status: 400, message: `reservation status must not be ${data.status}`})
  };
  next();
};

const reservationExists = async(req, res, next) => {
  const foundRes = await service.read(req.params.reservation_id)
  if (!foundRes){
    next({status: 404, message: `99`})
  };
  res.locals.reservation = foundRes
  next();
};

const hasValidStatus = (req, res, next) => {
  const { status } = res.locals.reservation
  const { data = {} } = req.body

  if (data.status === "cancelled"){
    next();
  }else if (status == "finished"){
    next({status: 400, message: "cannot update a finished table"})
  }else if (data.status == "booked" || data.status == "seated" || data.status == "finished"){
    next();
  }else next({status: 400, message: "unknown status"});
};

// --- router middleware ---
async function list(req, res) {
  const date = req.query.date ? req.query.date : moment().format('YYYY-MM-DD');
  if (req.query.mobile_number){
    const data = await service.findByNumber(req.query.mobile_number)
    res.json({data});
  }else{
    const data = await service.list(date);
    res.json({data});
  };
};

async function create(req, res){
  const data = await service.create(req.body.data);
  res.status(201).json({ data});
};

async function read(req, res, next){
  // this function depends on wether the reservation_id is coming from the request's params or the body's data
  // the rest of the client's request will behave differntly in each case
  // both return the same error message

  // it will always deal with a varaible named reservation_id
  let reservation_id
  // if it's defined in the url params, 
  if(req.params.reservation_id){ 
    // the varialbe gets its assignment, 
    reservation_id = req.params.reservation_id
    const foundRes = await service.read(reservation_id)
    if(foundRes){
      // once the reservation is found, it's returned to the client and the request ends
      res.json({data: foundRes})
    }else next({status: 404, message: "999"})

  // if the reservation_id is within the req.body.data though, 
  }else if (req.body.data.reservation_id){
    // the variable gets its assignment
    reservation_id = req.body.data.reservation_id
    const foundRes = await service.read(reservation_id)
    if(foundRes){
      // HERE is the difference
      // once the reservation is found, the request is not over,it will get passed to the next piece of middleware with the reservation that was found as part of res.locals to be accessed throug the rest of the request
      res.locals.reservation = foundRes
      next();
    }else next({status: 404, message: "999"})
  };
};

async function update(req, res){
  const { reservation_id } = res.locals.reservation
  const data = await service.update(reservation_id, req.body.data)
  res.json({ data })
};

/*
  This update function is not made to be used. This is only tested in the backend. 
  Whenever a reservation's status needs to be changed, an api call is made to /tables/:table_id/seat and those middware functions use the reservations service directly to modify the reservation's status.
*/
async function updateStatus(req, res){
  const { status } = req.body.data
  const { reservation_id } = res.locals.reservation
  await service.updateStatus(reservation_id, status)
  res.json({data: {status}})
};

module.exports = {
  list: asyncErrBoundary(list),
  create: [
    hasProperties,
    hasValidNames,
    hasValidPartySize,
    hasValidMobileNumber,
    hasValidResDate,
    hasValidResTime,
    isBooked,
    asyncErrBoundary(create)
  ],
  update: [
    asyncErrBoundary(reservationExists),
    hasProperties,
    hasValidNames,
    hasValidPartySize,
    hasValidMobileNumber,
    hasValidResDate,
    hasValidResTime,
    asyncErrBoundary(update)
  ], 
  updateStatus: [
    asyncErrBoundary(reservationExists),
    hasValidStatus,
    asyncErrBoundary(updateStatus)
  ],
  read: asyncErrBoundary(read)
};
