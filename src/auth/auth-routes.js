let { Router } = require("express")
const { LoginController, SignUpController, ResetPassword, GetAllUsers, GetSingleUser, verifyOtpController, DeleteAccountController, resendOtpController, uploadAvatar, UpdateUserInfoController, CreateHealthIDController  } = require("./auth-controllers")
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

let route = Router()
 
route.post("/login", LoginController)
route.post("/signup", SignUpController)
route.post("/verify-otp", verifyOtpController)
route.post("/resend-otp", resendOtpController)
route.post("/ResetPWD", ResetPassword)
route.get("/AllUsers", GetAllUsers)
route.get("/single/:phone", GetSingleUser)
route.get("/singleUser/:firebaseUID", GetSingleUser)
route.post("/delete-account", DeleteAccountController)
route.post("/upload-avatar", upload.single("avatar"), uploadAvatar)

// update user info
route.post("/update-user-info", UpdateUserInfoController)
route.post("/create-health-id", CreateHealthIDController)

module.exports = route