// Этот модуль - ранер для веб сервера.
// Он запускает http сервер на express и ws сервер на socket.io
const log = require('logger').common;
const botInit = require('controllers/bot').init;

const init = async () => {
  log.info('Init bot controller');
  await botInit();
  log.info(' - bot is run');
};

module.exports = init;
