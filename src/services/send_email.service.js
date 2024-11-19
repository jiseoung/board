const nodemailer = require('nodemailer');
require("dotenv").config({ path: __dirname + "/src/config/.env" });

class EMAIL {
    constructor (mail_to_send, mail_title, mail_content) {
        this.mail_to_send = mail_to_send;
        this.mail_title = mail_title;
        this.mail_content = mail_content;

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_ADDRESS,
              pass: process.env.EMAIL_PW
            }
        });

        this.mail_options = {
            from: process.env.EMAIL_ADDRESS, 
            to: this.mail_to_send, 
            subject: this.mail_title, 
            text: this.mail_content
        };
    }

    async send_reset_pw_mail() {
        try {
            const info = await this.transporter.sendMail(this.mail_options);

            console.log('email send : ' + info.response);
            return true;
        } catch (e) {
            console.log('send_reset_pw_mail error : ' + e);
            return false;
        }
    }
}

module.exports = EMAIL;