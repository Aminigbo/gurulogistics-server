const { sendToMultipleToken } = require("../firebase/controller")
const { GetAllUsersTokensExceptOne } = require("./user-tokens")

function MultipleNotification({
    id,
    tag,
    largeImg,
    title,
    message,
    UserPhone
}) {
    GetAllUsersTokensExceptOne(UserPhone)
        .then(response => {
            if (response.success == true) {
                let tokens = response.data
                sendToMultipleToken(
                    {
                        tokens,
                        id,
                        tag,
                        largeImg,
                        title,
                        message
                    }
                )
            }
        })
}

module.exports = {
    MultipleNotification
}