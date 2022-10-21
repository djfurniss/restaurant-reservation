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

const hasValidNames = () => {
  return (req, res, next) => {
    const { first_name, last_name } = req.body.data;
    if (!first_name.trim()){
      next({status: 400, message: "first_name is invalid"});
    };
    if (!last_name.trim()){
      next({status: 400, message: "last_name is invalid"});
    };
    next();
  };
};

const hasValidPartySize = () => {
  return (req, res, next) => {
    let { people } = req.body.data
    if (typeof people != "number"){
        next({status: 400, message: "people property must be a number"});
    }
    if (people <= 0){
      next({status: 400, message: "people property must be greater than 0."});
    }
    next();
  };
};

const hasValidMobileNumber = () => {
  return (req, res, next) => {
    const { mobile_number } = req.body.data;
    if (!mobile_number.trim()){
      next({status: 400, message: "mobile_number must not be empty"});
    };
    next();
  };
};

const hasValidResDate = () => {
  return (req, res,next) => {
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
};

const hasValidResTime = () => {
  return (req, res,next) => {
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
};

// --- router middleware ---
async function list(req, res) {
  const date = req.query.date ? req.query.date : moment().format('YYYY-MM-DD');
  const data = await service.list(date);
  res.json({data});
};

async function create(req, res){
  const data = await service.create(req.body.data);
  res.status(201).json({ data});
};

module.exports = {
  list: asyncErrBoundary(list),
  create: [
    hasProperties,
    hasValidNames(),
    hasValidPartySize(),
    hasValidMobileNumber(),
    hasValidResDate(),
    hasValidResTime(),
    asyncErrBoundary(create)
  ]
};
