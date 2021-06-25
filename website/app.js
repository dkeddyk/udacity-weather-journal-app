/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */

/* Function to GET Web API Data*/

/* Function to POST data */

/* Function to GET Project Data */
/**
 * Requests the current weather from the server based on the zip and returns an object containing the weather info
 *
 * @param {String} zip Common postal-zip codes which should be handeled by Weather APIs.
 * @return {Object} representing the weather info provided by the server
 */
function getWeather(zip) {
  return fetch(`/weather?zip=${zip}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json().then((weatherObj) => weatherObj));
}
