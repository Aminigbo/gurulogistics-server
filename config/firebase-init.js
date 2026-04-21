const admin = require('firebase-admin');
require('dotenv').config();

function requiredEnv(name) {
    const value = process.env[name];
    if (!value) throw new Error(`Firebase not configured: missing env var ${name}`);
    return value;
}

function buildServiceAccountFromEnv() {
    const privateKey = requiredEnv('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n');

    return {
        type: 'service_account',
        project_id: requiredEnv('FIREBASE_PROJECT_ID'),
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || undefined,
        private_key: privateKey,
        client_email: requiredEnv('FIREBASE_CLIENT_EMAIL'),
        client_id: process.env.FIREBASE_CLIENT_ID || undefined,
        auth_uri: process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
        token_uri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url:
            process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL || undefined,
        universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN || 'googleapis.com'
    };
}

// Prefer full JSON in env if provided; otherwise build from individual env vars.
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT && process.env.FIREBASE_SERVICE_ACCOUNT.trim().startsWith('{')) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
    serviceAccount = buildServiceAccountFromEnv();
}

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
