const asyncErrBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service")

async function list (req, res) {
    const data  = await service.list()
    res.json({ data })
}

module.exports = {
    list: asyncErrBoundary(list)
}