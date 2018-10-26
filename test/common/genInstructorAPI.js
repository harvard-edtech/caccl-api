const genCanvasAPI = require('../../index.js');
const environment = require('../environment.js');

module.exports = () => {
  return genCanvasAPI({
    accessToken: environment.accessToken,
    canvasHost: environment.canvasHost,
  });
};
