const nodemailer = require("nodemailer")
require("dotenv").config();

async function SendEmail({
    to,
    subject,
    from,
    html
}) {
    // Get credentials from environment variables
    const emailUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const emailPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    
    if (!emailUser || !emailPass) {
        throw new Error('Email configuration missing. Please set SMTP_USER and SMTP_PASS (or EMAIL_USER and EMAIL_PASS) environment variables.');
    }
   
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true" || false, // true for 465, false for other ports
        auth: {
            user: emailUser,
            pass: emailPass
        },
        tls: {
            // Do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    // Verify transporter configuration
    try {
        await transporter.verify();
        console.log("Email transporter verified successfully");
    } catch (error) {
        console.error("Email transporter verification failed:", error.message);
        throw new Error(`Email configuration error: ${error.message}. Please check your Gmail app password.`);
    }

    const mailOptions = {
        from: from || emailUser || process.env.SMTP_USER || process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email send error:', error.message);

        // Provide helpful error messages
        if (error.code === 'EAUTH') {
            throw new Error(`Gmail authentication failed. Please verify:
1. Your Gmail app password is correct (not your regular password)
2. 2-Step Verification is enabled on your Google account
3. You've generated a new app password at: https://myaccount.google.com/apppasswords
4. The app password doesn't contain spaces (remove spaces if copying)`);
        }

        throw error;
    }
}


module.exports = {
    SendEmail,

};
