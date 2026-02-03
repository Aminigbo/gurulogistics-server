const admin = require('firebase-admin');
const serviceAccount = require('./fcm-config.json');
require('dotenv').config();

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || `${serviceAccount.project_id}.firebasestorage.app`
    });
}

// Get the bucket with explicit bucket name
const bucketName = process.env.FIREBASE_STORAGE_BUCKET || `${serviceAccount.project_id}.firebasestorage.app`;
const bucket = admin.storage().bucket(bucketName);

module.exports = {
    bucket,
    admin
};
