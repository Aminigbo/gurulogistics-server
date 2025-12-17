var fcm = require('../../fcm/fcm-lib');
var serviceAccount = require("../../config/fcm-config.json");
const { getUserByEmailController } = require('../controllers');

var FCM = new fcm(serviceAccount);

function sendToSingleToken(req, res) {
    let {
        image,
        id,
        title,
        notificationMessage,
        token
    } = req.body;
    try {
        var message = {
            data: {
                largeImg: image,
                id,
            },
            notification: {
                title,
                body: notificationMessage,
                image: image
            },
            android: {
                priority: 'high',
                notification: { icon: "@mipmap/ic_launcher", }
            },
            token,
        };
        FCM.send(message, function (err, response) {
            if (err) {
                // console.log(err)
                return {
                    error: err
                }
            } else {
                // console.log(response)
                res.send(response)
                return {
                    message: response
                }
            }

        })
    }
    catch (error) {
        // console.log(error)
        return {
            error: error
        }
    }
}


function sendToMultipleToken(req, res) {
    let {
        tokens,
        id,
        image,
        title,
        notificationMessage
    } = payload = req.body;

    tokens.forEach(token => {
        sendToSingleTokenFunction({
            image,
            id,
            title,
            notificationMessage,
            token,
        })
    });

    res.send("response")

}


// ========
function sendToSingleTokenFunction({
    image,
    id,
    title,
    notificationMessage,
    token,
}) {

    try {
        var message = {
            data: {
                largeImg: image,
                id,
            },
            notification: {
                title,
                body: notificationMessage,
                image: image
            },
            android: {
                priority: 'high',
                notification: { icon: "@mipmap/ic_launcher", sound: "default" }
            },
            token,
        };
        FCM.send(message, function (err, response) {
            if (err) {
                console.log(err)
                return {
                    error: err
                }
            } else {
                console.log(response)
                // res.send(response)
                return {
                    message: response
                }
            }

        })
    }
    catch (error) {
        console.log(error)
        return {
            error: error
        }
    }
}

// =======
function sendToMultipleTokenFunction({
    tokens,
    id,
    image,
    title,
    notificationMessage
}) {


    tokens.forEach(token => {
        sendToSingleTokenFunction({
            image,
            id,
            title,
            notificationMessage,
            token,
        })
    });



}



// =======================================================
function sendNotificationFunction({
    audience, image, title, message, email
}) {
    console.log("Notifying....")
    if (!audience || !title || !message) {
        console.log("Invalid payload")
        // return res.send({
        //     success: false,
        //     message: "Invalid payload",
        //     data: null
        // })
    }

    if (audience == "VENDORS") {
        // FetchAllVendors()
        //     .then(response => {
        //         let tokens = []

        //         response.data.forEach(item => {
        //             tokens.push(item.token)
        //         });
        //         sendToMultipleTokenFunction({
        //             tokens,
        //             id: "RIDER:Home",
        //             image: image,
        //             title: title,
        //             notificationMessage: message
        //         })
        //         res.send({
        //             success: true,
        //             message: "Notification sent",
        //             data: null
        //         })
        //     })
        //     .catch(error => {
        //         return res.send({
        //             success: false,
        //             message: "A server error occured",
        //             data: null
        //         })
        //     })
    } else if (audience == "USERS") {
        // FetchAllUsersModel()
        //     .then(response => {
        //         let tokens = []

        //         response.data.forEach(item => {
        //             tokens.push(item.token)
        //         });
        //         sendToMultipleTokenFunction({
        //             tokens,
        //             id: "RIDER:Home",
        //             image: image,
        //             title: title,
        //             notificationMessage: message
        //         })
        //         res.send({
        //             success: true,
        //             message: "Notification sent",
        //             data: null
        //         })
        //     })
        //     .catch(error => {
        //         return res.send({
        //             success: false,
        //             message: "A server error occured",
        //             data: null
        //         })
        //     })
    } else if (audience == "RIDERS") {
        // FetchAllRidersModel()
        //     .then(response => {
        //         let tokens = []

        //         response.data.forEach(item => {
        //             tokens.push(item.token)
        //         });
        //         sendToMultipleTokenFunction({
        //             tokens,
        //             id: "RIDER:Home",
        //             image: "https://yqmlwjrkxnamjkzbxbbo.supabase.co/storage/v1/object/public/assets/Group_50.png",
        //             title: title,
        //             notificationMessage: message
        //         })
        //         console.log("Notification sent")
        //     })
        //     .catch(error => {
        //         // console.log(error)
        //     })
    } else if (audience == "ALL") {
        // FetchAllUsersVendorModel()
        //     .then(response => {
        //         let tokens = []

        //         response.data.forEach(item => {
        //             tokens.push(item.token)
        //         });
        //         sendToMultipleTokenFunction({
        //             tokens,
        //             id: "RIDER:Home",
        //             image: image,
        //             title: title,
        //             notificationMessage: message
        //         })
        //         res.send({
        //             success: true,
        //             message: "Notification sent",
        //             data: null
        //         })
        //     })
        //     .catch(error => {
        //         return res.send({
        //             success: false,
        //             message: "A server error occured",
        //             data: null
        //         })
        //     })
    } else if (audience == "SINGLE-RIDER") {
        console.log("Notifying....single rider", phone)
        // FetchSingleRiderModel(phone)
        //     .then(response => {
        //         console.log("Here's the token", response.data[0].token)
        //         sendToSingleTokenFunction({
        //             token: response.data[0].token,
        //             id: "Vendor:Home",
        //             image: image,
        //             title: title,
        //             notificationMessage: message
        //         })
        //         // console.log("Sent to ", phone, response.data[0].token)
        //     })
        //     .catch(error => {
        //         // console.log(error)

        //     })
    }
    else if (audience == "SINGLE") {
        // console.log(email)
        getUserByEmailController(email)
            .then(response => {
                if (response[0].fcmToken) {
                    // console.log("FCM token", response[0].fcmToken)
                    sendToSingleTokenFunction({
                        token: response[0].fcmToken,
                        id: "Vendor:Home",
                        image: image,
                        title: title,
                        notificationMessage: message
                    })
                }else{
                    console.log("No FCM token found for user", email)
                }
            })
            .catch(error => {
                // console.log(error)

            })
    }

}


module.exports = {
    sendToSingleToken,
    sendToMultipleToken,
    sendToSingleTokenFunction,
    sendToMultipleTokenFunction,

    // =====
    sendNotificationFunction
}