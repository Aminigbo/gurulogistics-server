const { transporter, fromEmail, fromName } = require("../../config/email-config");
const { getAllRidersEmailsController } = require("../controllers");
const { getIo } = require("../utilities/io");

/**
 * Send OTP email to user
 * @param {string} email - Recipient email address
 * @param {string} otp - OTP code to send
 * @returns {Promise} - Promise that resolves when email is sent
 */
const sendOTPEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: `"${fromName}" <${fromEmail}>`,
            to: email,
            subject: "Your OTP Verification Code",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .container {
                            background-color: #f9f9f9;
                            border-radius: 10px;
                            padding: 30px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 30px;
                        }
                        .otp-box {
                            background-color: #fff;
                            border: 2px dashed #4CAF50;
                            border-radius: 8px;
                            padding: 20px;
                            text-align: center;
                            margin: 20px 0;
                        }
                        .otp-code {
                            font-size: 32px;
                            font-weight: bold;
                            color: #4CAF50;
                            letter-spacing: 5px;
                            font-family: 'Courier New', monospace;
                        }
                        .footer {
                            margin-top: 30px;
                            padding-top: 20px;
                            border-top: 1px solid #ddd;
                            font-size: 12px;
                            color: #666;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>OTP Verification Code</h2>
                        </div>
                        <p>Hello,</p>
                        <p>You have requested an OTP verification code. Please use the code below to complete your verification:</p>
                        <div class="otp-box">
                            <div class="otp-code">${otp}</div>
                        </div>
                        <p><strong>This code will expire in 10 minutes.</strong></p>
                        <p>If you didn't request this code, please ignore this email.</p>
                        <div class="footer">
                            <p>This is an automated message, please do not reply to this email.</p>
                            <p>&copy; ${new Date().getFullYear()} ${fromName}. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
                OTP Verification Code
                
                Hello,
                
                You have requested an OTP verification code. Please use the code below to complete your verification:
                
                ${otp}
                
                This code will expire in 10 minutes.
                
                If you didn't request this code, please ignore this email.
                
                This is an automated message, please do not reply to this email.
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("OTP email sent successfully:", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw error;
    }
};

/**
 * Send welcome email after registration
 * @param {string} email - Recipient email address
 * @param {string} name - User's name (optional)
 * @returns {Promise} - Promise that resolves when email is sent
 */
