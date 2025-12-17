const {sendToSingleToken } = require("../firebase/controller")
const {GetSingleUserToken } = require("./user-tokens")

function SingleNotification({
    id, 
    largeImg,
    title,
    message,
    UserID
}) {
    GetSingleUserToken(UserID)
        .then(response => {
            if (response.success == true) {
                let token = response.data 

                sendToSingleToken(
                    {
                        token,
                        id, 
                        largeImg,
                        title,
                        message
                    }
                )
                console.log("Sen Push noti to ", token)
            }
        })
}

module.exports = {
    SingleNotification
}