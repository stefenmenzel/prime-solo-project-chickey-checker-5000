const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => { 
  console.log('WERE here in the register', req.body); 
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;
  const coop = req.body.coop;

  const queryText = 'INSERT INTO "user" (username, password, email) VALUES ($1, $2, $3) RETURNING id';
  const deviceQuery = `
    INSERT INTO "devices" ("device_name")
    SELECT $1
    WHERE NOT EXISTS(
      SELECT * FROM "devices"
      WHERE(
        "device_name" = $1
      )
    );
  `
  const junctionQuery = `
    INSERT INTO "user_devices" (user_id, device_id)
    SELECT $1, $2
    WHERE NOT EXISTS(
      SELECT * FROM "user_devices"
      WHERE(
        "user_id" = $1,
        "device_id" = $2
      )
    )
    RETURNING "id";
  `
  pool.query(queryText, [username, password, email])
    .then((result) => {
      console.log('result from register query:', result.rows[0].id);
      let userId = result.rows[0].id;
      pool.query(junctionQuery, [userId, coop])
      .then((result) => {
        res.sendStatus(201);
      })
      //res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error in register route:', error);
      res.sendStatus(500)
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
