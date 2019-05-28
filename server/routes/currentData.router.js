const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/currentData', (req, res) => {
    let getUrl = `
        https://api.particle.io/v1/devices/${process.env.CHICKEY_CHECKER_DEVICE_NAME}/readings?access_token=${process.env.CHICKEY_CHECKER_MK1_AUTH}
    `
    console.log('current get url:', getUrl);
    axios.get(getUrl)
    .then((response) => {
        console.log('result from get current data route:', response.data.result);
        res.send(response.data.result);
    }).catch((error) => {
        console.log('Error in GET current data route:', error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;