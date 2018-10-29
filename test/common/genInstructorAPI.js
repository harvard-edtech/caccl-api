const API = require('../../index.js');
const environment = require('../environment.js');

module.exports = () => {
  return new API({
    accessToken: environment.accessToken,
    canvasHost: environment.canvasHost,
  });
};
