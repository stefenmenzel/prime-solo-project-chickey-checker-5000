const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const {rejectUnauthenticated} = require('../modules/authentication-middleware.js');
const axios = require('axios');

/**
 * GET route template
 */
// router.get('/currentData', rejectUnauthenticated, (req, res) => {
//     let getUrl = `
//         https://api.particle.io/v1/devices/${process.env.CHICKEY_CHECKER_DEVICE_NAME}/readings?access_token=${process.env.CHICKEY_CHECKER_MK1_AUTH}
//     `
//     console.log('current get url:', getUrl);
//     axios.get(getUrl)
//     .then((response) => {
//         console.log('result from get current data route:', response.data.result);
//         res.send(response.data.result);
//     }).catch((error) => {
//         console.log('Error in GET current data route:', error);
//         res.sendStatus(500);
//     });
// });

router.get('/currentData', rejectUnauthenticated, (req, res) => {
    let sqlQuery = `
        SELECT * FROM "readings"
        JOIN "user_devices" ON "readings".coop_id = "user_devices".device_id
        WHERE "user_devices".user_id = $1
        ORDER BY "date_time" desc
        LIMIT 1;
    `
    pool.query(sqlQuery, [req.user.id])
    .then((result) => {
        console.log('result from get current data route:', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get current data route:', error);
        res.sendStatus(500);
    });
})

router.get('/sensors', rejectUnauthenticated, (req, res) => {
    let sqlQuery = `
        SELECT * FROM "sensor_metrics";
    `
    pool.query(sqlQuery)
    .then((result) => {
        console.log("result from GET sensors route:", result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in GET sensors route:', error);
        res.sendStatus(500);
    });
})

/**
 * POST route template
 */
router.post('/recordData', (req, res) => {
    console.log("req.body record data POST data:", req.body.data);
    console.log('req.body data temp from webhook', req.body.data.temp);
    console.log('req.body recordData POST:', req.body);
    console.log('req.query.data from webhook:', req.query);
    let temp = req.body.data.temp;
    let humidity = req.body.data.humidity;
    let light = req.body.data.light;
    let hi = req.body.data.hi;
    let sqlQuery = `
        INSERT INTO "readings" ("temp", "light", "humidity", "heatIndex", "coop_id")
        VALUES ($1, $2, $3, $4, 1);
    `
    pool.query(sqlQuery, [temp, humidity, light, hi])
    .then((result) => {
        console.log('result from record data POST route:', result);
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in record data POST route:', error);
        res.sendStatus(500);
    });
});

module.exports = router;