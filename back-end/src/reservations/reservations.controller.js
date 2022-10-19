/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrBoundary = require("../errors/asyncErrorBoundary");
const moment = require("moment");

// --- validation middleware ---
const validProperties = [
  "first_name", 
  "last_name", 
  "mobile_number", 
  "reservation_date", 
  "reservation_time", 
  "people"
];

const hasProperties = (req, res, next) => {
  const { data = {} } = req.body
  
  for (let property of validProperties){
    if (!data.hasOwnProperty(property)){
      next({status:400, message: `${property} is required`})
    }
  }
  next();
};

const hasValidName = (property) => {
  return (req, res,next) => {
    if (!req.body.data[property]){
      next({status: 400, message: `${property} is invalid`})
    }
    next();
  }
};

const hasValidPartySize = (party) => {
  return (req, res, next) => {
    if (req.body.data[party] <= 0){
      next({status: 400, message: "Party size must be greater than 0."})
    }
    next();
  }
};

// --- router middleware ---
async function list(req, res) {
  const date = req.query.date ? req.query.date : moment().format('YYYY-MM-DD')
  const data = await service.list(date)
  res.json({data});
};

async function create(req, res){
  const data = await service.create(req.body.data)
  res.status(201).json({ data})
};

module.exports = {
  list: asyncErrBoundary(list),
  create: [
    hasProperties,
    hasValidName("first_name"),
    hasValidName("last_name"),
    hasValidPartySize("people"),
    asyncErrBoundary(create)
  ]
};
