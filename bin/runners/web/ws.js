// модуль запускает WS сервер
const log = require('logger').common;
const { init } = require('servers/ws');

module.exports = async (server) => {
  await init(server);
  log.info(' - - ws server listening');
};
