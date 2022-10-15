/**
 * List handler for reservation resources
 */

const asyncErrBoundary = require("../errors/asyncErrorBoundary")
async function list(req, res) {
  res.json({
    data: [],
  });
}

async function create(req, res){

}

module.exports = {
  list: asyncErrBoundary(list),
  create: asyncErrBoundary(create)
};
