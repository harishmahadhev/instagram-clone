const nodemailer = require('nodemailer')
const { MailPassword, MailUserName, BaseUrl } = require('../config/keys');
const USER = MailUserName;
const PASSWORD = MailPassword;
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: USER,
        pass: PASSWORD
    }
})

async function activateMail(email, token) {
    try {
        const mailOptions = {
            from: `noreply-@instagram.com <${USER}>`,
            to: email,
            subject: "Account Activation",
            html: `<h3>Activate your account to use the Instagram Clone Service</h3><h4>Please click the <a href="${BaseUrl}/activate/${token}">Link</a> to activate your account</h4>`
        }
        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

async function resetMail(email, token) {
    try {
        const mailOptions = {
            from: `noreply-@instagram.com <${USER}>`,
            to: email,
            subject: "Password Reset",
            html: `<h3>Reset your Password</h3><h4>Please click the <a href="${BaseUrl}/reset/${token}">Link</a> to reset your password</h4>`
        }
        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = { resetMail, activateMail }