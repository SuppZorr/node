const log = require('logger').common;
const socketio = require('socket.io');
const origins = require('config').server.ws.origins;
// const routes = require('./routes');


module.exports.init = async (server) => {
  const options = {};

  const io = socketio(server, options);
  io.origins(origins);

  io.use((socket, next) => {
    // console.log( 'socket', socket );
    next();
    // if (socket.request.headers.cookie) return next();
    // next(new Error('Authentication error'));
  });

  io.on('connection', (socket) => {
    log.info(`connect: ${socket.id}`);

    socket.on('disconnect', (reason) => {
      log.info(`disconnect: ${socket.id} ${reason}`);
    });
  });

  module.exports = io;

  // eslint-disable-next-line global-require
  // require('wsRoutes/test');

  // eslint-disable-next-line global-require
  // require('wsRoutes/academy');
  // eslint-disable-next-line global-require
  // require('wsRoutes/tasks');
  // eslint-disable-next-line global-require
  // require('wsRoutes/themes');
};
