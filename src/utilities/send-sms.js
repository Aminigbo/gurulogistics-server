var request = require('request');

async function SendOTP({
    message,
    phone,
    sender
}) {

    const myHeaders = new Headers();
    myHeaders.append("X-Token", "VTP_PK_da11ef102869cd3c04e82b1ea7e89c2d7e1b4a641f596a943e58ecfbe4a374e8");
    myHeaders.append("X-Secret", "VTP_SK_47606d369346bfe9b5ed50d70a999c04024c268813387d87b4f0220b209aa7db");
    myHeaders.append("Content-Type", "application/json");



    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(`https://messaging.vtpass.com/api/sms/dnd-route?sender=${sender}&recipient=+234${phone.slice(-10)}&message=${message}&responsetype=json`, requestOptions);
        const result_1 = await response.text();
        // let Data = JSON.parse(result_1)
        return {
            success: true,
            result_1
        }
    } catch (error) {
        return error
    }


}



async function SendSMS({
    message,
    phone,
    sender
}) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "phone": phone
    });

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        // body: raw,
        redirect: 'follow'
    };
    // var options = {
    //     'method': 'GET',
    //     'url': `https://kullsms.com/customer/api/?username=aminigbo@harvoxx.com&password=hellopaul&message=${message}&sender=${sender}&mobiles=${phone}`,
    //     'headers': {
    //     }
    // };

    try {
        const response = await fetch(`https://kullsms.com/customer/api/?username=aminigbo@harvoxx.com&password=hellopaul&message=${message}&sender=${sender}&mobiles=${phone}`, requestOptions);
        const result_1 = await response.text();
        console.log(result_1)
        const data = JSON.parse(result_1)
        return data;
    } catch (error) {
        return error;
    }

    // return request(options, function (error, response) {
    //     // if (error) throw new Error(error);
    //     // return {
    //     //     response
    //     // }
    // });
}



async function KullsmsOTP({
    message,
    phone,
    sender
}) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var options = {
        'method': 'GET',
        'url': `https://kullsms.com/customer/api/?username=aminigbo@harvoxx.com&password=hellopaul&message=${message}&sender=${sender}&mobiles=+234${phone.slice(-10)}`,
        'headers': {
        }
    };

    return request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response)
        return {
            response
        }
    });
}


async function EmailOTP({
    OTP,
    name,
    email
}) {

    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://email-api.myblake.app/signup.php',
        'headers': {
        },
        formData: {
            'OTP': OTP,
            'NAME': name,
            'EMAIL': email
        }
    };
    return request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log("Sent email", response)
        return {
            response
        }
    });
}


async function EmailNotification({
    email,
    image
}) {

    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://email-api.myblake.app/notification.php',
        'headers': {
        },
        formData: {
            'EMAIL': email,
            'IMAGE': image,
        }
    };
    return request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log("Sent email", response)
        return {
            response
        }
    });
}



// Notify vendor via email when there's a meal order
async function MealOrderEmailToVendor({
    USER,
    name,
    email,
    user_phone,
    vendor,
    vendor_phone,
    meal,
    meal_id,
    amount,
    portion,
    delivery_day,
    type,


    receiverPhone,
    item_type,
    item_size,
    pickup_location,
    dropoff_location,
    rider_name
}) {

    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://email-api.myblake.app/vendor-food-order.php',
        'headers': {
        },
        formData: {
            'USER': USER ? USER : "",
            'NAME': name ? name : "",
            'EMAIL': email ? email : '',
            'user_phone': user_phone ? user_phone : "",
            'vendor': vendor ? vendor : "",
            'vendor_phone': vendor_phone ? vendor_phone : "",
            'meal': meal ? meal : "",
            'meal_id': meal_id ? meal_id : "",
            'amount': amount ? amount : "",
            'portion': portion ? portion : "",
            'delivery_day': delivery_day ? delivery_day : "",
            'TYPE': type,

            "receiverPhone": receiverPhone ? receiverPhone : "",
            "item_type": item_type ? item_type : "",
            "item_size": item_size ? item_size : "",
            "pickup_location": pickup_location ? pickup_location : "",
            "dropoff_location": dropoff_location ? dropoff_location : "",
            "rider_name": rider_name ? rider_name : "",



        }
    };
    return request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log("Sent email", response)
        return {
            response
        }
    });
}


// Notify vendor via email when there's a meal order
async function DispReqEmailToVendor({
    USER,
    name,
    email,
    user_phone,
    amount,

    receiverPhone,
    item_type,
    item_size,
    pickup_location,
    dropoff_location,
    rider_name
}) {
    // console.log(receiverPhone)


    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://email-api.myblake.app/dispatch-req-email.php',
        'headers': {
        },
        formData: {
            'USER': USER,
            'NAME': name,
            'EMAIL': email,
            'user_phone': user_phone,
            'amount': amount,

            "receiverPhone": receiverPhone,
            "item_type": item_type,
            "item_size": item_size,
            "pickup_location": pickup_location,
            "dropoff_location": dropoff_location,
            "rider_name": rider_name,



        }
    };
    return request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log("Sent email")
        return {
            response
        }
    });
}

module.exports = {
    SendSMS,
    SendOTP,
    KullsmsOTP,
    EmailOTP,
    EmailNotification,
    MealOrderEmailToVendor,
    DispReqEmailToVendor
}