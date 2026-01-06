let { Router } = require("express")
const { triggerDispatchRequestController, triggerSocket } = require("./controllers")
let route = Router()

route.post("/trigger-dispatch-request", triggerDispatchRequestController)
route.post("/trigger-dispatch-socket", triggerSocket)

module.exports = route;
