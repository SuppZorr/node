const log = require('logger').common;
const TG = require('telegram-bot-api');
const { token } = require('config').bot.telegram;

const BotModel = require('models/bot');

const uglyMatMw = require('./mw/uglyMat');
const autoResMw = require('./mw/autoRes');
const btnSend = require('./mw/btnSend');

const botApis = {};

const listenBot = async (token) => {
  if( botApis[token] ) {
    return botApis[token];
  }

  const api = new TG({ token }); // точка доступа к апи, для отправки сообщений и прочего
  const mp = new TG.GetUpdateMessageProvider(); // message provider, другими словами, это сокет для получения чата
  api.setMessageProvider(mp); // соединяем сокет и апи вместе. Так по документации. Почему не соедены сразу - наверное чтото с оптимизацией связано.

  await api.start(); // стартуем отслеживание чата. Так как это функция иницыализации, в случае ошибки, она улетит в ранер

  api.on('update', update => { // событие обновления чата
    //  список мидлвейров
    const mwList = [
      btnSend,
      uglyMatMw,
      autoResMw
    ];

    let nextMwIdx = 0;
    const next = () => {
      if (!mwList[nextMwIdx]) {
        return;
      }

      const curMw = mwList[nextMwIdx];
      nextMwIdx+= 1;
      curMw(update, api, next);
    }

    next();
  });

  botApis[token] = api;
  log.info(`listen bot ${token}`)
  return botApis[token];
}

const init = async () => {
  const docs = await BotModel.find({}, 'token');
  for(const doc of docs) {
    const { token } = doc; 
    await listenBot(token);
  }
}

const addBot = async (title, owner, token) => { 
  const doc = await BotModel.create({
    title: title,
    provider: 'telegram',
    token: token,
    owner: owner
  });

  await listenBot(token);

  const { id } = doc;
  return { status: 'ok', payload: { id } };























const BotModel = require('models/bot');
const doc = await BotModel
  // .findOne({ owner: '5ff0ad5b0b39a10a7cff30e9' })
  .findByOwner('5ff0ad5b0b39a10a7cff30e9');

// другой пример
const BotModel = require('models/bot'); // допустим это модель юзера
const doc = BotModel.create({
  .... // какието поля, нам неважно
  firstname: 'Alet', // это поле сушествует
  lastname: 'Litv', // это поле тоже сушествует
  password: '123' // а этого поля на самом деле не существуцет. Оно виртуальное
})
const fullname = doc.fullname();















const doc = await BotModel.create({
  title: title,
  provider: 'telegram',
  token: token,
  owner: owner
});

doc.findSimilarTypes(); // console.log(this.title)
BotModel.findSimilarTypes(); // console.log('а чо бля нах. Данных еще нет');









}

const removeBot = async (token) => {
  if( !botApis[token] ) { // если такого токена еще нет
    return { status: 'unknown entry' };
  }

  const api = botApis[token];
  delete( botApis[token] );
  await api.stop();

  log.info(`remove bot ${token}`)
  return { status: 'ok' }
}

module.exports = {
  init,
  addBot
}
