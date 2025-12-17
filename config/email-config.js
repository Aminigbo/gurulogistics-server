require("dotenv").config();
const nodemailer = require("nodemailer");

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true" || false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // Your email address
        pass: process.env.SMTP_PASS, // Your email password or app password
    },
});

// Verify transporter configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log("Email transporter error:", error);
    } else {
        console.log("Email server is ready to send messages");
    }
});

module.exports = {
    transporter,
    fromEmail: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
    fromName: process.env.SMTP_FROM_NAME || "Guru Logistics",
};

