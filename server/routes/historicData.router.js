const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const {rejectUnauthenticated} = require('../modules/authentication-middleware.js');

router.get('/', rejectUnauthenticated, (req, res) => {
    //test getting data for ONE graph.
    let sqlQuery = `
        SELECT * FROM "readings"
        WHERE date_part('year', "date_time") = (date_part('year', now() - interval '1 year'))
        AND date_part('month', "date_time") = (date_part('month', now()));
    `
    pool.query(sqlQuery)
    .then((result) => {
        console.log("result from historic data route:", result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in historic data GET route:', error);
        res.sendStatus(500);
    });
})

module.exports = router;