// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
const generate = () => {
  const zip = document.querySelector('#zip').value;
  const content = document.querySelector('#feelings').value;
  const country = document.querySelector('#country').value;
  if (!zip) {
    alert('Please enter a Zipcode');
    return;
  }
  getWeather(country, zip)
    .then((weather) => {
      postContent(content, createInfo(weather))
        .then(() => {
          getData().then((projectData) => {
            writeRecentEntry(projectData);
          });
        })
        .catch((postError) => {
          alert('There was an error posting your content!');
          log(postError);
          return;
        });
    })
    .catch((weatherError) => {
      alert('There was an error gathering the current weather!');
      log(weatherError);
      return;
    });
};

const writeRecentEntry = (entry) => {
  document.querySelector('#date').innerHTML = new Date(
    entry.date
  ).toUTCString();
  document.querySelector('#temp').innerHTML = entry.info;
  document.querySelector('#content').innerHTML = entry.content;
};

/* Function to GET Web API Data*/

/**
 * Requests the current weather from the server based on the zip and returns an object containing the weather info
 *
 * @param {String} zip Common postal-zip codes which should be handeled by Weather APIs.
 * @return {Object} representing the weather info provided by the server
 */
const getWeather = async (country, zip) =>
  fetch(`/weather?zip=${zip}&country=${country}`, {
    method: 'GET',
    mode: 'same-origin',
  }).then((response) => response.json().then((weatherObj) => weatherObj));

/**
 * Requests the current data from the server and returns it as an object
 *
 * @return {Object} holding the recent data provided by the server
 */
const getData = async () =>
  fetch(`/data`, {
    method: 'GET',
    mode: 'same-origin',
  }).then((response) => response.json().then((data) => data));

/* Function to POST data */

const postContent = async (content, info) =>
  fetch(`/feelings/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'same-origin',
    body: JSON.stringify({ content: content, info: info }),
  });

/* Function to GET Project Data */
// not nessessary, as it is returned by the postContent()-function

/* Function to make an info string, containing the place, temperature and main-weather */
const createInfo = (weather) => {
  // convert from kelvin to celsius
  const tempC = Math.round(weather.main.temp - 273.15);
  const info = `${weather.name}, ${tempC}°C, ${weather.weather[0].main}`;
  return info;
};

// Protocol Functions
const log = (message) => {
  console.log(`${new Date().toISOString()} - App Log:`);
  console.log(message);
};

// adding click event listener to generate button

document.querySelector('#generate').addEventListener('click', generate);
