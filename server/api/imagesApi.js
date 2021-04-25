const imagesApi = require('axios').create({
  baseURL: 'https://api.jonathanczyzyk.com/api/v1/images/',
  headers: {'x-api-key': 'api-key-6c06c7b0-90a1-4f0c-bad9-666c9f14ac76'}
});

module.exports = imagesApi;