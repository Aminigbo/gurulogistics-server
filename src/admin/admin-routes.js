let { Router } = require("express")
const { Properties } = require("./admin-controllers")

let route = Router()

route.get("/properties", Properties)




module.exports = route