const sendWelcomeEmail = async (email, name = "User") => {
    try {
        const mailOptions = {
            from: `"${fromName}" <${fromEmail}>`,
            to: email,
            subject: "Welcome to Guru Logistics! 🎉",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .container {
                            background-color: #f9f9f9;
                            border-radius: 10px;
                            padding: 30px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 30px;
                        }
                        .welcome-banner {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            padding: 30px;
                            border-radius: 8px;
                            text-align: center;
                            margin-bottom: 30px;
                        }
                        .content {
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 8px;
                            margin: 20px 0;
                        }
                        .cta-button {
                            display: inline-block;
                            background-color: #4CAF50;
                            color: white;
                            padding: 12px 30px;
                            text-decoration: none;
                            border-radius: 5px;
                            margin: 20px 0;
                            font-weight: bold;
                        }
                        .footer {
                            margin-top: 30px;
                            padding-top: 20px;
                            border-top: 1px solid #ddd;
                            font-size: 12px;
                            color: #666;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="welcome-banner">
                            <h1>Welcome to Guru Logistics! 🎉</h1>
                        </div>
                        <div class="content">
                            <p>Hello ${name},</p>
                            <p>We're thrilled to have you join the Guru Logistics family! Your account has been successfully created.</p>
                            <p>With Guru Logistics, you can:</p>
                            <ul>
                                <li>Track your deliveries in real-time</li>
                                <li>Enjoy fast and reliable delivery services</li>
                                <li>Get notifications about your orders</li>
                                <li>Access exclusive features and benefits</li>
                            </ul>
                            <p>We're here to make your logistics experience seamless and enjoyable. If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
                            <div style="text-align: center;">
                                <a href="#" class="cta-button">Get Started</a>
                            </div>
                        </div>
                        <div class="footer">
                            <p>Thank you for choosing Guru Logistics!</p>
                            <p>&copy; ${new Date().getFullYear()} ${fromName}. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
                Welcome to Guru Logistics!
                
                Hello ${name},
                
                We're thrilled to have you join the Guru Logistics family! Your account has been successfully created.
                
                With Guru Logistics, you can:
                - Track your deliveries in real-time
                - Enjoy fast and reliable delivery services
                - Get notifications about your orders
                - Access exclusive features and benefits
                
                We're here to make your logistics experience seamless and enjoyable. If you have any questions or need assistance, don't hesitate to reach out to our support team.
                
                Thank you for choosing Guru Logistics!
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Welcome email sent successfully:", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw error;
    }
};

/**
 * Notify riders about pending dispatch request
 * @param {string|string[]} email - Rider's email address(es) - can be a single email or array of emails
 * @param {string} riderName - Rider's name (optional)
 * @param {object} dispatchInfo - Dispatch request information
 * @returns {Promise} - Promise that resolves when email is sent
 */
const sendDispatchNotificationEmail = async (email, riderName = "Rider", dispatchInfo = {}) => {
    try {
        const {
            orderId = "N/A",
            pickupLocation = "N/A",
            deliveryLocation = "N/A",
            estimatedDistance = "N/A",
            estimatedEarnings = "N/A",
            urgency = "Normal",
        } = dispatchInfo;

        // Support both single email and array of emails
        const recipientEmails = Array.isArray(email) ? email : [email];

        const mailOptions = {
            from: `"${fromName}" <${fromEmail}>`,
            to: recipientEmails,
            subject: `New Dispatch Request Available - Order #${orderId}`,
            html: `
               <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .container {
                            background-color: #f9f9f9;
                            border-radius: 10px;
                            padding: 30px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        .header {
                            background: linear-gradient(135deg, #978c98 0%, #0076D2 100%);
                            color: white;
                            padding: 20px;
                            border-radius: 8px;
                            text-align: center;
                            margin-bottom: 30px;
                        }
                        .dispatch-box {
                            background-color: #fff;
                            border-left: 4px solid #0076D2;
                            padding: 20px;
                            border-radius: 8px;
                            margin: 20px 0;
                        }
                        .info-row {
                            display: flex;
                            justify-content: space-between;
                            padding: 10px 0;
                            border-bottom: 1px solid #eee;
                        }
                        .info-label {
                            font-weight: bold;
                            color: #666;
                        }
                        .info-value {
                            color: #333;
                        }
                        .urgency-high {
                            background-color: #ffebee;
                            border-left-color: #0076D2;
                        }
                        .urgency-normal {
                            background-color: #fff3e0;
                            border-left-color: #ff9800;
                        }
                        .cta-button {
                            display: inline-block;
                            background-color: #0076D2;
                            color: white;
                            padding: 12px 30px;
                            text-decoration: none;
                            border-radius: 5px;
                            margin: 20px 0;
                            font-weight: bold;
                            text-align: center;
                        }
                        .footer {
                            margin-top: 30px;
                            padding-top: 20px;
                            border-top: 1px solid #ddd;
                            font-size: 12px;
                            color: #666;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>New Dispatch Request Available!</h2>
                        </div>
                        <p>Hello ${riderName},</p>
                        <p>You have a new dispatch request waiting for you. Here are the details:</p>
                        <div class="dispatch-box">
                            <div class="info-row">
                                <span class="info-label">Order ID:</span>
                                <span class="info-value">#${orderId}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Pickup Location:</span>
                                <span class="info-value">${pickupLocation}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Delivery Location:</span>
                                <span class="info-value">${deliveryLocation}</span>
                            </div>
                            
                        </div>
                        <p><strong>Please check your app to accept or decline this dispatch request.</strong></p>
                         
                        <div class="footer">
                            <p>This is an automated notification from Guru Logistics.</p>
                            <p>&copy; ${new Date().getFullYear()} ${fromName}. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
                New Dispatch Request Available!
                
                Hello ${riderName},
                
                You have a new dispatch request waiting for you. Here are the details:
                
                Order ID: #${orderId}
                Pickup Location: ${pickupLocation}
                Delivery Location: ${deliveryLocation}
                Estimated Distance: ${estimatedDistance}
                Estimated Earnings: ${estimatedEarnings}
                Urgency: ${urgency}
                
                Please check your app to accept or decline this dispatch request.
                
                This is an automated notification from Guru Logistics.
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        const recipientCount = recipientEmails.length;
        console.log(`Dispatch notification email sent successfully to ${recipientCount} recipient(s):`);
        return {
            success: true,
            messageId: info.messageId,
            recipients: recipientEmails,
            recipientCount: recipientCount
        };
    } catch (error) {
        console.error("Error sending dispatch notification email:", error);
        throw error;
    }
};

// Controller functions for API endpoints
const sendOTPController = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                error: "Email and OTP are required",
            });
        }

        const result = await sendOTPEmail(email, otp);
        return res.status(200).json({
            success: true,
            message: "OTP email sent successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error in sendOTPController:", error);
        return res.status(500).json({
            success: false,
            error: "Error sending OTP email",
            details: error.message,
        });
    }
};

const sendWelcomeController = async (req, res) => {
    try {
        const { email, name } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: "Email is required",
            });
        }

        const result = await sendWelcomeEmail(email, name);
        return res.status(200).json({
            success: true,
            message: "Welcome email sent successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error in sendWelcomeController:", error);
        return res.status(500).json({
            success: false,
            error: "Error sending welcome email",
            details: error.message,
        });
    }
};

const sendDispatchNotificationController = async (req, res) => {
    console.log(" line 465: sendDispatchNotificationController")
    try {
        const { dispatchInfo } = req.body;
        const email = await getAllRidersEmailsController();
        
        // Validate email format - support both string and array
        const emailArray = Array.isArray(email) ? email : [email];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        for (const emailAddr of emailArray) {
            if (!emailRegex.test(emailAddr)) {
                return res.status(400).json({
                    success: false,
                    error: `Invalid email format: ${emailAddr}`,
                });
            }
        }

        const io = getIo()
        io.emit('DispatchRequest', { 
            notify: {
                title: "Dispatch Request Updated",
                message: `The dispatch request has been updated`,
                image: `https://yqmlwjrkxnamjkzbxbbo.supabase.co/storage/v1/object/public/assets/Group_50.png`
            }
        });

        const result = await sendDispatchNotificationEmail(email, null, dispatchInfo);
        console.log(" line 483: sendDispatchNotificationController", result)
        const recipientCount = emailArray.length;
        return res.status(200).json({
            success: true,
            message: `Dispatch notification email sent successfully to ${recipientCount} recipient(s)`,
            data: result,
        });
    } catch (error) {
        console.error("Error in sendDispatchNotificationController:", error);
        return res.status(500).json({
            success: false,
            error: "Error sending dispatch notification email",
            details: error.message,
        });
    }
};

// Legacy controller (keeping for backward compatibility)
const sendEmailController = async (req, res) => {
    try {
        const { email, subject, message } = req.body;

        if (!email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: "Email, subject, and message are required",
            });
        }

        const mailOptions = {
            from: `"${fromName}" <${fromEmail}>`,
            to: email,
            subject: subject,
            text: message,
            html: `<p>${message.replace(/\n/g, "<br>")}</p>`,
        };

        const info = await transporter.sendMail(mailOptions);
        return res.status(200).json({
            success: true,
            message: "Email sent successfully",
            data: { messageId: info.messageId },
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
            success: false,
            error: "Error sending email",
            details: error.message,
        });
    }
};

module.exports = {
    sendOTPEmail,
    sendWelcomeEmail,
    sendDispatchNotificationEmail,
    sendOTPController,
    sendWelcomeController,
    sendDispatchNotificationController,
    sendEmailController,
};
