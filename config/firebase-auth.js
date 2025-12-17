require("dotenv").config();
const admin = require('firebase-admin');
const serviceAccount = require('./fcm-config.json');

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

module.exports = {
    admin,
    db,
    Port: process.env.PORT || 9090,
};
