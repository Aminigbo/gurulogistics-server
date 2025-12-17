let { Router } = require("express")
const { triggerDispatchRequestController } = require("./controllers")
let route = Router()

route.post("/trigger-dispatch-request", triggerDispatchRequestController)

module.exports = route;
