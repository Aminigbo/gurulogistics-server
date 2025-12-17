const { FetchMetaDataNEQ, FetchMetaDataById } = require("../auth/auth-models")

async function GetAllUsersTokensExceptOne(phone) {
    const response = await FetchMetaDataNEQ(phone)
    if (response.error == null) {
        let AllTokens = []
        for (let index = 0; index < response.data.length; index++) {
            const element = response.data[index].meta.Fcmoken;

            if (element != undefined) {
                AllTokens.push(element)
            }
        }

        return {
            success: true,
            data: AllTokens
        }
    } else {
        return {
            success: false,
            data: []
        }
    }
}

async function GetSingleUserToken(id) {
    const response = await FetchMetaDataById(id)
    if (response.error == null) {
        if (response.data.length > 0 && response.data[0].meta.Fcmoken) {
            return {
                success: true,
                data: response.data[0].meta.Fcmoken
            }
        } else {
            return {
                success: false,
                data: null
            }
        }
    } else {
        return {
            success: false,
            data: []
        }
    }
}



module.exports = {
    GetAllUsersTokensExceptOne,
    GetSingleUserToken
}