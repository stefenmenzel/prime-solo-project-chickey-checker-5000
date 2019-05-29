const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware.js');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/add', (req, res) => {
    let metricId = req.body.sensor;
    let condition = req.body.condition;
    let value = req.body.value;
    let email = req.body.email;
    let phone = req.body.phone;
    let user = req.body.user;
    let sqlQuery = `
        INSERT INTO "alerts" ("metric_id","condition","value","user_id","active","email","phone")
        VALUES ($1, $2, $3, $4, true, $5, $6);
    `
    pool.query(sqlQuery, [metricId, condition, value, user, email, phone])
    .then((result) => {
        console.log("result from POST new alert:", result);
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in POST new alert route:', error);
        res.sendStatus(500);
    });
});

module.exports = router;