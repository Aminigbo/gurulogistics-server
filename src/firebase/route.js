let { Router } = require("express")
const { sendToSingleToken, sendToMultipleToken } = require("./controller.js") 

 

let route = Router()

route.post("/", sendToSingleToken)  
route.post("/multiple", sendToMultipleToken)  

module.exports = route