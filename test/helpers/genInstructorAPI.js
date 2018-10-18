const CanvasAPI = require('../../index.js');
const environment = require('../environment.js');

module.exports = () => {
  return new CanvasAPI({
    accessToken: environment.accessToken,
    canvasHost: environment.canvasHost,
  });
};
