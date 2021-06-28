// OpenWeather API
const api = 'https://api.openweathermap.org/data/2.5/weather?';
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
const fetch = require('node-fetch');
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
  log('GET /weather: Request received. Try to extract query params.');
  let zip;
  let country;
  let weatherPromise;
  try {
    zip = req.query.zip;
    country = req.query.country;
    `GET /weather: Extracting successful. Request for ${zip}, ${country}`;
  } catch (error) {
    log(
      'GET /weather: There was an error extracting the zip code from the query.'
    );
    return;
  }
  log('GET /weather: Requsting weather from an external Api');
  weatherPromise = getWeatherFromApi(zip, country);
  weatherPromise
    .then((weather) => {
      0, log('GET /weather: Request from external Api successful');
      log('GET /weather: sending response');
      res.send(weather);
      log('GET /weather: response sent');
    })
    .catch((error) => {
      log(
        'GET /weather: There was an error getting the Weather from the external Api'
      );
      return;
    });
});

app.get('/data', (_, res) => {
  log('GET /data: Request received. Now serving the projectData.');
  res.send(projectData);
  log('GET /data: projectData sent.');
});

// POST Feelings
app.post('/feelings/add', (req, res) => {
  log('POST /feelings/add: Request received. Analysing body.');
  const content = req.body.content;
  const info = req.body.info;
  log('POST /feelings/add: Writing projectData.');
  projectData = {
    info: info,
    content: content,
    date: Date.now(),
  };
  res.send();
  // log('POST /feelings/add: Sending response.');
  // res.send(projectData);
  // log('POST /feelings/add: Response sent.');
});

/* API Calls */

const getWeatherFromApi = async (zip, country) => {
  const url = `${api}zip=${zip},${country}&appid=${apiKey}`;
  log(
    `External GET from OpenWeatherApi: Requesting current weather in ${zip} (${country}) with ${url}.`
  );
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
  }).then((result) => {
    log(
      'External GET from OpenWeatherApi: Received Response. Try to unpack JSON.'
    );
    return result
      .json()
      .then((obj) => {
        log(
          'External GET from OpenWeatherApi: Unpacking JSON sucessful. Returning weather-object.'
        );
        return obj;
      })
      .catch((error) => {
        return new Error('ERROR during External GET from OpenWeatherApi');
      });
  });
};

// Protocol Functions
const log = (message) => {
  console.log(`Server Log at ${new Date().toISOString()}:`);
  console.log(message);
  console.log('');
};
