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
      next({status: 400, message: `${property} is required`})
    }
  }
  next();
};

const hasValidProperties = (property) => {
  return (req, res,next) => {
    
  }
}

// --- router middleware ---
async function list(req, res) {
  const date = req.query.date ? req.query.date : moment().format('YYYY-MM-DD')
  const data = await service.list(date)
  res.json({data});
};

async function create(req, res){
  const data = await service.create(req.body.data)
  res.status(203).json({ data})
};

module.exports = {
  list: asyncErrBoundary(list),
  create: [
    hasProperties,
    asyncErrBoundary(create)
  ]
};
