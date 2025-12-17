const { SuccessObject, ErrorObject } = require("../utilities");

// function sendNotificationControllers(req, res) {
//     let { audience, image, title, message, phone } = req.body;
//     if (!audience || !title || !message) {
//         return res.send({
//             success: false,
//             message: "Invalid payload",
//             data: null
//         })
//     }

//     if (audience == "VENDORS") {
//         FetchAllVendors()
//             .then(response => {
//                 let tokens = []

//                 response.data.forEach(item => {
//                     tokens.push(item.token)
//                 });
//                 sendToMultipleTokenFunction({
//                     tokens,
//                     id: "RIDER:Home",
//                     image: image,
//                     title: title,
//                     notificationMessage: message
//                 })
//                 res.send({
//                     success: true,
//                     message: "Notification sent",
//                     data: null
//                 })
//             })
//             .catch(error => {
//                 return res.send({
//                     success: false,
//                     message: "A server error occured",
//                     data: null
//                 })
//             })
//     } else if (audience == "USERS") {
//         FetchAllUsersModel()
//             .then(response => {
//                 let tokens = []

//                 let dataWithoutNull = response.data.filter(e => e.token != null)
//                 dataWithoutNull.forEach(item => {
//                     tokens.push(item.token)
//                 });
//                 sendToMultipleTokenFunction({
//                     tokens,
//                     id: "RIDER:Home",
//                     image: image,
//                     title: title,
//                     notificationMessage: message
//                 })
//                 res.send({
//                     success: true,
//                     message: "Notification sent",
//                     data: []
//                 })
//             })
//             .catch(error => {
//                 return res.send({
//                     success: false,
//                     message: "A server error occured",
//                     data: null
//                 })
//             })
//     } else if (audience == "RIDERS") {
//         FetchAllRidersModel()
//             .then(response => {
//                 let tokens = []

//                 response.data.forEach(item => {
//                     tokens.push(item.token)
//                 });
//                 sendToMultipleTokenFunction({
//                     tokens,
//                     id: "RIDER:Home",
//                     image: "https://yqmlwjrkxnamjkzbxbbo.supabase.co/storage/v1/object/public/assets/Group_50.png",
//                     title: title,
//                     notificationMessage: message
//                 })
//                 res.send({
//                     success: true,
//                     message: "Notification sent",
//                     data: null
//                 })
//             })
//             .catch(error => {
//                 return res.send({
//                     success: false,
//                     message: "A server error occured",
//                     data: null
//                 })
//             })
//     } else if (audience == "ALL") {
//         FetchAllUsersVendorModel()
//             .then(response => {
//                 let tokens = []


//                 // let Emails = []
//                 // response.data.forEach(item => {
//                 //     Emails.push(item.email)

//                 // }); 
//                 // let promises = ["aminigbopaul@gmail.com","info.freetalker@gmail.com"].map(element => {

//                 //     return EmailNotification({
//                 //         email: element,
//                 //         image: "https://yqmlwjrkxnamjkzbxbbo.supabase.co/storage/v1/object/public/assets/WhatsApp%20Image%202024-07-27%20at%2007.17.07.jpeg"
//                 //     })
//                 //         .then(responseSMS => {
//                 //             return responseSMS 
//                 //         })
//                 // });

//                 // Promise.all(promises)
//                 //     .then(response => {
//                 //         res.send(SuccessObject("Sent to ", response));
//                 //     })
//                 //     .catch(error => {
//                 //         res.send(ErrorObject("A server error occurred"));
//                 //     });




//                 response.data.forEach(item => {
//                     tokens.push(item.token)
//                 });

//                 sendToMultipleTokenFunction({
//                     tokens,
//                     id: "RIDER:Home",
//                     image: image,
//                     title: title,
//                     notificationMessage: message
//                 })
//                 res.send({
//                     success: true,
//                     message: "Notification sent",
//                     data: null
//                 })
//             })
//             .catch(error => {
//                 return res.send({
//                     success: false,
//                     message: "A server error occured",
//                     data: null
//                 })
//             })
//     } else if (audience == "SINGLE") {
//         FetchSingleUsersModel(phone)
//             .then(response => {

//                 sendToSingleTokenFunction({
//                     token: response.data[0].token,
//                     id: "Vendor:Home",
//                     image: image,
//                     title: title,
//                     notificationMessage: message
//                 })
//                 res.send({
//                     success: true,
//                     message: "Notification sent",
//                     data: null
//                 })
//             })
//             .catch(error => {
//                 console.log(error)
//                 return res.send({
//                     success: false,
//                     message: "A server error occured",
//                     data: null
//                 })
//             })
//     }

// }


function Properties(req, res) {
    res.send(SuccessObject("Success", {
        mapAPI: "AIzaSyBy6SpgPKLr1qd6BX53c0iBCWNlIRacwgU",
        paystackKey: "pk_live_8e65e9f08027afd201cc1e977f916eae0bde6115"
    }))
}


// function CheckUpdateController(req, res) {
//     let { version } = req.body;
//     console.log("version", version)
//     if (version != "3.0.3") { // if (version != "3.0.0") {
//         res.send(SuccessObject("Success", {
//             isUpdate: true,
//             title: "Update Available.",
//             message: "There is a newer version of the Blake App, kindly install the new Blake app and uninstall the older version for better experience",
//             link: "https://play.google.com/store/apps/details?id=com.bwh.blake",
//             IosLink: "https://apps.apple.com/app/blake/id6508169947"
//         }))
//     } else {
//         res.send(SuccessObject("Success", {
//             isUpdate: false,
//             title: "",
//             message: "",
//             link: ""
//         }))
//     }

//     // uncomment the above

//     // res.send(SuccessObject("Success", {
//     //     isUpdate: false,
//     //     title: "",
//     //     message: "",
//     //     link: ""
//     // }))

// }



// function SendSMS(req, res) {
//     let { phone, message } = req.body;

//     if (!phone || !message) {
//         return res.send(ErrorObject("Invalid payload"))
//     }

//     KullsmsOTP({
//         phone,
//         message,
//         sender: "Blake"
//     })
//         .then(responseSMS => {
//             res.send(responseSMS)
//         })

//     // SendOTP({
//     //     phone,
//     //     message,
//     //     sender: "Blake"
//     // })
//     //     .then(responseSMS => {
//     //         res.send(responseSMS)
//     //     })


// }

// // test email

// function SendEmail(req, res) { 

//     DispReqEmailToVendor(
//         {
//             USER: "aminigbopaul@gmail.com",
//             name: "aminigbopaul@gmail.com",
//             receiverPhone: "08133333333",
//             email: "aminigbopaul@gmail.com",
//             user_phone: "08133333333",

//             item_type: "food",
//             item_size: "small",
//             amount: `₦1000`,
//             pickup_location: "Lagos",
//             dropoff_location: "Abuja",
//             rider_name: `rider name`,
//         }
//     )
//         .then(responseSMS => { 
//             res.send({
//                 success: true,
//                 message: "Request created",
//                 data: responseSMS
//             })
//         })
// }

module.exports = {
    Properties,
    // sendNotificationControllers,
    // SendSMS,
    // CheckUpdateController,
    // SendEmail
}
