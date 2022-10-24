const asyncErrBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

const REQUIRED_PROPERTIES = [
    "table_name", "capacity"
]

// --- validation middleware ---
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
        if (capacity <=0 ){
            next({status: 400, message: "capacity must be greater than 0"})
        };
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
}

module.exports = {
    list: asyncErrBoundary(list),
    create: [
        hasProperties,
        hasValidName,
        hasValidCapacity,
        asyncErrBoundary(create)
    ],
};