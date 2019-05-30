const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const client = require('twilio')(process.env.TWILLIO_SID, process.env.TWILLIO_AUTH);
const {rejectUnauthenticated} = require('../modules/authentication-middleware.js');
require('dotenv').config();

//this is configuration for nodemailer.
const transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
    }
}
const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
    if (error) {
        console.log('error in email transmission:', error);
    }
    else {
        console.log('Server is ready to take messages');
    }
});

router.post('/mail', rejectUnauthenticated, (req, res) => {
    let email = 'stefenmenzel@gmail.com';
    let message = 'test message from chickey checker';
    let content = `email: ${email} \n message: ${message}`;

    let mail = {
        from: 'Chickey-Checker-5000',
        to: email,
        subject: `ALERT FROM CHICKEY CHECKER!`,
        text: message
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log('error in sending alert email:', err);
            res.sendStatus(500)
            // ({
            // msg: 'Failure in sending chickey checker alert email'
            // })
        }
        else {
            res.sendStatus(200);
            // res.json({
            // msg: 'Success in sending chickey checker alert email'
            // })
        }
    })
})

module.exports = router;
