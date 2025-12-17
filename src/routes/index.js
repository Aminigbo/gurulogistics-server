let { Router } = require("express")

let route = Router()


// firebase Push notification
route.use("/firebase", require("../firebase/route.js"))

// Email routes
route.use("/email", require("../email/route.js"))

// triggers
route.use("/triggers", require("../triggers/route.js"))

// admin routes
route.use("/admin", require("../admin/admin-routes.js"))

module.exports = route