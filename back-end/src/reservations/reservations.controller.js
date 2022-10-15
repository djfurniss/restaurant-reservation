/**
 * List handler for reservation resources
 */
const service = require("./reservations.service")
const asyncErrBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
  const data = await service.list()
  res.json({data});
}

async function create(req, res){
  const data = await service.create(req.body.data)
  res.status(203).json({ data})
}

module.exports = {
  list: asyncErrBoundary(list),
  create: asyncErrBoundary(create)
};
