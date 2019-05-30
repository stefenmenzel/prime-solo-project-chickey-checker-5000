const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware.js');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    let sqlQuery = `
        SELECT "alerts".id, "sensor_metrics".metric, "alerts".condition, "alerts".value,
        "alerts".active, "alerts".email, "alerts".phone
        FROM "alerts"
        JOIN "sensor_metrics" on "alerts".metric_id = "sensor_metrics".id
        ORDER BY "alerts".id;
    `
    pool.query(sqlQuery)
    .then((result) => {
        console.log('result from GET alerts:', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log("error in GET alerts:", error);
        res.send(500);
    });
});

/**
 * POST route template
 */
router.post('/add', rejectUnauthenticated, (req, res) => {
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

router.put('/toggle', rejectUnauthenticated, (req, res) => {
    let sqlQuery = `
        UPDATE "alerts"
        SET "active" = NOT "active"
        WHERE "id" = $1;
    `
    pool.query(sqlQuery, [req.body.id])
    .then((result) => {
        console.log('result from TOGGLE_ALERTS update route:', result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in TOGGLE_ALERTS update route:', error);
        res.sendStatus(500);
    });
})

router.delete('/delete', rejectUnauthenticated, (req, res) => {
    let sqlQuery = `
        DELETE FROM "alerts"
        WHERE "id" = $1;
    `
    pool.query(sqlQuery, [req.query.idToDelete])
    .then((result) => {
        console.log('result from DELETE alert route:', result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in DELETE alert request:', error);
        res.sendStatus(500);
    });
})

module.exports = router;