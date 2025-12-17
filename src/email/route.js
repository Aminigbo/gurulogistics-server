let { Router } = require("express")
const {
    sendEmailController,
    sendOTPController,
    sendWelcomeController,
    sendDispatchNotificationController,
} = require("./controller")

let route = Router()

// Legacy endpoint (keeping for backward compatibility)
route.post("/send-email", sendEmailController)

// New email endpoints
route.post("/send-otp", sendOTPController)
route.post("/send-welcome", sendWelcomeController)
route.post("/send-dispatch-notification", sendDispatchNotificationController)

module.exports = route;
