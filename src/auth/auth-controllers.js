const { supabase } = require("../../config/supabase-auth");
const { SuccessObject, ErrorObject, generateOTP } = require("../utilities");
const { EmailOTP } = require("../utilities/email");
const { OtpEmailTemplate } = require("../utilities/email-templates/otp-email");
const { SendEmail } = require("../utilities/send-email");
const { SendSMS } = require("../utilities/send-sms");
const { FetchMetaData, AddUser_meta, PublicFolderModel, EditPassword, FetchAllMetaData, SignupModel, LoginModel, UpdateUserPublicTable, UpdateUserInfoModel, DeleteUserModel, DeletePublicUserModel, FetchUserDataById, GetUserByUUIDmodel, ChangePassword, FetchUserByEmail } = require("./auth-models")
// let OTP = Date.now().toString().slice(-5);
let OTP = "12345";
// const {EmailTemplate} = OtpEmailTemplate({ otp: OTP })

function LoginController(req, res) {
    let { email, password, FcmToken } = req.body
    LoginModel({ email, password })
        .then(response => {
            if (response.error != null) {
                // console.log(response)
                return res.send(ErrorObject(response.error.message))
            } else {
                console.log("response", response.data.user.isVerified)
                if (response.data.user.isVerified === false) {
                    console.log("isVerified is false")
                     

                    EmailOTP({
                        to: email,
                        subject: "Email Verification",
                        html: OtpEmailTemplate({ otp: OTP }),
                        from: "bcsbethelfinder@gmail.com",
                    })
                    res.send({
                        success: true,
                        message: "Confirm the OTP sent to your email address",
                        action: "ENTER OTP",
                        data: {
                            ...response.data.user,
                            OTP: OTP,
                        },
                    })

                } else {
                    console.log("isVerified is true")
                    UpdateUserPublicTable({ token: FcmToken, id: response.data.user.uid })
                        .then(responseX => { 
                            // console.dir(response)
                            res.send(SuccessObject("Success", response.data.user))
                        })

                }
            }
        })
        .catch(error => {
            console.log(error)
            res.send(ErrorObject("A server error occured"))
        })
}


//  add password and allow login
function SignUpController(req, res, next) {
    let { name, email, password, phone, FcmToken } = req.body;

    console.log(OTP)
    if (!name || !email || !phone || !password) {
        res.send({
            success: false,
            message: "Provide all data",
            data: [],
        })
    } else {

        let newData = {
            // ...data,
            name,
            phone: phone.slice(-10),
            email,
            password, // salt this password later
            fcmToken: FcmToken,
            role: "user",
            isVerified: true
        }

        SignupModel(newData)
            .then(regResX => {
                console.log("Registration response", regResX)
                if (regResX.error != null) {
                    res.send({
                        success: false,
                        message: regResX.error.message,
                        data: [],
                    })
                } else {
                    EmailOTP({
                        email: email,
                        OTP,
                        name: name
                    })
                        .then(responseSMS => {
                            // console.log("regResX", regResX.data)
                            let userData = {
                                ...regResX.data,

                            }

                            res.send({
                                success: true,
                                message: "Confirm the OTP sent to your registered email address and phone number",
                                // action: "ENTER OTP",
                                action: "ENTER OTP", //ENTER OTP or NO OTP
                                data: {
                                    OTP: OTP,
                                    userData
                                },
                            })
                        })
                        .catch(error => {
                            console.log("error", error)
                        })
                }
            })
            .catch(error => {

            })


    }

}


//  reset password
function ResetPassword(req, res, next) {
    let { email, password } = req.body;
    // res.send({
    //     success: true,
    //     message: "Password updated successfully",
    //     data: data
    // })
    FetchUserByEmail(email)
        .then(response => {
            if (response.error != null) {
                return res.send(ErrorObject(response.error.message))
            } else {
                ChangePassword({ uuid: response.data[0].userID, password: password })
                    .then(response => {
                        if (response.error != null) {

                            console.log("response", response)
                            return res.send(ErrorObject(response.error.message))
                        } else {
                            console.log("response", response)
                            return res.send(SuccessObject("Password updated successfully"))

                        }
                    })
                    .catch(error => {
                        console.log("error", error)
                        return res.send(ErrorObject(error.message))
                    })
            }
        })
        .catch(error => {
            console.log("error", error)
            return res.send(ErrorObject(error.message))
        })

}


function resendOtpController(req, res) {
    let { email } = req.body

    SendEmail({
        to: email,
        subject: "Email Verification",
        html: OtpEmailTemplate({ otp: OTP }),
        from: "bcsbethelfinder@gmail.com",
    })
    console.log(OTP, "resent to", email)
    res.send({
        success: true,
        message: "OTP resent to your email address",
        data: {
            OTP: OTP,
        },
    })
}

function GetAllUsers(req, res) {
    FetchAllMetaData()
        .then(response => {
            if (response.error != null) {
                res.send({
                    success: false,
                    message: "An error occured",
                    data: [],
                })
            } else {
                res.send({
                    success: true,
                    message: "successful",
                    data: response.data,
                })
            }
        })
        .catch(error => {
            res.send({
                success: false,
                message: "An error occured",
                data: [],
            })
        })
}

