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

function craftMessage(alert){
    let condition = '';
    let value = '';
    switch (alert.condition) {
        case '<':
        case '<=':
            condition = 'less than';
            break;
        case '>':
        case '>=':
            condition = 'greater than';
            break;
        default:
            break;
    }
    switch (alert.metric) {
        case 'temperature':
        case 'heatIndex':
            value = `${alert.value} °F`;
            break;        
        case 'humidity':
        case 'light':
            value = `${alert.value}%`
        default:
            break;
    }
    return `The ${alert.metric} in the coop is ${condition} ${value}`;
}

router.post('/mail', rejectUnauthenticated, (req, res) => {
    // console.log('req.body in send mail:', req.body);
    // let user = req.body.user;
    // let alert = req.body.alert;
    // let email = user.email;
    // let message = craftMessage(alert);
    // let content = `email: ${email} \n message: ${message}`;

    // let mail = {
    //     from: 'Chickey-Checker-5000',
    //     to: email,
    //     subject: `ALERT FROM CHICKEY CHECKER!`,
    //     text: message
    // }

    // transporter.sendMail(mail, (err, data) => {
    //     if (err) {
    //         console.log('error in sending alert email:', err);
    //         res.sendStatus(500)
    //         // ({
    //         // msg: 'Failure in sending chickey checker alert email'
    //         // })
    //     }
    //     else {
    //         res.sendStatus(200);
    //         // res.json({
    //         // msg: 'Success in sending chickey checker alert email'
    //         // })
    //     }
    // })

    sendMail(req.body);
})

router.post('/text', rejectUnauthenticated, (req, res) => {
    // console.log("req.body in text message:", req.body);
    // client.messages.create({
    //     body: craftMessage(req.body.alert),
    //     from: process.env.TWILLIO_NUMBER,
    //     to: `+1${req.body.user.phone_number}`
    // })
    // .then(message => {
    //     console.log(message.sid);
    //     res.sendStatus(200);
    // })
    // .catch(error => {
    //     console.log('error in sending text alert:', error);
    //     res.sendStatus(500);
    // });
    sendText(req.body);
})

function sendMail(body){
    console.log('req.body in send mail:', body);
    let user = body.user;
    let alert = body.alert;
    let email = user.email;
    let message = craftMessage(alert);
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
            // ({
            // msg: 'Failure in sending chickey checker alert email'
            // })
        }
        else {
            console.log("success in sending mail");            
            // res.json({
            // msg: 'Success in sending chickey checker alert email'
            // })
        }
    })
}

function sendText(body){
    console.log("req.body in text message:", body);
    client.messages.create({
        body: craftMessage(body.alert),
        from: process.env.TWILLIO_NUMBER,
        to: `+1${body.user.phone_number}`
    })
        .then(message => {
            console.log(message.sid);            
        })
        .catch(error => {
            console.log('error in sending text alert:', error);            
        });
}

module.exports = router;

module.exports.sendMail = sendMail;
module.exports.sendText = sendText;
