require("dotenv").config();
const admin = require('firebase-admin');

// Load service account from environment variables or config file
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // If service account is provided as JSON string in env
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else if (process.env.FIREBASE_CONFIG_PATH) {
    // If path to config file is provided
    serviceAccount = require(process.env.FIREBASE_CONFIG_PATH);
} else {
    // Fallback to default config file (should be gitignored)
    try {
        serviceAccount = require('./fcm-config.json');
    } catch (error) {
        throw new Error('Firebase service account not configured. Please set FIREBASE_SERVICE_ACCOUNT env variable or FIREBASE_CONFIG_PATH.');
    }
}

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
