const telegram = require('./telegram');

const init = async () => {
  await telegram.init();
}

module.exports = {
  init,
  telegram
}
