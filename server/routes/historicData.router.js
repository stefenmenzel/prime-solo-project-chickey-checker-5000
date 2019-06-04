const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const {rejectUnauthenticated} = require('../modules/authentication-middleware.js');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.query:', req.query);
    console.log("req.user:", req.user);
    //test getting data for ONE graph.
    // let sqlQuery = `
    //     SELECT * FROM "readings"
    //     WHERE date_part('year', "date_time") = (date_part('year', now() - interval '1 year'))
    //     AND date_part('month', "date_time") = (date_part('month', now()));
    // `
    let sqlQuery = `
        SELECT * FROM "readings"
        JOIN "user_devices" ON "readings".coop_id = "user_devices".device_id
        WHERE "date_time" between $1
        AND $2
        AND "user_devices".user_id = $3
        ORDER BY "date_time";
    `
    pool.query(sqlQuery, [req.query.startDate, req.query.endDate, req.user.id])
    .then((result) => {
        console.log("result from historic data route:", result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in historic data GET route:', error);
        res.sendStatus(500);
    });
})

module.exports = router;