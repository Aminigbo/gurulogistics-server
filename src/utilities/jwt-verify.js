const jwt = require('jsonwebtoken');
require("dotenv").config();
// jwtSignature

function isTokenValid(jwtToken, jwtSecret =  process.env.jwtSignature) {
    try {
        // Decode the token
        const decodedToken = jwt.decode(jwtToken, { complete: true });

        // Check the "exp" claim
        const expirationTime = decodedToken.payload.exp;

        // Compare with current time
        const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds 
        if (expirationTime > currentTime) {
            // If a secret key is provided, verify the signature as well
            if (jwtSecret) {
                jwt.verify(jwtToken, jwtSecret);
            }

            return true; // Token is still valid
        } else {
            return false; // Token has expired
        }
    } catch (error) {
        // An error occurred during decoding or verification
        console.error('Token validation failed:', error.message);
        return false;
    }
}

module.exports = {
    isTokenValid
}