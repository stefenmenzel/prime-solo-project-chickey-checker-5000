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
        "user_id" = $1
        AND
        "device_id" = $2
      )
    )
    RETURNING "id";
  `
  pool.query(queryText, [username, password, email])
    .then((result) => {      
      let userId = result.rows[0].id;
      pool.query(junctionQuery, [userId, coop])
      .then((result) => {
        console.log('adding a junction:', result);
        res.sendStatus(201);
      }).catch((error) => {
        console.log('error in adding junction:', error);
        res.sendStatus(500);
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

router.put('/update', (req, res) => {
  console.log("got to the update user router:", req.body);
  console.log('key name for the first item:', Object.keys(req.body)[1]);
  let first_name_key = Object.keys(req.body)[0];
  let last_name_key = Object.keys(req.body)[1];
  let email_key = Object.keys(req.body)[2];
  let phone_key = Object.keys(req.body)[3];
  let keyObject = {
    one: first_name_key,
    two: last_name_key,
    three: email_key,
    four: phone_key
  }
  console.log('all the keys:', keyObject);

  let sqlQuery = `
    UPDATE "user"
    SET "first_name" = $1, "last_name" = $2, "email" = $3, "phone_number" = $4
    WHERE "id" = $5
  `
  pool.query(sqlQuery, 
    [
      req.body.first_name, 
      req.body.last_name, 
      req.body.email, 
      req.body.phone_number,
      req.user.id
    ])
  .then((result) => {
    console.log('result from UPDATE user profile route', result);
    res.sendStatus(200);
  }).catch((error) => {
    console.log('error in UPDATE user profile route:', error);
    res.sendStatus(500);
  });  
})

module.exports = router;
