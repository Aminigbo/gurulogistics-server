const nodemailer = require("nodemailer")
require("dotenv").config();

async function SendEmail({
    to,
    subject,
    from,
    html
}) {
    // Get credentials from environment variables
    const emailUser = process.env.EMAIL_USER || "aminigbopaul@gmail.com";
    const emailPass = process.env.EMAIL_PASS || "upvn bgii nykr lwbd";

    if (!emailUser || !emailPass) {
        throw new Error("Email credentials not configured. Please set EMAIL_USER and EMAIL_PASS environment variables.");
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "aminigbopaul@gmail.com",
            pass: "ktjl mqre vsps xkrb"
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
        from: from || emailUser,
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
