// OpenWeather API
const apiKey = '0dd895f956674403fd2476657ac0604a';

// Setup empty JS object to act as endpoint for all routes
projectData = {};

/**
 *  Node and Express Environment
 */
const express = require('express');
const app = express();

/**
 * Project Dependencies
 */

/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Cors */
const cors = require('cors');
app.use(cors());

/**
 * Server Configuration
 */

// Static link to Website folder
app.use(express.static('website'));

// Port Setting
const port = 5000;

// Lauchning Port Listener
app.listen(port, () => log('> Server is up and running on port : ' + port));

/**
 * Functional Behavior
 */

/* Routes */

// GET Weather based on a ZIP code
app.get('/weather', (req, res) => {
  console.log(req.query);
  res.send(req.query.zip);
});

// Protocol Functions
function log(message) {
  console.log(`${new Date().toISOString()} - Server Log: ${message}`);
}