function GetSingleUser(req, res) {
    let { firebaseUID } = req.params
    // console.log("firebaseUID", firebaseUID)
    FetchUserDataById(firebaseUID)
        .then(response => {
            // console.log(response.data[0])
            if (response.error != null) {
                res.send({
                    success: false,
                    message: "An error occured",
                    data: [],
                })
            } else {
                res.send({
                    success: true,
                    message: "Successful",
                    data: response.data[0],
                })
            }
        })
        .catch(error => {
            res.send({
                success: false,
                message: "An error occured",
                data: [],
            })
        })
}


function verifyOtpController(req, res) {
    let OTP = Date.now().toString().slice(-5);
    let { uuid, data } = req.body
    // console.log(req.body)
    UpdateUserInfoModel({ UUID: uuid, data })
        .then(response => {
            if (response.error != null) {
                return res.send(ErrorObject(response.error.message))
            }



            res.send(SuccessObject("Success", data))
        })
}


function DeleteAccountController(req, res) {
    let { uuid } = req.body;

    if (!uuid) {
        return res.send(ErrorObject("Invalid user"))
    }

    DeleteUserModel(uuid)
        .then(response => {
            if (response.error) {
                console.log("First response", response)
                return res.send(ErrorObject(response.error.message))
            }

            DeletePublicUserModel(uuid)
                .then(response2 => {
                    if (response2.error) {
                        return res.send(ErrorObject(response2.error.message))
                    }

                    res.send(SuccessObject("Account deleted"))
                })
                .catch(error => {
                    console.log(error)
                    return res.send(ErrorObject("A server error occured"))
                })

        })
        .catch(error => {
            console.log(error)
            return res.send(ErrorObject("A server error occured"))
        })

}

function uploadAvatar(req, res) {
    let { uuid } = req.body;

    const bufferData = req.file.buffer;
    const base64Image = Buffer.from(bufferData).toString('base64');
    const fileType = req.file.mimetype;


    // Determine field name and file name based on file type
    const fieldName = fileType.startsWith('image/') ? 'image' : 'video';
    const fileExtension = fileType.split('/').pop(); // Extract file extension 
    const fileName = `${Math.random()}.${fileExtension}`;



    function base64toBlob(base64Data, contentType = fileType) {
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    }

    // Convert base64 to a Blob
    const blob = base64toBlob(base64Image);

    // Create a FormData object and append the blob as a file
    const formData = new FormData();
    formData.append(fieldName, blob, fileName);// 'image' is the field name, 'image.png' is the file name

    supabase.storage
        .from('images') // Replace with your Supabase bucket name
        .upload(fileName, formData)
        .then(imageUpload => {

            let filePath = `https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/images/${imageUpload.data.path}`;

            if (filePath) {
                UpdateUserInfoModel({ UUID: uuid, data: { avatar: filePath } })
                    .then(response => {
                        // console.log(response)
                        if (response.error != null) {
                            return res.send(ErrorObject(response.error.message))
                        }
                        res.send(SuccessObject("Avatar uploaded", {
                            avatar: filePath
                        }))
                    })
            } else {
                res.send({
                    success: false,
                    message: "An error occured",
                    data: null
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.send({
                success: false,
                message: "An error occured",
                data: null
            })
        })
}

function UpdateUserInfoController(req, res) {
    let { uuid, data } = req.body;
    // console.log("data", data)
    // console.log("uuid", uuid)
    UpdateUserInfoModel({ UUID: uuid, data })
        .then(response => {
            // console.log("response", response)
            if (response.error != null) {
                return res.send(ErrorObject(response.error.message))
            }
            res.send(SuccessObject("User info updated", response.data))
        })
        .catch(error => {
            // console.log(error)
            return res.send(ErrorObject("An error occured"))
        })
}

// create health ID
async function CreateHealthIDController(req, res) {
    try {
        const { name, gender, email, dob, uuid } = req.body;

        console.log("body", req.body)

        const fetch = require('node-fetch');

        const myHeaders = {
            "Content-Type": "application/json",
            "Authorization": "Bearer pk_live_5da1be9d-f369-40ea-b012-4f791696daf3" // healthstack API key
        };

        const raw = JSON.stringify({
            name: name,
            gender: gender,
            dob: dob,
            email: email
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch("https://healthstack-server-five.vercel.app/api/v1/patients/create", requestOptions);
            const result = await response.text();
            // console.log("HealthID API result:", result);

            // Try to parse JSON in case result is valid JSON
            let data;
            try {
                data = JSON.parse(result);
            } catch (e) {
                data = null;
            }

            if (response.ok && data) {
                console.log("data", data)
                await UpdateUserInfoModel({ UUID: uuid, data: { healthID: data } })
                return res.send(SuccessObject("Health ID created successfully", data));
            } else {
                return res.send(ErrorObject("Failed to create Health ID"));
            }
        } catch (err) {
            console.error("Error creating health ID:", err);
            return res.send(ErrorObject("An error occured while creating Health ID"));
        }
    }
    catch (error) {
        console.log(error)
        return res.send(ErrorObject("An error occured"))
    }
}



module.exports = {
    LoginController,
    SignUpController,
    ResetPassword,
    GetAllUsers,
    GetSingleUser,
    verifyOtpController,
    DeleteAccountController,
    resendOtpController,
    uploadAvatar,
    UpdateUserInfoController,
    CreateHealthIDController
}